import React, {useState} from 'react';
import ToDo from './ToDo';
import ToDoForm from './ToDoForm';


function ToDoList() {
    const [todos, setToDos] = useState([])

    const addToDo = todo => {if (!todo.text || /^\s*$/.test(todo.text)) {
        return
    }

    const newToDos = [todo, ...todos];

    setToDos(newToDos);
};


const updateToDo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
        return;
    }
    setToDos(prev => prev.map(item => (item.id === todoId ? newValue : item))
    );
};



const removeToDo = id => {
    const removeArr = [...todos].filter(todo => todo.id !==id);

    setToDos(removeArr);
};



const completeToDo = id => {
    let updatedToDos = todos.map(todo => {
        if (todo.id === id) {
            todo.isComplete = !todo.isComplete;
        }
        return todo;
    });
    setToDos(updatedToDos);
};

  return (
    <div>    
        <h2> What's The Plan for Today? </h2>
        <ToDoForm onSubmit={addToDo} />
        <ToDo 
        todos={todos}
        completeToDo={completeToDo} removeToDo={removeToDo} updateToDo={updateToDo}/>
    </div>
  );
}

export default ToDoList