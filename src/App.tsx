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
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import {
  Menu as MenuIcon,
} from '@material-ui/icons'
import { AppState } from './store'
import Expenses from './Expenses'
import Summary from './Summary'

type NavMenuProps = {
  naviagateTo: (path: string) => any
}

const NavMenu: React.FC<NavMenuProps> = (props) => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const naviagateTo = (path: string) => {
    handleClose()
    props.naviagateTo(path)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={handleMenu}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Jugbaht
          </Typography>
        <div>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={() => naviagateTo("/")}>Expenses</MenuItem>
            <MenuItem onClick={() => naviagateTo("/summary")}>Summary</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexFlow: "column",
      height: "calc(100vh - 32px)",
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
)

const App: React.FC<AppState> = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Router>
        <Nav />
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
// TODO: slide right to open summary