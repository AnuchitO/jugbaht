import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import './App.css'
import Expenses from './Expenses'
import Summary from './Summary'


const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Expenses} />
        <Route path="/summary" component={Summary} />
      </Router>
    </div>
  )
}

export default App;
