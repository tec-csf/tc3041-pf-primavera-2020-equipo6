import React, { useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import TinderCard from "react-tinder-card";
import gql from "graphql-tag";
import "./Recommend.css";
import app from "../base";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";

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
  query movies($user_id: String) {
    recommendedMovies(user_id: $user_id) {
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
  var movieCount = 0;

  const setMovieCount = length => {
    movieCount = length;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getMovies(), []);

  const swiped = (direction, movie_id) => {
    var score = 0;
    setMovieCount(movieCount - 1);
    if (movieCount < 1) {
      getMovies();
    }
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
        return true;
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
    return true;
  };

  const outOfFrame = name => {
    return true;
  };

  const [addLike] = useMutation(LIKE_MOVIE);
  const [addFavorite] = useMutation(FAVORITE_MOVIE);
  const [getMovies, { loading, data, error }] = useLazyQuery(GET_MOVIE, {
    variables: {
      user_id: app.auth().currentUser ? app.auth().currentUser.uid : null
    },
    fetchPolicy: "network-only",
    onCompleted: data => setMovieCount(data.recommendedMovies.length)
  });

  return (
    <Paper className={classes.root}>
      {app.auth().currentUser && (
        <Typography variant="h2" gutterBottom>
          Welcome {app.auth().currentUser.displayName} !
        </Typography>
      )}
      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>Error</p>}
      {data && !loading && !error && (
        <div className="cardContainer">
          {data.recommendedMovies.map(n => {
            return (
              <TinderCard
                className="swipe"
                key={n.id}
                onSwipe={dir => swiped(dir, n.id)}
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
