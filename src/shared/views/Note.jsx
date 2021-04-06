import React, { useState } from "react";
import { Todos } from "../organisms/Todos"

export const Note = () => {
  const [addBool, setAddBool] = useState(false);
  const [deleteBool, setDeleteBool] = useState(false);
  const [editBool, setEditBool] = useState(false);

  const handlerAdd = (val) => setAddBool(val);
  const handlerDelete = (val) => setDeleteBool(val);
  const handlerEdit = (val) => setEditBool(val);

  return (
    <React.Fragment>
      <main className="gridFather">
        <header className="headerc">
          <div className="flexFather">
            <h1 id="title">To-doitealo</h1>
          </div>
        </header>

        <nav className="navc">
          <ul className="flexFather">
            <li className="navItem"><a href="toDoList.html">Menu</a></li>
            <li className="navItem"><a href="toDoList.html" target="_self">Post-tealo</a></li>
            <li className="navItem"><a href="toDoList.html" target="_self">To-doitealo</a></li>
            <li className="navItem"><a href="toDoList.html" target="_self">Gallery</a></li>
          </ul>
        </nav>
        <aside className="asidec">
          <div className="flexFather">
            <h1 className="toolBarTitle">Tool Bar</h1>
            <button id="add" className="toolBarbutton" onClick={() => handlerAdd(true)}>Add</button>
            <button id="delete" className="toolBarbutton" onClick={() => handlerDelete(true)}>Remove</button>
            <button id="edit" className="toolBarbutton" onClick={() => handlerEdit(true)}>Edit</button>
          </div>
        </aside>

        <section className="sectionc">
          <ul id="postItContainer" className="sectionToDo flexFather">
            <Todos 
            addCondition = {addBool}
            deleteCondition = {deleteBool}
            editCondition = {editBool}
            callbackAdd = {handlerAdd}
            callbackDelete = {handlerDelete}
            callbackEdit = {handlerEdit}
            />
          </ul>
        </section>        
      </main>
    </React.Fragment>
  );

}