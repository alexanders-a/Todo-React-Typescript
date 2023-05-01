import React, { ChangeEvent, FormEvent, memo, useRef, useState } from "react";
import {
  Stack,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Text,
  Container,
  Flex,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

interface T {
  onAdd(title: string): void;
}

export const TodoAdd: React.FC<T> = memo((props) => {
  const [text, setText] = useState<string>("");
  const [state, setState] = useState<"initial" | "submitting" | "success">(
    "initial"
  );
  const [error, setError] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Flex m={2} mb={4} align={"center"} justify={"center"}>
      <Container
        maxW={"3xl"}
        bg={useColorModeValue("white", "whiteAlpha.100")}
        boxShadow={"base"}
        rounded={"lg"}
        p={6}
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          as={"form"}
          spacing={"12px"}
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            if (text.length < 2) {
              setTimeout(() => {
                setError(true);
                setState("initial");
                return;
              }, 100);
            } else {
              setState("submitting");
              setTimeout(() => {
                props.onAdd(ref.current!.value);
                ref.current!.value = "";
                setState("success");
              }, 1000);
            }
          }}
        >
          <FormControl>
            <InputGroup>
              {state === "success" && (
                <InputRightElement
                  children={
                    <CloseIcon
                      onClick={() => {
                        setState("initial");
                        setText("");
                      }}
                      color="gray.500"
                      _hover={{ color: "red.400" }}
                    />
                  }
                />
              )}
              <Input
                variant={"solid"}
                borderWidth={1}
                fontWeight={500}
                _placeholder={{
                  color: "gray.400",
                }}
                ref={ref}
                borderColor={useColorModeValue("gray.300", "gray.700")}
                id={"text"}
                type={"text"}
                required
                placeholder={"Your todo"}
                aria-label={"Your todo"}
                value={text}
                disabled={state !== "initial"}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setText(e.target.value)
                }
                maxLength={50}
                minLength={1}
              />
            </InputGroup>
          </FormControl>
          <FormControl w={{ base: "100%", md: "40%" }}>
            <Button
              colorScheme={state === "success" ? "green" : "blue"}
              isLoading={state === "submitting"}
              w="100%"
              type={state === "success" ? "button" : "submit"}
              onClick={() => {
                if (state === "success") {
                  setState("initial");
                  setText("");
                  return;
                }
              }}
            >
              {state === "success" ? <CheckIcon /> : "Submit"}
            </Button>
          </FormControl>
        </Stack>
        <Text
          mt={2}
          textAlign={"center"}
          color={error ? "red.500" : "gray.500"}
        >
          {error
            ? "Oh no, there's been a mistake! 😢 Please, the text must have at least more than one character"
            : "The maximum number of characters is 50 ✌️"}
        </Text>
      </Container>
    </Flex>
  );
});
