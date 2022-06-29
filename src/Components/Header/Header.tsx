import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";

type T = {
  setQuery: any;
};
export const Header: React.FC<T> = ({ setQuery }) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <Box minW={"full"} as="section" pb={{ base: "12", md: "24" }}>
      <Box
        as="nav"
        bg="bg-surface"
        boxShadow={useColorModeValue("sm", "sm-dark")}
      >
        <Container py={{ base: "9", lg: "5" }}>
          <HStack spacing="10" justify="center">
            {isDesktop ? (
              <Flex justify="space-between" flex="1">
                <HStack spacing="3">
                  <Heading
                    variant="ghost"
                    bgGradient='linear(to-r, teal.500, green.500)'
                    bgClip="text"
                  >
                    Todos
                  </Heading>
                </HStack>
              </Flex>
            ) : (
              <></>
            )}
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Search2Icon color="gray.300" />}
              />
              <Input
                w={isDesktop ? "2xl" : "full"}
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
                type="tel"
                placeholder="Search..."
              />
            </InputGroup>
            <ColorModeSwitcher />
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};
