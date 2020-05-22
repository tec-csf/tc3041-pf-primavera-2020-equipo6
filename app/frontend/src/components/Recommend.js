import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import "./Recommend.css";
import { withStyles } from "@material-ui/core/styles";
import TinderCard from "react-tinder-card";
import {
  Card,
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

class Recommend extends React.Component {
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

  onSwipe = direction => {
    console.log("You swiped: " + direction);
  };

  onCardLeftScreen = myIdentifier => {
    console.log(myIdentifier + " left the screen");
  };

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
    console.log(classes);
    return (
      <Paper className={classes.root}>
        <Typography variant="h2" gutterBottom>
          Movie List
        </Typography>
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
              <div>
                {data.Movie.map(item => (
                  <TinderCard
                    className="swipe"
                    key={item.id}
                    onSwipe={dir => this.onSwipe(dir)}
                    onCardLeftScreen={() => this.onCardLeftScreen(item.title)}
                  >
                    <div className="card">
                      <h3>{item.title}</h3>
                    </div>
                  </TinderCard>
                ))}
              </div>
            );
          }}
        </Query>
      </Paper>
    );
  }
}

export default withStyles(styles)(Recommend);
