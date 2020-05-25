import React from "react";
import { useQuery } from "@apollo/react-hooks";
import TinderCard from "react-tinder-card";
import gql from "graphql-tag";
import "./Recommend.css";
import app from "../base";
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
      poster_url
    }
  }
`;

function Recommend(props) {
  const { classes } = props;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("title");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filterState, setFilterState] = React.useState({ titleFilter: "" });

  const swiped = (direction, name) => {
    console.log("removing: " + name);
  };

  const outOfFrame = name => {
    console.log(name + " left the screen!");
  };

  const getFilter = () => {
    return filterState.titleFilter.length > 0
      ? { title_contains: filterState.titleFilter }
      : {};
  };

  const { loading, data, error } = useQuery(GET_MOVIE, {
    variables: {
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
        Welcome {app.auth().currentUser.displayName} !
      </Typography>
      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>Error</p>}
      {data && !loading && !error && (
        <div className="cardContainer">
          {data.Movie.map(n => {
            return (
              <TinderCard
                className="swipe"
                key={n.id}
                onSwipe={dir => swiped(dir, n.title)}
                onCardLeftScreen={() => outOfFrame(n.title)}
              >
                <div
                  style={{ backgroundImage: "url(" + n.poster_url + ")" }}
                  className="card"
                >
                  <h3>{n.title}</h3>
                </div>
              </TinderCard>
            );
          })}
        </div>
      )}
    </Paper>
  );
}

export default withStyles(styles)(Recommend);
