import React, { useState, useEffect} from "react";
import { fetchRequest } from "../services/fetchRequest.js"

export const Todos = () => {
  /* REQUEST METHODS */
  // GET ALL
  const [todoItems, setTodo] = useState([]);
  
  useEffect(() => {
    async function getAllTodo() {
      setTodo(await fetchRequest.get())
    }
    getAllTodo();
  }, []);

  // POST NEW DATA
  const addHandler = async () => {
    const title = await prompt("Title:","");
    const content = await prompt("Content:","");

    function sendData(title, content){
      if(title !== null && title.length <= 0) title = null;
      if(content !== null && content.length <= 0) content = null;

      if(title === null && content !== null) return {'title': 'no title', 'content': content};
      else if(title !== null && content === null) return {'title': title, 'content': 'no content'};
      else if(title !== null && content !== null) return {'title': title, 'content': content};
      return null;
    }
    const data = sendData(title, content);
    if(data !== null){
      await fetchRequest.post(data);
      setTodo(await fetchRequest.get());
    }
  };

  // DELETE AN ITEM
  const deleteHandler = async (id) => {
    await fetchRequest.deleteItem(id);
    setTodo(await fetchRequest.get())
  };

  // EDIT AN ITEM
  const editHandler = async (id) => {
    const title = await prompt("New Title:","")
    const content = await prompt("New Content:","");
    if(id === null){
      return;
    }

    function checkingData(data, title, content) {
      // if the title or content are empty change its value to null
      if(title !== null && title.length <= 0) title = null;
      if(content !== null && content.length <= 0) content = null;

      // check the possible cases when editing
      if(title !== null && content !== null) return {'title': title, 'content': content};
      else if(title === null && content !== null) return {'title': data.title , 'content': content};
      else if(title !== null && content === null) return {'title': title, 'content': data.content};
      return {'title': data.title, 'content': data.content};
    };
    
    const data = await fetchRequest.getById(id);
    const newData = checkingData(data, title, content);
    await fetchRequest.editItem(id, newData);
    setTodo(await fetchRequest.get())
    //console.log(data);

  };

  const [deleteBool, setDeleteBool] = useState(false);
  const [editBool, setEditBool] = useState(false);

  const handlerDelete = (val) => setDeleteBool(val);
  const handlerEdit = (val) => setEditBool(val);

  const handlerToDo = (id) => {
    if(editBool && !deleteBool){
      editHandler(id);
      handlerEdit(false);
    } else if(deleteBool && !editBool){
      deleteHandler(id);
      handlerDelete(false);
    }
  };

  return (
    <React.Fragment>
      <aside className="asidec">
        <div className="flexFather">
          <h1 className="toolBarTitle">Tool Bar</h1>
          <button id="add" className="toolBarbutton" onClick={addHandler}>Add</button>
          <button id="delete" className="toolBarbutton" onClick={() => handlerDelete(true)}>Remove</button>
          <button id="edit" className="toolBarbutton" onClick={() => handlerEdit(true)}>Edit</button>
        </div>
      </aside>
      <section className="sectionc">
        <ul id="postItContainer" className="sectionToDo flexFather">
          {todoItems.map( ({id, title, content}, index) => {
            //console.log(id);
            return <li key={index} id={`note-${id}`} className='todo' onClick={() => handlerToDo(id)}><b>{title}</b>: {content}</li>
          })}
        </ul>
      </section>  
    </React.Fragment>
  );
}