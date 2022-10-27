import React, {useState} from 'react'

function ToDoForm(props) {
const [input, setInput] = useState('');

// Allows for form entry to in text input. 
const handleChange = event => {
  setInput(event.target.value);
};

// Submits the text from the form entry to the list. 
const handleSubmit = event => {
  event.preventDefault();

  props.onSubmit({
    // This will need to be changed. Look at Pedro's react tutorial and how he did ID #'s. 
    id: Math.floor(Math.random()*10000),
    text: input
  });

  setInput('')
};

  return (
    <form className='todo-form' onSubmit={handleSubmit}>
        <input 
        type='text' 
        placeholder='Add a To-Do Item'
        value={input}
        name='text'
        className='todo-input' 
        onChange={handleChange}
        />

        <button className='todo-button'> Add To-Do </button>
    </form>
  )
};

export default ToDoForm