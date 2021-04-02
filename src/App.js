/*import logo from './logo.svg';*/
import './App.css';
import React, { useState, useEffect} from "react";

function App() {

  /******************* GET ALL ITEMS FROM THE DATABASE ****************/
  // consult all components in database ToDo
  const [todoItems, setTodo] = useState([]);

  useEffect(() => {
    function getAllTodo() {
      fetch('http://18.188.97.141/api/postIt')
      .then(response => response.json())
      .then(data => setTodo(data));
    }
    getAllTodo();
  });//, ['http://18.188.97.141/api/postIt']);
  console.log(todoItems);
  
  /******************* POST A NEW ITEM TO THE DATABASE ****************/
  const addToDo = useState(0);
  const addHandler = function addToDo() {
    const title = prompt("Title:","");
    const content = prompt("Content:","");
    const data = {'title': title, 'content': content};
    console.log(data);
    fetch("http://18.188.97.141/api/postIt", {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }

  /******************* DELETE AN ITEM FROM THE DATABASE ****************/
  const deleteToDo = useState(0);
  const deleteHandler = function deleteToDo() {
    const id = prompt("id:","");
    console.log(id);
    fetch(`http://18.188.97.141/api/postIt/${id}`, {
      method: 'DELETE',
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }

  /******************* EDIT AN ITEM FROM THE DATABASE ****************/
  const editToDo = useState(0);
  const editHandler = function editToDo() {
    const id = prompt("id:","");
    const title = prompt("New Title:","")
    const content = prompt("New Content:","");
    if(id === null){
      return;
    }

    function getById(id) {
      fetch(`http://18.188.97.141/api/postIt/${id}`)
      .then(response => response.json())
      .then(data => callback(data));
    }
    getById(id);

    function callback(data){
      let data2update;
      if(title === null) {
        data2update = {'title': data.title ,'content': content};
      } else if(content === null) {
        data2update = {'title': title, 'content': data.content};
      } else {
        data2update = {'title': title, 'content': content};
      }
      console.log(data2update);
      fetch(`http://18.188.97.141/api/postIt/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data2update),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
    }

  }
  /******************* INDEX HTML CONTENT ****************/

  return (
    <main className="gridFather">
      <header className="headerc">
        <div className="flexFather">
          <h1 id="title">To-doitealo</h1>
        </div>
      </header>

      <nav className="navc">
        <ul className="flexFather">
          <li className="navItem"><a href="">Menu</a></li>
          <li className="navItem"><a href="#" target="_self">Post-tealo</a></li>
          <li className="navItem"><a href="toDoList.html" target="_self">To-doitealo</a></li>
          <li className="navItem"><a href="#" target="_self">Gallery</a></li>
        </ul>
      </nav>
      <aside className="asidec">
        <div className="flexFather">
          <h1 className="toolBarTitle">Tool Bar</h1>
          <button id="add" className="toolBarbutton" onClick={addHandler}>Add</button>
          <button id="delete" className="toolBarbutton" onClick={deleteHandler}>Remove</button>
          <button id="edit" className="toolBarbutton" onClick={editHandler}>Edit</button>
        </div>
      </aside>

      <section className="sectionc">
        <ul id="postItContainer" className="sectionToDo flexFather">
          {todoItems.map( ({itemId, title, content}) => {
            //console.log(itemId);
            //console.log(title);
            //console.log(content);
            return <li id={`${itemId}`} className='todo'><b>{title}</b>: {content}</li>//checarid
          })}
        </ul>
      </section>        
    </main>
  );
}

export default App;
