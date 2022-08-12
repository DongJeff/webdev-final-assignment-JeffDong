import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';
var apiKey = "7401aa-2aac38-771392-e4266b-1c145c"
var api = "https://cse204.work/todos"

class App extends Component {
    constructor(){
        super();
        this.state = {
          todos:[],
          input: ''
        }
        this.onChange = this.onChange.bind(this);
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.sortElement = this.sortElement.bind(this);
      }

      onChange(event) {
        this.setState({
          input: event.target.value
        });
      }

     componentDidMount(){
      var apiKey ="7401aa-2aac38-771392-e4266b-1c145c";
      var self = this;
            var createRequest = new XMLHttpRequest();
            createRequest.onreadystatechange = function() {
           if (this.readyState === 4 && this.status === 200) {
               var todos = JSON.parse(this.responseText);
             console.log(todos)
             self.setState({todos: todos})
           }
             else if (this.readyState === 4) {
                   console.log(this.responseText);
           }
            };
            createRequest.open("GET","https://cse204.work/todos");
            createRequest.setRequestHeader("Content-Type","application/json");
            createRequest.setRequestHeader("x-api-key", apiKey);
            createRequest.send();
    }
     complete(event){
      var apiKey ="7401aa-2aac38-771392-e4266b-1c145c";
      var self = this;
        var todoId = event.target.parentNode.id;
        var data ={completed: true};
        var completeRequest = new XMLHttpRequest();
            completeRequest.onreadystatechange = function() {
                 if (this.readyState === 4 && this.status === 200) {
               self.setState({
                 className: "todo completed"
               })
                 }
                 else if (this.readyState === 4) {
                                 console.log(this.responseText);
                 }
            }
        completeRequest.open("PUT","https://cse204.work/todos/" + todoId, true);
        completeRequest.setRequestHeader("Content-Type","application/json");
        completeRequest.setRequestHeader("x-api-key", apiKey);
        completeRequest.send(JSON.stringify(data));
    }

    add(event){
      var apiKey ="7401aa-2aac38-771392-e4266b-1c145c";
      event.preventDefault();
      var self = this;
      var newTodoText = {
        text: this.state.input
      }
            var createRequest = new XMLHttpRequest();
              createRequest.onreadystatechange = function() {
                 if (this.readyState === 4 && this.status === 200) {
                    var todo = JSON.parse(this.responseText);
                    self.setState({todos: [...self.state.todos,todo]});
                 }
                 else if (this.readyState === 4) {
                         console.log(this.responseText);
                 }
              };
            createRequest.open("POST","https://cse204.work/todos");
            createRequest.setRequestHeader("Content-Type","application/json");
            createRequest.setRequestHeader("x-api-key", apiKey);
            createRequest.send(JSON.stringify(newTodoText));
            this.state.input = '';
    }

     delete(event){
      var apiKey ="7401aa-2aac38-771392-e4266b-1c145c";
      var self = this;
        var todoId = event.target.parentNode.id;
        var data ={completed: true};
        var deleteRequest = new XMLHttpRequest();
            deleteRequest.onreadystatechange = function() {
                 if (this.readyState === 4 && this.status === 200) {
              const remainingTodos = self.state.todos.filter((todo) => {
              if (todo.id !== todoId) {return todo;}
            });
            self.setState({todos: remainingTodos});
                 }
                 else if (this.readyState === 4) {
                                 console.log(this.responseText);
                 }
            }
        deleteRequest.open("DELETE","https://cse204.work/todos/" + todoId, true);
        deleteRequest.setRequestHeader("Content-Type","application/json");
        deleteRequest.setRequestHeader("x-api-key", apiKey);
        deleteRequest.send();
    }

    sortElement(){
      const sortTheseTodos = this.state.todos;
      sortTheseTodos.sort(function (a, b) {
         return parseFloat(b.created) - parseFloat(a.created);
      });
      this.setState({todos: sortTheseTodos} );
    }
    render() {
        return (
          <div>
               <h2>Jeff Dong ToDo App </h2>
              <NewTodo add={this.add} onChange={this.onChange} input={this.state.input}/>
              <h2><button onClick={this.sortElement}>Sort By Date</button></h2>
              <h3>Todo List</h3>
              <ul>
                {this.state.todos.map((todo) =>
                    <Todo key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    delete={this.delete}
                    complete={this.complete} />)}
              </ul>
          </div>
        );
    }
}

export default App;
