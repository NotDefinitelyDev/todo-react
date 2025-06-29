import "./compStyle.css";
import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState , useContext , useEffect} from "react";
import Cards from "./Cards";
import { v4 as uuidv4 } from "uuid";
import { State} from "../context/PassState";


export default function ToDoSt() {
  
    // Value
      const [inputValue, setInput] = useState("");
    // List
      const {todolist, setTodo} = useContext(State);
    // Pick
      const [displayType, setdisplayType] = useState("all");
 // Functions
    function handleTodo() {
      let newTodo = {
        id: uuidv4(),
        title: inputValue,
        subTitle: "",
        isCompleted: false,
      };
      let newOne = [...todolist, newTodo]
      setTodo(newOne);
      localStorage.setItem("newGoal" , JSON.stringify(newOne))
      setInput("");
    }
                        // =================== Method 1 =============================== //
    // Complete Only
    // function showDone() {
    //   const storedGoals = JSON.parse(localStorage.getItem("newGoal")) || [];
    //   const completedGoals = storedGoals.filter(goal => goal.isCompleted === true);
    //   setTodo(completedGoals);
    // }
    // //
    // function showAll() {
    //   const storedGoals = JSON.parse(localStorage.getItem("newGoal")) || [];
    //   setTodo(storedGoals);
    // }
    // //
    // function showNot() {
    //   const storedGoals = JSON.parse(localStorage.getItem("newGoal")) || [];
    //   const notCompletedGoals = storedGoals.filter(goal => goal.isCompleted === false);
    //   setTodo(notCompletedGoals);
    // }


    // UseEffect
    useEffect( ()=> {
      let newList = JSON.parse(localStorage.getItem("newGoal")) ?? []
      setTodo(newList)
    }, [setTodo])
  
                        // =================== Method 2 =============================== //

    let doneGoals = todolist.filter((goal)=> {
      return goal.isCompleted
    })

    let notDoneGoals = todolist.filter((goal)=> {
      return !goal.isCompleted
    })

    let allGoals = todolist

    if(displayType === 'done') {
      allGoals = doneGoals
     } else if (displayType === 'not') {
      allGoals = notDoneGoals
    } else {
       allGoals = todolist
    }

    const eachCard = allGoals.map((oneCard)=> {
      return <Cards key={oneCard.id} ele={oneCard}/>
    })
    
    const handleChange = (e) => {
      setdisplayType(e.target.value);
    };

  return (
    <div className="todo">
      <Typography variant="h1" fontWeight={700}>
        Goals
      </Typography>
      {/* Toggle Btns */}
      <ToggleButtonGroup
        variant="contained"
        color="primary"
        value={displayType}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{ marginBottom: 3 }}
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="not">Not Yet</ToggleButton>
        <ToggleButton value="done" >Done</ToggleButton>
      </ToggleButtonGroup>
      {/* // Toggle Btns //*/}

      {/* Cards List */}
      {eachCard}
      {/* Add Goal Btn */}

      <Grid container spacing={1} padding="10px">
        <Grid size={8}>
          <TextField
            id="outlined-basic"
            label="Goal"
            variant="outlined"
            fullWidth
            color="rgb(92, 40, 172)"
            value={inputValue}
            onChange={(e) => setInput(e.target.value)}
          />
        </Grid>
        <Grid size={4}>
          <Button
            className="btn"
            variant="contained"
            fullWidth
            sx={{ height: "100%", backgroundColor: " #3a2f4b" }}
            onClick={handleTodo}
            disabled={inputValue === ""}
          >
            Add Goal
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
