import React, { useState, useEffect} from "react";
import { fetchRequest } from "../services/fetchRequest.js"

export const Todos = ({ addCondition, deleteCondition, editCondition, callbackAdd, callbackDelete, callbackEdit}) => {
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
    const title = prompt("Title:","");
    const content = prompt("Content:","");
    const data = {'title': title, 'content': content};
    console.log(data);
    await fetchRequest.post(data);
    setTodo(await fetchRequest.get())
  };

  // DELETE AN ITEM
  const deleteHandler = async (id) => {
    await fetchRequest.deleteItem(id);
    setTodo(await fetchRequest.get())
  };

  // EDIT AN ITEM
  const editHandler = async (id) => {
    const title = prompt("New Title:","")
    const content = prompt("New Content:","");
    if(id === null){
      return;
    }

    function checkingData(data) {
      let data2update;
      if(title === null) {
        data2update = {'title': data.title ,'content': content};
      } else if(content === null) {
        data2update = {'title': title, 'content': data.content};
      } else {
        data2update = {'title': title, 'content': content};
      }
      return data2update;
    };

    const data = await fetchRequest.getById(id);
    const newData = checkingData(data);
    await fetchRequest.editItem(id, newData);
    setTodo(await fetchRequest.get())
    //console.log(data);

  };

  const handlerToDo = (id) => {
    if(addCondition && !deleteCondition && !editCondition){
      addHandler();
      callbackAdd(false);
    } else if(editCondition && !deleteCondition && !addCondition){
      editHandler(id);
      callbackEdit(false);
    } else if(deleteCondition && !addCondition && !editCondition){
      deleteHandler(id);
      callbackDelete(false);
    }
  };

  return (
    <React.Fragment>
      {todoItems.map( ({id, title, content}, index) => {
        //console.log(id);
        return <li key={index} id={`note-${id}`} className='todo' onClick={() => handlerToDo(id)}><b>{title}</b>: {content}</li>
      })}
    </React.Fragment>
  );
}