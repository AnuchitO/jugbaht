import React, { Fragment } from 'react'
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom'
import './App.css'
import {
  AppBar,
  Button,
  Container,
  Fab,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import {
  Search as SearchIcon,
  Menu as MenuIcon,
  Add as AddIcon,
  More as MoreIcon,
} from '@material-ui/icons'
import { AppState } from './store'
import Expenses from './Expenses'
import Summary from './Summary'

const SimpleMenu: React.FC = () => {

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true">
        Open Menu
      </Button>

    </div>
  );
}



type NavMenuProps = {
  naviagateTo: (path: string) => any
}

const NavMenu: React.FC<NavMenuProps> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (path: string) => {
    setAnchorEl(null);
    props.naviagateTo(path)
  };

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={handleMenu} edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleClose("/")}>Expenses</MenuItem>
              <MenuItem onClick={() => handleClose("/summary")}>Summary</MenuItem>
            </Menu>
          </IconButton>
          <Typography variant="h6" >
            Jugbaht
          </Typography>
        </Toolbar>
      </AppBar>
    </Fragment >
  )
}

type NavComponentProps = {
  history: any
}
class NavComponent extends React.Component<NavComponentProps> {
  render() {
    return (
      <Fragment>
        <NavMenu naviagateTo={(path: string) => { this.props.history.push(path) }} />
      </Fragment>
    )
  }
}

const Nav = withRouter(connect(
  (state: AppState) => ({}),
  {})(NavComponent));

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "flex",
      flexFlow: "column",
      height: "calc(100vh - 32px)",
    }
  })

);

const App: React.FC<AppState> = (props) => {
  const classes = useStyles()
  // return (
  //   <div className="App">
  //     <Router>
  //       <Container maxWidth="md">
  //         <Grid container>
  //           <Grid item xs={12}>
  //             {/* TODO: Add Nav bar redirect. */}
  //             {/* <Nav />  */}
  //             <ul>
  //               <li><Link to="/">Expenses</Link></li>
  //               <li><Link to="/summary">Summary</Link></li>
  //             </ul>
  //           </Grid>
  //           <Grid item xs={12}>
  //             <Route path="/" exact component={Expenses} />
  //             <Route path="/summary" component={Summary} />
  //           </Grid>
  //         </Grid>
  //       </Container>
  //     </Router>

  //   </div>
  // )

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            Jugbaht
          </Typography>
        </Toolbar>
      </AppBar>
      <Router>
        <Route path="/" exact component={Expenses} />
        <Route path="/summary" component={Summary} />
      </Router>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({ ...state })

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(App)


// TODO: add initialize page setup
// TODO: load default trip and redirect to expenses page.