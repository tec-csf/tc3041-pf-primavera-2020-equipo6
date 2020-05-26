import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import { AuthProvider } from "./Auth.js";
import PrivateRoute from "./PrivateRoute";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  CssBaseline,
  Drawer,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  EventNote as EventNoteIcon,
  People as PeopleIcon,
  Theaters as TheatersIcon
} from "@material-ui/icons";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import MovieList from "./components/MovieList";
import UserList from "./components/UserList";
import Recommend from "./components/Recommend";
import login from "./components/login";
import signup from "./components/signup";
import Favorite from "./components/Favorite";
import classNames from "classnames";
import "./App.css";
import app from "./base";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: "#383838"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: "100vh",
    overflow: "auto"
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <AuthProvider>
        <React.Fragment>
          <Router>
            <CssBaseline />
            <div className={classes.root}>
              <AppBar
                position="absolute"
                className={classNames(
                  classes.appBar,
                  this.state.open && classes.appBarShift
                )}
              >
                <Toolbar
                  disableGutters={!this.state.open}
                  className={classes.toolbar}
                >
                  <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.handleDrawerOpen}
                    className={classNames(
                      classes.menuButton,
                      this.state.open && classes.menuButtonHidden
                    )}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography
                    component="h1"
                    variant="h2"
                    color="inherit"
                    noWrap
                    className={classes.title}
                  >
                    Movies
                  </Typography>
                </Toolbar>
              </AppBar>
              <Drawer
                variant="permanent"
                classes={{
                  paper: classNames(
                    classes.drawerPaper,
                    !this.state.open && classes.drawerPaperClose
                  )
                }}
                open={this.state.open}
              >
                <div className={classes.toolbarIcon}>
                  <IconButton onClick={this.handleDrawerClose}>
                    <ChevronLeftIcon />
                  </IconButton>
                </div>
                <Divider />
                <Link to="/" className="navLink">
                  <ListItem button>
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                </Link>
                <Link to="/movies" className="navLink">
                  <ListItem button>
                    <ListItemIcon>
                      <TheatersIcon />
                    </ListItemIcon>
                    <ListItemText primary="Movies" />
                  </ListItem>
                </Link>
                <Link to="/users" className="navLink">
                  <ListItem button>
                    <ListItemIcon>
                      <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                  </ListItem>
                </Link>
                <Link to="/favorites" className="navLink">
                  <ListItem button>
                    <ListItemIcon>
                      <StarBorderIcon />
                    </ListItemIcon>
                    <ListItemText primary="Favorites" />
                  </ListItem>
                </Link>
                <Link
                  to="/login"
                  onClick={() => app.auth().signOut()}
                  className="navLink"
                >
                  <ListItem button>
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Signout" />
                  </ListItem>
                </Link>
              </Drawer>
              <main className={classes.content}>
                <div className={classes.appBarSpacer} />

                <Typography component="div" className={classes.chartContainer}>
                  <Switch>
                    <PrivateRoute exact path="/" component={Recommend} />
                    <PrivateRoute exact path="/movies" component={MovieList} />
                    <PrivateRoute exact path="/users" component={UserList} />
                    <PrivateRoute
                      exact
                      path="/favorites"
                      component={Favorite}
                    />
                    <Route exact path="/signup" component={signup} />
                    <Route exact path="/login" component={login} />
                  </Switch>
                </Typography>
              </main>
            </div>
          </Router>
        </React.Fragment>
      </AuthProvider>
    );
  }
}

const Business = () => <div></div>;

export default withRouter(withStyles(styles)(App));
