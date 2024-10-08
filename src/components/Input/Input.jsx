import React, { useState } from 'react'
import "./input.css"
const Input = ({onSubmit}) => {
    const[input,setInput] = useState("");
    const handleSubmit = () => {
        if(!input) return;
        onSubmit(input);
        setInput("");
    }
  return (
    <div className="container">
      <input
        className="input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSubmit} className="button">
        Add
      </button>
    </div>
  )
}

export default Input
