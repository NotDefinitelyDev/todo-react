import "./App.css";
import { SnackbarProvider } from "notistack";
import TodoList from "./comp/TodoList";
import { ReduceProvider } from "./context/reduceContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

// The App
function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={1} autoHideDuration={3000}>
        <div className="App">
          <header className="App-header">
            <ReduceProvider>
              <TodoList />
            </ReduceProvider>
          </header>
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
