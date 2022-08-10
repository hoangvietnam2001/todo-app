import React from "react";
import './ListTodo.scss';
import AddTodo from "./AddTodo.js";
import { toast } from 'react-toastify';

class ListTodo extends React.Component {

    state = {
        listTodos: [
            { id: 'todo1', title: 'Nguyễn Đức Lon G' },
            { id: 'todo2', title: 'Phan Thị Thanh Hoài' },
            { id: 'todo3', title: 'Phan Thị 1986' },
        ],
        editTodo: {},
    }

    addNewTodo = (item) => {
        if (item) {
            this.setState({
                listTodos: [...this.state.listTodos, item],
            })
            //hien toast thong bao
            toast.success('Added successfully');
        }
    }

    deleteTodo = (id) => {
        // console.log(id);
        const { listTodos } = this.state;

        this.setState({
            listTodos: listTodos.filter((item) => {
                return item.id !== id;
            })
        })
        toast.success('Deleted Successfully');
    }

    handleEditTodo = (todo) => {

        let { editTodo, listTodos } = this.state;
        let isEmptyEditTodo = Object.keys(editTodo).length === 0;
        if (isEmptyEditTodo === false && editTodo.id === todo.id) {
            // console.log('check to do: ',todo);
            let listTodosCopy = [...listTodos];
            let objIndex = listTodosCopy.findIndex(item => item.id === todo.id);

            listTodosCopy[objIndex].title = editTodo.title;
            this.setState({
                listTodos:listTodosCopy,
                editTodo : {}
            });
            toast.success('Updated successed');
            return;
        } else {
            this.setState({
                editTodo: todo,            
            })
        }
    }

    handleOnChangeEditTodo = (e) => {
        // e.preventDefault();
        let editTodoCopy = { ...this.state.editTodo };
        editTodoCopy.title = e.target.value;
        this.setState({
            editTodo: editTodoCopy,
        })
    }


    render() {

        const { listTodos, editTodo } = this.state;
        let isEmptyEditTodo = Object.keys(editTodo).length === 0;// lấy ra dãy các key của obj nếu ko có key nào nó sẽ trả về true
        //console.log('>>check empty : ', isEmptyEditTodo);
        return (
            <div className="list-todo-container">

                <AddTodo
                    listTodos={this.state.listTodos}
                    addNewTodo={this.addNewTodo}
                />

                <div className="list-todo-content">
                    {// Check điều kiện nếu ko muốn TH method map bị lỗi
                        listTodos && listTodos.length > 0 && listTodos.map((item, index) => {
                            return (
                                <div className="todo-child" key={item.id}>
                                    {isEmptyEditTodo === false && editTodo['id'] === item.id ?
                                        <span>{index + 1} - <input type='text' value={editTodo.title}
                                            onChange={(e) => { this.handleOnChangeEditTodo(e) }} /></span>
                                        :
                                        <span className="todo-child-child">{index + 1} - {item.title} </span>
                                    }
                                    <button
                                        className="edit"
                                        onClick={() => {
                                            this.handleEditTodo(item);
                                        }}>
                                        {isEmptyEditTodo === false && editTodo.id === item.id ? 'Save' : 'Edit'}
                                    </button>

                                    <button
                                        className="delete"
                                        onClick={() => { this.deleteTodo(item.id) }}>Delete</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ListTodo;