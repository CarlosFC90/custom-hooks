import { useEffect, useReducer } from 'react'
import { todoReducer } from './todoReducer';

const init = () => {
  return JSON.parse( localStorage.getItem('todos') || []);
}

const useTodos = () => {

  const [ todos, dispatch ] = useReducer( todoReducer, [], init );

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify( todos ));
}, [todos])

  const handleDeleteTodo = ( id ) => {
    dispatch({
        type: '[TODO] Remove Todo',
        payload: id
    });
  }

  const handleNewTodo = ( todo ) => {

    const action = {
        type: '[TODO] Add Todo',
        payload: todo
    }

    dispatch( action );
  }

  const handleToggleTodo = ( id ) => {
    dispatch({
        type: '[TODO] Toggle Todo',
        payload: id
    });
  }

  return {
    todos,
    pendingTodosCount: todos.filter( todo => !todo.done ).length,
    handleDeleteTodo,
    handleToggleTodo,
    handleNewTodo,
    todosCount: todos.length,
  }
}

export default useTodos