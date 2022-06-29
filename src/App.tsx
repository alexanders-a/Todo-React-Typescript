import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import TodoPage from "./Pages/TodoPage";

const App: React.FunctionComponent = () => {
  const [query, setQuery] = React.useState<string>("");

  return (
    <>
      <Header setQuery={setQuery} />
      <Routes>
        <Route index element={<TodoPage query={query} />} />
      </Routes>
    </>
  );
};
export default App;
