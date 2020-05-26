import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
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

const LIKE_MOVIE = gql`
  mutation like(
    $user_id: String!
    $user_name: String!
    $user_email: String!
    $movie_id: Int!
    $score: Int!
  ) {
    rateMovie(
      user_id: $user_id
      user_name: $user_name
      user_email: $user_email
      movie_id: $movie_id
      score: $score
    )
  }
`;

const FAVORITE_MOVIE = gql`
  mutation favorite(
    $user_id: String!
    $user_name: String!
    $user_email: String!
    $movie_id: Int!
  ) {
    favoriteMovie(
      user_id: $user_id
      user_name: $user_name
      user_email: $user_email
      movie_id: $movie_id
    )
  }
`;

function Recommend(props) {
  const { classes } = props;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("title");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filterState, setFilterState] = React.useState({ titleFilter: "" });

  const swiped = (direction, movie_id) => {
    var score = 0;
    switch (direction) {
      case "left":
        score = -1;
        break;
      case "right":
        score = 1;
        break;
      case "up":
        score = 0;
        break;
      case "down":
        break;
      default:
        console.log("Error: action unknown " + direction);
    }
    var user_id = app.auth().currentUser.uid;
    var user_name = app.auth().currentUser.displayName;
    var user_email = app.auth().currentUser.email;
    if (score) {
      addLike({
        variables: {
          user_id: user_id,
          user_name: user_name,
          user_email: user_email,
          movie_id: movie_id,
          score: score
        }
      });
    } else {
      addFavorite({
        variables: {
          user_id: user_id,
          user_name: user_name,
          user_email: user_email,
          movie_id: movie_id
        }
      });
    }
  };

  const outOfFrame = name => {
    console.log(name + " left the screen!");
    refetch();
  };

  const getFilter = () => {
    return filterState.titleFilter.length > 0
      ? { title_contains: filterState.titleFilter }
      : {};
  };

  const reloadcards = () => {
    refetch();
  };

  const [addLike] = useMutation(LIKE_MOVIE);
  const [addFavorite] = useMutation(FAVORITE_MOVIE);

  const { loading, data, error, refetch } = useQuery(GET_MOVIE, {
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
                onSwipe={dir => swiped(dir, n.id)}
                onCardLeftScreen={() => refetch()}
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
          <Button onClick={() => reloadcards()}>Cargar mas!</Button>
        </div>
      )}
    </Paper>
  );
}

export default withStyles(styles)(Recommend);
