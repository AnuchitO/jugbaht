import React from 'react'
import { useHistory } from 'react-router-dom'

const Go = () => {
  let history = useHistory();

  return (
    <p>
      <button
        onClick={() => {
          history.push("/summary");
        }}
      >
        Hello
      </button>
    </p>
  );
}

export default Go