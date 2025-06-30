import "./App.css";
import { SnackbarProvider, useSnackbar } from 'notistack';
import TodoList from "./comp/TodoList";
import { State } from "./context/PassState.js";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";

// Theme

const theme = createTheme({
  typography: {
    fontFamily: "PT Sans, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "Merriweather, serif",
        },
      },
    },
  },
});

// Variables

const todo = [
  {
    id: uuidv4(),
    title: "React",
    subTitle: "Nothing left",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "JS",
    subTitle: "Fast Revision",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "HTML & CSS",
    subTitle: "Doneee",
    isCompleted: false,
  },
];

// The App

function App() {
  const [todolist, setTodo] = useState(todo);
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={1} autoHideDuration={3000} >
      <div className="App">
        <header className="App-header">
          <State.Provider value={{ todolist, setTodo }}>
            <TodoList />
          </State.Provider>
        </header>
      </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
