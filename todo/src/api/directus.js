const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL;
const DIRECTUS_TOKEN = import.meta.env.VITE_DIRECTUS_TOKEN;

export const fetchTodos = async () => {
  const response = await fetch(`${DIRECTUS_URL}items/todo`, {
    headers: {
      Authorization: `Bearer ${DIRECTUS_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.data;
};

export const addTodo = async (newTitle) => {
  const response = await fetch(`${DIRECTUS_URL}items/todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DIRECTUS_TOKEN}`,
    },
    body: JSON.stringify({ title: newTitle, is_completed: false }),
  });

  if (!response.ok) {
    throw new Error("Failed to add todo");
  }

  const data = await response.json();
  return data.data;
};

export const updateTodo = async ({ id, is_completed }) => {
  const response = await fetch(`${DIRECTUS_URL}items/todo/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DIRECTUS_TOKEN}`,
    },
    body: JSON.stringify({ is_completed }),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  const data = await response.json();
  return data.data;
};
