import React, { useMemo } from "react";
import { Heading, List, Stack, useBreakpointValue } from "@chakra-ui/react";
import { ITodo } from "../interfaces/interfaces";
import ListItems from "./TodoItem";

type T = {
  todos: ITodo[];
  query: string;
  onToggle(id: number): void;
  onRemove: (id: number) => void;
};

const TodoList: React.FC<T> = ({ todos, onRemove, onToggle, query }) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [todos, query]);

  if (todos.length === 0) {
    return (
      <>
        <Stack m={2} align={"center"} justify={"center"}>
          <Stack
            w={isDesktop ? "3xl" : "full"}
            boxShadow={"base"}
            rounded={"lg"}
            p={4}
            _dark={{ bg: "whiteAlpha.100", borderColor: "gray.700" }}
            mt={5}
            align={"center"}
            justify={"center"}
          >
            <Heading>There's nothing yet!</Heading>;
          </Stack>
        </Stack>
      </>
    );
  }

  return (
    <>
      {filteredTodos.map((todo) => {
        return (
          <Stack m={2} key={todo.id} mt={4} align={"center"} justify={"center"}>
            <List
              fontWeight={500}
              bg={todo.completed === true ? "none" : "green.200"}
              w={isDesktop ? "3xl" : "full"}
              boxShadow={"base"}
              rounded={"lg"}
              p={6}
              spacing={3}
              _dark={{ bg: "whiteAlpha.100", borderColor: "gray.700" }}
            >
              <ListItems
                onRemove={onRemove}
                onToggle={onToggle}
                todo={todo}
                isDesktop={isDesktop}
              />
            </List>
          </Stack>
        );
      })}
    </>
  );
};

export default TodoList;
