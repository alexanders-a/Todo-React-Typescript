import React from "react";
import {
  Checkbox,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ITodo } from "../interfaces/interfaces";
import { DeleteIcon } from "@chakra-ui/icons";
import Moment from "react-moment";

type T = {
  todos: ITodo[];
  query: string;
  onToggle(id: number): void;
  onRemove: (id: number) => void;
};
const TodoList: React.FC<T> = ({ todos, onRemove, onToggle, query }) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });

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
      {todos
        .filter((todo) => todo.title.toLowerCase().includes(query))
        .map((todo) => {
          return (
            <Stack
              m={2}
              key={todo.id}
              mt={4}
              align={"center"}
              justify={"center"}
            >
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
                <ListItem>
                  <Flex justify={"space-between"}>
                    <Flex w={"lg"} align={"start"}>
                      <Text m={1}>{todo.title}</Text>
                    </Flex>
                    <Flex align={"center"}>
                      <Text fontWeight={600} mr={3}>
                        {isDesktop ? <Moment fromNow>{todo.id}</Moment> : null}
                      </Text>
                      <Flex>
                        {todo.completed === true ? (
                          <Checkbox
                            m={1}
                            mr={2}
                            size={"lg"}
                            borderRadius={"full"}
                            colorScheme={"green"}
                            onChange={onToggle.bind(null, todo.id)}
                          />
                        ) : (
                          <Checkbox
                            m={1}
                            mr={2}
                            size={"lg"}
                            borderRadius={"full"}
                            colorScheme={"green"}
                            onChange={onToggle.bind(null, todo.id)}
                            defaultChecked
                          />
                        )}
                        <Stack
                          onClick={() => onRemove(todo.id)}
                          bg={"blackAlpha.200"}
                          _dark={{bg: 'whiteAlpha.200'}}
                          borderRadius={"full"}
                        >
                          <ListIcon
                            m={2}
                            as={DeleteIcon}
                            fontSize={12}
                            color="red.500"
                          />
                        </Stack>
                      </Flex>
                    </Flex>
                  </Flex>
                </ListItem>
              </List>
            </Stack>
          );
        })}
    </>
  );
};

export default TodoList;
