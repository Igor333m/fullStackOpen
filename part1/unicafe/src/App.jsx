import { useState } from 'react'
import Button from './Button'
import Statistics from './Statistics'
import Anecdotes from './Anecdotes'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const update = (type, setType) => {
    setTotal(total + 1)
    return setType(type + 1)
  }

  return (
    <>
      <h1>Give Feedback</h1>
      <hr />
      <Button update={() => update(good, setGood)} text='Good' />
      <Button update={() => update(neutral, setNeutral)} text='Neutral' />
      <Button update={() => update(bad, setBad)} text='Bad' />

      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
      <hr />

      <Anecdotes></Anecdotes>
    </>
  )
}

export default App