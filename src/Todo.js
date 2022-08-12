import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  constructor(props){
    super(props);
    this.state = {
      completed: this.props.completed
    }
  this.complete = this.complete.bind(this);
  }
complete(event){
 var apiKey ="7401aa-2aac38-771392-e4266b-1c145c";
 var self = this;
 var id = event.target.parentNode.id;
 var data ={completed: true};
 var completeRequest = new XMLHttpRequest();
   completeRequest.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
          self.setState({
            completed: true
           })
      }
      else if (this.readyState === 4) {
              console.log(this.responseText);
      }
   }
 completeRequest.open("PUT","https://cse204.work/todos/" + id, true);
 completeRequest.setRequestHeader("Content-Type","application/json");
 completeRequest.setRequestHeader("x-api-key", apiKey);
 completeRequest.send(JSON.stringify(data));
}

    render() {
      var className = "todo"
      if (this.state.completed){
        className="completed"
      }
        return (
            <section className = "item">
          <li id={this.props.id} className ={className}>
            <input type="button" value="Task Done" className="taskDone" onClick={this.complete}/>
            <p> {this.props.text} </p>
            <button className="deleteBtn" onClick={this.props.delete}>Delete</button>
          </li>
                      </section>
        );
    }
}

export default Todo;
