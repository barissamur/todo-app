"use client";

import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "@/components/TodoList";

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
      const newTodo = new Todo(inputValue);
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const handleTodoClick = useCallback(
    (id: string) => {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.toggleCompleted();
        }
        return todo;
      });
      setTodos([...updatedTodos]);
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
        <div className="col-12 mb-3">
          <div className="input-group">
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
        </div>

        {/* Bekleyen Görevler */}
        <TodoList
          title="Bekleyen Görevler"
          todos={pendingTodos}
          onTodoClick={handleTodoClick}
          onDeleteClick={handleDeleteTodo}
        />

        {/* Tamamlanan Görevler */}
        <TodoList
          title="Tamamlanan Görevler"
          todos={completedTodos}
          onTodoClick={handleTodoClick}
          onDeleteClick={handleDeleteTodo}
        />
      </div>
    </div>
  );
}
