import { MdDelete } from "react-icons/md";
import React from "react";

// TodoList için Props tanımları
type TodoListProps = {
  title: string; // Liste başlığı
  todos: { id: string; task: string; completed: boolean }[]; // Todo listesi
  onTodoClick: (id: string) => void; // Görev tıklama fonksiyonu
  onDeleteClick: (id: string) => void; // Görev silme fonksiyonu
};

const TodoList: React.FC<TodoListProps> = ({
  title,
  todos,
  onTodoClick,
  onDeleteClick,
}) => {
  return (
    <div className="col-6">
      <div className="h1 text-center">{title}</div>
      <ul className="list-group">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="list-group-item d-flex justify-content-between align-items-center"
            onClick={() => onTodoClick(todo.id)}
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
                  onDeleteClick(todo.id); // Görevi silme işlemi
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
