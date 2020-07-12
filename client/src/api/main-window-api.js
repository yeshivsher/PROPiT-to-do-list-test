import { server } from '../config'
import axios from 'axios'

const SERVER_URL = server.url

const getAllTodos = async () => {
    const query = SERVER_URL + '/api'

    return new Promise(async (resolve, reject) => {
        fetch(query, {
            method: 'GET',
            header: {
                Accept: 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                console.log("TCL: getAllTodos -> err", err)
                reject()
            })
    })
}

const addTodo = async newTodo => {
    let query = SERVER_URL + '/api'

    return new Promise(async (resolve, reject) => {
        let result = {};

        fetch(query, {
            method: "post",
            body: JSON.stringify(newTodo),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(data => {
                result = data;
                resolve(result);
            })
            .catch(err => {
                console.log("TCL: addTodo -> err", err)
                reject()
            })
    });
}

const deleteTodoById = async todoId => {
    let query = SERVER_URL + '/api/' + todoId

    return new Promise(async (resolve, reject) => {
        let result = {};

        fetch(query, {
            method: "DELETE"
        })
            .then(data => {
                result = data;
                resolve(result);
            })
            .catch(err => {
                console.log("TCL: deleteTodoById -> err", err)
                reject()
            })
    });
};

const editTodoById = async todo => {
    let query = SERVER_URL + '/api/' + todo._id
    let preperedTodoObj = {
        title: todo.title,
        createdDate: todo.createdDate,
        modifiedDate: todo.modifiedDate,
        done: todo.done
    }

    return new Promise(async (resolve, reject) => {
        let result = {};

        fetch(query, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(preperedTodoObj)
        })
            .then(response => response.json())
            .then(data => {
                result = data;
                resolve(result);
            })
            .catch(err => {
                console.log("TCL: editTodoById -> err", err)
                reject()
            })
    });
}

export default {
    getAllTodos,
    addTodo,
    deleteTodoById,
    editTodoById
}