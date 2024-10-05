import { useState, useEffect } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDoList, setToDoList] = useState([]);

  const onChange = (e) => {
    setToDo(e.target.value);
  };
  const addTodo = (e) => {
    e.preventDefault();
    if (toDo === "") {
      return;
    }
    setToDoList((prev) => [toDo, ...prev]);
    setToDo("");
  };

  return (
    <div>
      todo 갯수 {toDoList.length}
      <form onSubmit={addTodo}>
        <input type="text" placeholder="Write your to do..." value={toDo} onChange={onChange} />
        <button type="submit">추가</button>
      </form>
      <ul>
        {toDoList.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
