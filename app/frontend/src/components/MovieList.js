import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import "./MovieList.css";
import { withStyles } from "@material-ui/core/styles";
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

const GET_MOVIE = gql`
  query moviesPaginateQuery(
    $first: Int
    $offset: Int
    $orderBy: [_MovieOrdering]
    $filter: _MovieFilter
  ) {
    Movie(first: $first, offset: $offset, orderBy: $orderBy, filter: $filter) {
      id
      title
      likes
    }
  }
`;

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "asc",
      orderBy: "title",
      page: 0,
      rowsPerPage: 10,
      titleFilter: ""
    };
  }

  getFilter = () => {
    return this.state.titleFilter.length > 0
      ? { title_contains: this.state.titleFilter }
      : {};
  };

  handleSortRequest = property => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }
    this.setState({ order, orderBy });
  };

  handleFilterChange = filterName => event => {
    const val = event.target.value;

    this.setState({
      [filterName]: val
    });
  };

  render() {
    const { order, orderBy } = this.state;
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Typography variant="h2" gutterBottom>
          Movie List
        </Typography>
        <TextField
          id="search"
          label="Movie Title Contains"
          className={classes.textField}
          value={this.state.titleFilter}
          onChange={this.handleFilterChange("titleFilter")}
          margin="normal"
          variant="outlined"
          type="text"
          InputProps={{
            className: classes.input
          }}
        />
        <Query
          query={GET_MOVIE}
          variables={{
            first: this.state.rowsPerPage,
            offset: this.state.rowsPerPage * this.state.page,
            orderBy: this.state.orderBy + "_" + this.state.order,
            filter: this.getFilter()
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            return (
              <Table className={this.props.classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      key="title"
                      sortDirection={orderBy === "title" ? order : false}
                    >
                      <Tooltip
                        title="Sort"
                        placement="bottom-start"
                        enterDelay={300}
                      >
                        <TableSortLabel
                          active={orderBy === "title"}
                          direction={order}
                          onClick={() => this.handleSortRequest("title")}
                        >
                          Title
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      key="likes"
                      sortDirection={orderBy === "likes" ? order : false}
                    >
                      <Tooltip
                        title="Sort"
                        placement="bottom-end"
                        enterDelay={300}
                      >
                        <TableSortLabel
                          active={orderBy === "likes"}
                          direction={order}
                          onClick={() => this.handleSortRequest("likes")}
                        >
                          Likes
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      key="id"
                      sortDirection={orderBy === "id" ? order : false}
                    >
                      <Tooltip
                        title="Sort"
                        placement="bottom-start"
                        enterDelay={300}
                      >
                        <TableSortLabel
                          active={orderBy === "id"}
                          direction={order}
                          onClick={() => this.handleSortRequest("id")}
                        >
                          ID
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.Movie.map(n => {
                    return (
                      <TableRow key={n.id}>
                        <TableCell component="th" scope="row">
                          {n.title}
                        </TableCell>
                        <TableCell>
                          {n.likes ? n.likes.toFixed(2) : "-"}
                        </TableCell>
                        <TableCell>{n.id}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            );
          }}
        </Query>
      </Paper>
    );
  }
}

export default withStyles(styles)(MovieList);
