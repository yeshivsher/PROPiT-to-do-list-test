import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/styles";

import ToDoForm from './main-window/TodoForm';
import TodoList from "./main-window/TodoList";
import api from './api/main-window-api'
import EditForm from './main-window/EditForm';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column'
	},
	title: {
		alignSelf: 'center',
	},
	input: {
		alignSelf: 'center',
	}
})

function App() {
	// globals
	const classes = useStyles();

	// locals
	const [todos, setTodos] = useState([]);
	const [notOpenEditForm, setOpenEditForm] = useState(false)
	const [selectedTodo, setSelectedTodo] = useState({})

	const saveTodo = (text) => {
		let currentDate = moment().format();
		let todoObj = {
			title: text,
			createdDate: currentDate,
			modifiedDate: currentDate,
			done: false
		}

		api.addTodo(todoObj).then(data => {
			setTodos([...todos, data.todo]);
		}).catch(e => {
			console.log("saveTodo -> e", e)
		})
	};

	const deleteTodo = (todoId) => {
		let survivingTodos = [...todos]

		api.deleteTodoById(todoId).then(data => {
			survivingTodos = todos.filter(todo => todo._id !== todoId);
			setTodos(survivingTodos);
		}).catch(e => {
			console.log("deleteTodo -> e", e)
		})
	};

	const setTodoDone = (todoObj) => {
		let tempTodos = [...todos]
		let tempTodoObj = { ...todoObj }
		let currentDate = moment().format();

		tempTodoObj.done = !tempTodoObj.done
		tempTodoObj.modifiedDate = currentDate

		api.editTodoById(tempTodoObj).then(data => {
			for (let i in tempTodos) {
				if (tempTodos[i]._id === data.value._id) {
					tempTodos[i] = {
						...data.value,
						done: !data.value.done,
						modifiedDate: currentDate
					}
				}
			}

			setTodos([...tempTodos]);
		}).catch(e => {
			console.log("setTodoDone -> e", e)
		})
	};

	const editTodo = (todoObj) => {
		let tempTodos = [...todos]
		let tempTodoObj = { ...todoObj }
		let currentDate = moment().format();

		tempTodoObj.modifiedDate = currentDate

		api.editTodoById(tempTodoObj).then(data => {
			for (let i in tempTodos) {
				if (tempTodos[i]._id === data.value._id) {
					tempTodos[i] = { ...todoObj, modifiedDate: currentDate }
				}
			}

			setTodos([...tempTodos]);
		}).catch(e => {
			console.log("setTodoDone -> e", e)
		})
	};

	useEffect(() => {
		let todosListFromServer = []

		api.getAllTodos().then(data => {
			console.log("initApp -> data", data)
			todosListFromServer = [...data]

			setTodos([...todosListFromServer]);
		}).catch(e => {
			console.log("initApp -> e", e)
		})

		console.log("App -> useEffect")
	}, [])

	return (
		<div className={classes.root}>
			<Typography component="h1" variant="h2" className={classes.title}>
				Todos
      		</Typography>
			<ToDoForm saveTodo={saveTodo} />
			<TodoList
				todos={todos}
				deleteTodo={deleteTodo}
				setTodoDone={setTodoDone}
				setOpenEditForm={() => setOpenEditForm(true)}
				setElementData={setSelectedTodo}
			/>
			{
				notOpenEditForm &&
				<EditForm
					editTodo={editTodo}
					elementData={selectedTodo}
					setElementData={setSelectedTodo}
					setNotOpenEditForm={() => setOpenEditForm(false)}
				/>
			}
		</div>
	);
}

export default App;
