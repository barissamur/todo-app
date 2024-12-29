"use client";

import { v4 as uuidv4 } from "uuid"; // Benzersiz ID oluşturmak için uuid kütüphanesi
import { useCallback, useState } from "react";
import { MdDelete } from "react-icons/md";

// Todo class tanımı
class Todo {
  id: string;
  task: string;
  completed: boolean;

  constructor(task: string) {
    this.id = uuidv4();
    this.task = task;
    this.completed = false;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const pendingTodos = todos.filter((todo) => !todo.completed); // Bekleyenler
  const completedTodos = todos.filter((todo) => todo.completed); // Tamamlananlar

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = new Todo(inputValue); // Yeni Todo oluştur
      setTodos([...todos, newTodo]); // Listeye ekle
      setInputValue("");
    }
  };

  const handleTodoClick = useCallback(
    (id: string) => {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          const updatedTodo = new Todo(todo.task); // Yeni bir Todo oluştur
          updatedTodo.completed = !todo.completed; // Durumu tersine çevir
          return updatedTodo;
        }
        return todo; // Diğer görevleri olduğu gibi döndür
      });
      setTodos(updatedTodos);
    },
    [todos]
  );

  const handleDeleteTodo = useCallback(
    (id: string) => {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    },
    [todos]
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Todo Uygulaması</h1>
      <div className="row">
        {/* sol sütun */}
        <div className="col-6 border-end border-3 border-secondary">
          <div className="h1 col-md-8 text-center offset-md-2">
            Bekleyen Görevler
          </div>
          <div className="col-md-8 offset-md-2">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTodo();
                  }
                }}
                placeholder="Yeni bir todo ekle"
              />
              <button className="btn btn-success" onClick={addTodo}>
                Ekle
              </button>
            </div>
            <ul className="list-group">
              {pendingTodos.map((todo, index) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={todo.id}
                  onClick={() => handleTodoClick(todo.id)}
                  style={{ cursor: "pointer" }}
                >
                  <span
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    {todo.task}
                  </span>
                  <div className="d-flex align-items-center">
                    <MdDelete
                      className="ms-3"
                      size={24}
                      color="red"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation(); // Parent'ın onClick olayını engeller
                        handleDeleteTodo(todo.id); // İlgili görevi siler
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* sağ sütun */}
        <div className="col-6">
          <div className="h1 col-md-8 text-center offset-md-2">
            Tamamlanan Görevler
          </div>
          <ul className="list-group">
            {completedTodos.map((todo, index) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={todo.id}
                onClick={() => handleTodoClick(todo.id)}
                style={{ cursor: "pointer" }}
              >
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.task}
                </span>
                <div className="d-flex align-items-center">
                  <MdDelete
                    className="ms-3"
                    size={24}
                    color="red"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation(); // Parent'ın onClick olayını engeller
                      handleDeleteTodo(todo.id); // İlgili görevi siler
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-8 offset-md-2 mt-3">
          Bekleyen Görev Sayısı: {pendingTodos.length}
        </div>
      </div>
    </div>
  );
}
