import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import "./UserList.css";
import { withStyles } from "@material-ui/core/styles";
import app from "../base";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Paper,
  TableSortLabel,
  Typography,
  TextField
} from "@material-ui/core";

const styles = theme => ({
  root: {
    maxWidth: 700,
    marginTop: theme.spacing(3),
    overflowX: "auto",
    margin: "auto"
  },
  table: {
    minWidth: 700
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 300
  }
});

const GET_USER = gql`
  query usersPaginateQuery(
    $curr_id: String
    $first: Int
    $offset: Int
    $orderBy: [_UserOrdering]
    $filter: _UserFilter
  ) {
    User(first: $first, offset: $offset, orderBy: $orderBy, filter: $filter) {
      id
      name
      email
      similarity(curr_id: $curr_id)
    }
  }
`;

function UserList(props) {
  const { classes } = props;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [page] = React.useState(0);
  const [rowsPerPage] = React.useState(10);
  const [filterState, setFilterState] = React.useState({ nameFilter: "" });

  const getFilter = () => {
    return filterState.nameFilter.length > 0
      ? { name_contains: filterState.nameFilter }
      : {};
  };

  const { loading, data, error } = useQuery(GET_USER, {
    variables: {
      curr_id: app.auth().currentUser.uid,
      first: rowsPerPage,
      offset: rowsPerPage * page,
      orderBy: orderBy + "_" + order,
      filter: getFilter()
    }
  });

  const handleSortRequest = property => {
    const newOrderBy = property;
    let newOrder = "desc";

    if (orderBy === property && order === "desc") {
      newOrder = "asc";
    }

    setOrder(newOrder);
    setOrderBy(newOrderBy);
  };

  const handleFilterChange = filterName => event => {
    const val = event.target.value;

    setFilterState(oldFilterState => ({
      ...oldFilterState,
      [filterName]: val
    }));
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h2" gutterBottom>
        User List
      </Typography>
      <TextField
        id="search"
        label="User Name Contains"
        className={classes.textField}
        value={filterState.nameFilter}
        onChange={handleFilterChange("nameFilter")}
        margin="normal"
        variant="outlined"
        type="text"
        InputProps={{
          className: classes.input
        }}
      />
      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>Error</p>}
      {data && !loading && !error && (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell
                key="name"
                sortDirection={orderBy === "name" ? order : false}
              >
                <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={order}
                    onClick={() => handleSortRequest("name")}
                  >
                    Name
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell
                key="similarity"
                sortDirection={orderBy === "similarity" ? order : false}
              >
                <Tooltip title="Sort" placement="bottom-end" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === "similarity"}
                    direction={order}
                    onClick={() => handleSortRequest("similarity")}
                  >
                    Similarity
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell
                key="email"
                sortDirection={orderBy === "email" ? order : false}
              >
                <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === "email"}
                    direction={order}
                    onClick={() => handleSortRequest("email")}
                  >
                    Email
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.User.filter(function(n) {
              if (n.id === app.auth().currentUser.uid) {
                return false;
              }
              return true;
            }).map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell component="th" scope="row">
                    {n.name}
                  </TableCell>
                  <TableCell>
                    {n.similarity ? n.similarity.toFixed(2) : "-"}
                  </TableCell>
                  <TableCell>{n.email}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}

export default withStyles(styles)(UserList);
