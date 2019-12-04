import React from 'react';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        {/* expenses */}
        {/* Amount */}
        <input type="number" onChange={(e) => console.log(e.target.value)} placeholder="0 bath" />

        {/* Members */}
        <div>
          <div>
            <input type="checkbox" id="1" name="members" onChange={(e) => console.log(e.target.value)} checked />
            <label htmlFor="1">AnuchitO</label>
          </div>
          <div>
            <input type="checkbox" id="2" name="members" onChange={(e) => console.log(e.target.value)} checked />
            <label htmlFor="2">Kob</label>
          </div>
          <div>
            <input type="checkbox" id="3" name="members" onChange={(e) => console.log(e.target.value)} checked />
            <label htmlFor="3">Tom</label>
          </div>
          <div>
            <input type="checkbox" id="4" name="members" onChange={(e) => console.log(e.target.value)} checked />
            <label htmlFor="4">offlane</label>
          </div>
        </div>

        {/* Note */}
        <label htmlFor="note">Note</label>
        <select name="note" id="note" >
          <option value="food">Food</option>
          <option value="drink">Drink</option>
          <option value="fuel">Fuel</option>
          <option value="snack">Snack</option>
        </select>



      </header>


      <button type="button">
        Add to favorites
        </button>


    </div>
  );
}

export default App;
