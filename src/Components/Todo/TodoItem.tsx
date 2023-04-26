import React from "react";
import {
  Flex,
  ListIcon,
  ListItem,
  Checkbox,
  Text,
  Stack,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import Moment from "react-moment";

type T = {
  todo: any;
  onToggle(id: number): void;
  onRemove: (id: number) => void;
  isDesktop: any;
};

const ListItems: React.FC<T> = ({ onToggle, onRemove, isDesktop, todo }) => {
  return (
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
              _dark={{ bg: "whiteAlpha.200" }}
              borderRadius={"full"}
            >
              <ListIcon m={2} as={DeleteIcon} fontSize={12} color="red.500" />
            </Stack>
          </Flex>
        </Flex>
      </Flex>
    </ListItem>
  );
};

export default ListItems;
