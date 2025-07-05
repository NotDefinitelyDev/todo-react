import { createContext, useContext, useReducer } from "react";
import reduceFunction from "../Reduce/todoReducder";

const ReduceContext = createContext([]);

export const ReduceProvider = ({ children }) => {
  const [todolist, dispatch] = useReducer(reduceFunction, []);
  return (
    <ReduceContext.Provider value={{ todolist, dispatch }}>
      {children}
    </ReduceContext.Provider>
  );
};

export const useReduce = () => {
  return useContext(ReduceContext);
};
