import React from 'react'
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './App.css'
import { AppState } from './store'
import Expenses from './Expenses'
import Summary from './Summary'

const Nav = () => (
  <div>
    <ul>
      <li><Link to="/">Expenses</Link></li>
      <li><Link to="/summary">Summary</Link></li>
    </ul>
  </div>
);

const App: React.FC<AppState> = (props) => {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Route path="/" exact>
          <Expenses />
        </Route>
        <Route path="/summary" component={Summary} />
      </Router>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({ ...state })

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(App)
