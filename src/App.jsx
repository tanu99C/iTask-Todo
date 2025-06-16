import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from "./components/Navbar";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import img1 from "./assets/img1.png";
import img2 from "./assets/img2.png";
import img3 from "./assets/img3.png";
import img4 from "./assets/img4.png";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // Handle input change
  const handleChange = (e) => {
    setTodo(e.target.value);
    console.log("Input changed:", e.target.value);
  };

  // Add a new todo
  const handleAdd = () => {
    if (todo.trim() === "") return;
    if (editingId) {
      const updatedTodos = todos.map((item) =>
        item.id === editingId ? { ...item, todo: todo } : item
      );
      setTodos(updatedTodos);
      setEditingId(null);
      saveToLS(updatedTodos);
    } else {
      const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
      setTodos(newTodos);
      saveToLS(newTodos);
    }
    setTodo("");
  };

  // Toggle todo completion
  const handleCheckbox = (id) => {
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
    saveToLS(updatedTodos);
  };

  // Placeholder: Edit a todo
  const handleEdit = (id) => {
    const itemToEdit = todos.find((item) => item.id === id);
    setTodo(itemToEdit.todo); // Put text in input
    setEditingId(itemToEdit.id); // Mark it as editing
    console.log("Editing:", itemToEdit);
  };

  // Placeholder: Delete a todo
  const handleDelete = (id) => {
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos(filteredTodos);
    saveToLS(filteredTodos);
  };

  return (
    <>
      <Navbar />
      <div className="heading flex justify-center items-center gap-3 my-4 bg-violet-100 border-2 border-violet-300 rounded-xl p-3 shadow-md">
        <img src={img1} alt="img1" className="w-[100px] h-[100px]" />
        <img src={img2} alt="img2" className="w-[100px] h-[100px]" />
        <span className="text-4xl font-bold text-violet-900">iTask</span>
        <img src={img3} alt="img3" className="w-[100px] h-[100px]" />
        <img src={img4} alt="img4" className="w-[100px] h-[100px]" />
      </div>

      <div className="container mx-auto my-5 p-6 bg-violet-100 min-h-[80vh] rounded-xl">
        {/* Add Todo Input Section */}
        <div className="addTodo my-5 flex flex-col justify-center items-center text-center">
          <h2 className="text-xl font-bold mb-3 text-violet-900">Add a Todo</h2>

          <div className="flex flex-row items-center justify-center w-full">
            <input
              type="text"
              value={todo}
              onChange={handleChange}
              placeholder="Enter your task..."
              className="w-1/2 p-2 border border-violet-300 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:bg-gray-100 focus:text-black focus:placeholder-gray-600 outline-none transition-all duration-300"
            />

            <button
              onClick={handleAdd}
              className="bg-gradient-to-r from-violet-700 to-fuchsia-600 hover:from-violet-900 hover:to-fuchsia-700 text-white text-sm font-bold p-2 py-1 rounded-xl mx-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Save
            </button>
          </div>
        </div>

        {/* Todo List Section */}
        <h2 className="text-xl font-bold my-5 text-violet-900">Your Todos</h2>
        <div className="todos space-y-3">
          {todos.map((item) => (
            <div
              key={item.id}
              className="todo flex justify-between items-center bg-violet-200 hover:border-violet-800 border-2 border-violet-500 p-4 rounded-md shadow transition-all duration-300"
            >
              <div className="checkandtext flex gap-x-3">
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => handleCheckbox(item.id)}
                />

                <div
                  className={`text text-gray-800 ${
                    item.isCompleted ? "line-through" : ""
                  }`}
                >
                  {item.todo}
                </div>
              </div>

              <div className="buttons flex flex-row items-center gap-2">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="bg-yellow-500 hover:bg-yellow-600 p-2 py-1 text-sm font-bold text-white rounded-md"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 hover:bg-red-700 p-2 py-1 text-sm font-bold text-white rounded-md"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
