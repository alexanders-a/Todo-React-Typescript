import { useToast } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { ITodo } from "../interfaces/interfaces";
import { TodoAdd } from "../Components/Todo/TodoAdd";
import TodoList from "../Components/Todo/TodoList";

type T = {
  query: any;
};
const TodoPage: React.FC<T> = ({ query }) => {
  const [todos, setTodos] = useState<ITodo[]>(
    JSON.parse(localStorage.getItem("todos") || "[]") as ITodo[]
  );

  const toast = useToast();

  const handleAdd = useCallback(
    (title: string) => {
      const newTodo = {
        title: title,
        id: Date.now(),
        completed: false,
      };
      toast({
        title: "Success",
        variant: "left-accent",
        isClosable: true,
        position: "top-right",
        status: "success",
      });
      setTodos((prev) => [newTodo, ...prev]);
    },
    [toast]
  );

  const toggleHandler = useCallback(
    (id: number) => {
      setTodos((prev) =>
        prev.map((todo) => {
          if (todo.id === id) {
            todo.completed = !todo.completed;
          }

          if (todo.completed === false && todo.id === id) {
            toast({
              title: "Great",
              variant: "left-accent",
              isClosable: true,
              position: "top-right",
              status: "success",
            });
          }
          return todo;
        })
      );
    },
    [toast]
  );

  const removeHandler = useCallback(
    (id: number) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      toast({
        title: "Deleted",
        variant: "left-accent",
        isClosable: true,
        position: "top-right",
        status: "success",
      });
    },
    [toast]
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <TodoAdd onAdd={handleAdd} />
      <TodoList
        todos={todos}
        query={query}
        onToggle={toggleHandler}
        onRemove={removeHandler}
      />
    </>
  );
};

export default TodoPage;
