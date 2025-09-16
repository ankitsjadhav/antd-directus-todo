import React, { useState } from "react";
import { List, Input, Button, Checkbox } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTodos, addTodo, updateTodo } from "../api/directus";

function TodoApp() {
  const [newTodoText, setNewTodoText] = useState("");
  const queryClient = useQueryClient();

  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setNewTodoText("");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div>
      <h2>My Todos</h2>
      <div>
        <Input
          placeholder="Add a new task"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onPressEnter={() => addMutation.mutate(newTodoText)}
        />
        <Button type="primary" onClick={() => addMutation.mutate(newTodoText)}>
          Add
        </Button>
      </div>
      <List
        dataSource={todos || []}
        renderItem={(todo) => (
          <List.Item>
            <Checkbox
              checked={todo.is_completed}
              onChange={() => {
                updateMutation.mutate({
                  id: todo.id,
                  is_completed: !todo.is_completed,
                });
              }}
            >
              <span>{todo.title}</span>
            </Checkbox>
          </List.Item>
        )}
      />
    </div>
  );
}

export default TodoApp;
