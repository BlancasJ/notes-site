import React from "react";
import { Todos } from "../organisms/Todos"

export const Note = () => {

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
        <Todos />      
      </main>
    </React.Fragment>
  );

}