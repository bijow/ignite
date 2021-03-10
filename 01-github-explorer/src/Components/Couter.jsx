import React from 'react'

export function Counter () {
  const [counter, setCounter] = React.useState(0)

  function handleIncrement() {
    setCounter(counter + 1)
  }
  function handleDecrement() {
    if (counter <= 0) return
    setCounter(counter - 1)
  }
  return (
    <div>
      <h2>{counter}</h2>
      <button
        onClick={handleIncrement}
        type="button"
      >Adiciona</button>
      <button
        onClick={handleDecrement}
        type="button"
      >Remove 1</button>
    </div>
  )
}