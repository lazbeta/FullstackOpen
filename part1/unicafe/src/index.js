import ReactDOM from 'react-dom'
import React, {useState} from "react";

const Statisticline = ({text, value}) => {
  return (
  <table>
    <tbody>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
      </tr>
    </tbody>
  </table>
  
  )
}

const Button = ({handleClicks, text}) => {
  return (
    <button onClick={handleClicks}>{text}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {

  const total = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / total;
  const positiveAverage = good / total * 100;

  if (total === 0) {
    return (
      <div> 
       <p> no data available</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Statistics</h2>
      <Statisticline text="good " value={good}/>
      <Statisticline text="neutral " value={neutral}/>
      <Statisticline text="bad " value={bad}/>
      <Statisticline text="total " value={total}/>
      <Statisticline text="average " value={average}/>
      <Statisticline text="positiveaverage " value={positiveAverage}/>
      </div>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClicks = () => {
    setGood(good+1)
  }

  const handleNeutralClicks = () => {
    setNeutral(neutral+1)
  }

  const handleBadClicks = () => {
    setBad(bad+1)
  }


  return (
    <div>
      <h2>give feedback</h2>

    <Button handleClicks={handleGoodClicks}  text="good"/>
    <Button handleClicks={handleNeutralClicks}  text="neutral"/>
    <Button handleClicks={handleBadClicks}  text="bad"/>

      
    <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
  )
}

export default App

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)