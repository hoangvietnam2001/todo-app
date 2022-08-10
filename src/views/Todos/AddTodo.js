import React from "react";
import { toast } from 'react-toastify';

class AddTodo extends React.Component {

    state = {
        id: '',
        title: '',
    }

    handleOnChangeTitle = (e) => {
        this.setState({
            title: e.target.value,
        })
    }

    handleOnClickButtonAdd = (e) => {
        const { addNewTodo } = this.props;
        const todo = {
            id: Math.floor(Math.random() * 1000),
            title: this.state.title
        }

        //if(undefined/null/empty) => false
        if (!this.state.title) {
            // alert('Please Enter Full Type');
            toast.error(`Missing title's Todo!`);
            return;
        }
        else {
            e.preventDefault();
            addNewTodo(todo);

            this.setState({
                title: '',
            })
        }
    }


    render() {
        return (
            <>
                <div className="add-todo">
                    <input
                        type='text'
                        value={this.state.title}
                        onChange={(e) => { this.handleOnChangeTitle(e) }}
                    />
                    <button
                        type='button'
                        className="add"
                        onClick={(e) => { this.handleOnClickButtonAdd(e) }}>Add</button>
                </div>
            </>
        )
    }
}

export default AddTodo;