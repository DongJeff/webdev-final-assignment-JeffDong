import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
    render() {
        return (
              <form onSubmit={this.props.add}>
                  <h2 >Add Item</h2>
                  <input type="text" value={this.props.input} onChange={this.props.onChange}/>
                  <button>Add</button>
              </form>
        );
    }
}

export default NewTodo;
