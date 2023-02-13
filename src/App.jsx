import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { MyCanvas } from './Canvas'

function App() {

  //Quick State to control the state where the colors should reverse (true) or not (false)
  const [reverse, setReverse] = useState(false)

  return (
    <div className="App">
      <div>
        <h2>Education Horizons Coding Challenge</h2>
        <a target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <hr />
      <br />
      {/* Button that will control the reverse state */}
      <button onClick={() => setReverse(!reverse)}> Reverse Colors </button>
      <div className="card">
        {/* Load the Canvas Component */}
        <MyCanvas reverse={reverse} width={512} height={512} />
      </div>
      <p className="read-the-docs">
        Designed by @Gabriel Terra
      </p>
    </div>
  )
}

export default App
