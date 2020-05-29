import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import "./MovieList.css";
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
  TextField,
  Button
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

const GET_MOVIE = gql`
  query movies(
    $user_id: String
    $first: Int
    $offset: Int
    $orderBy: [_MovieOrdering]
    $filter: _MovieFilter
  ) {
    userFavoriteMovies(
      user_id: $user_id
      first: $first
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) {
      id
      title
      likes
      poster_url
    }
  }
`;

const REMOVE_FAVORITE = gql`
  mutation like($user_id: String!, $movie_id: Int!) {
    removeFavorite(user_id: $user_id, movie_id: $movie_id)
  }
`;

function MovieList(props) {
  const { classes } = props;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("title");
  const [page] = React.useState(0);
  const [rowsPerPage] = React.useState(10);
  const [filterState, setFilterState] = React.useState({ titleFilter: "" });

  const getFilter = () => {
    return filterState.titleFilter.length > 0
      ? { title_contains: filterState.titleFilter }
      : {};
  };

  const EraseFavorite = (movie_id, movie_title) => {
    RemoveFavorite({
      variables: {
        user_id: app.auth().currentUser.uid,
        movie_id: movie_id
      }
    });
    console.log("Favorite was removed, refetching...");
    refetch();
  };

  const [RemoveFavorite] = useMutation(REMOVE_FAVORITE);

  const { loading, data, error, refetch } = useQuery(GET_MOVIE, {
    variables: {
      user_id: app.auth().currentUser.uid,
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
        {app.auth().currentUser.displayName} Favorite Movies!
      </Typography>
      <TextField
        id="search"
        label="Movie Title Contains"
        className={classes.textField}
        value={filterState.titleFilter}
        onChange={handleFilterChange("titleFilter")}
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
                key="title"
                sortDirection={orderBy === "title" ? order : false}
              >
                <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === "title"}
                    direction={order}
                    onClick={() => handleSortRequest("title")}
                  >
                    Title
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell
                key="likes"
                sortDirection={orderBy === "likes" ? order : false}
              >
                <Tooltip title="Sort" placement="bottom-end" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === "likes"}
                    direction={order}
                    onClick={() => handleSortRequest("likes")}
                  >
                    Likes
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.userFavoriteMovies.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell component="th" scope="row">
                    {n.title}
                  </TableCell>
                  <TableCell>{n.likes ? n.likes.toFixed(2) : "-"}</TableCell>
                  <TableCell>
                    <Button onClick={() => EraseFavorite(n.id, n.title)}>
                      Borrar
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}

export default withStyles(styles)(MovieList);
