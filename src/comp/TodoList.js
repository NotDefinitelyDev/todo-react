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


import "./compStyle.css";
import * as React from "react";
import { useSnackbar } from 'notistack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Cards from "./Cards";
import { v4 as uuidv4 } from "uuid";
import { State} from "../context/PassState";
import { useState , useContext , useEffect, useMemo} from "react";


export default function ToDoSt() {
  
    // Value
      const [inputValue, setInput] = useState("");
    // List
      const {todolist, setTodo} = useContext(State);
    // Pick
      const [displayType, setdisplayType] = useState("all");
    // Dialog's Delete
      const [open, setOpen] = useState(false);
    // Dialog's Edit
      const [openEdit, setOpenEdit] = useState(false);
    // ID Handler 
      const [dialogInvade , setId ]= useState("")
    
      const { enqueueSnackbar } = useSnackbar();

 // Functions
    // Add Goal
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
       enqueueSnackbar('Goal Added!', { variant: 'success' } );
    }
    // handleClose Delete
    function handleClose() {
      setOpen(false);
    };   
    // handleOpen Delete
    function handleOpen(list) {
      setOpen(true);
      setId(list);
    };   
    // handelDeleteConfirm
    function handelDeleteConfirm() {
      let edited = todolist.filter((ele) => ele.id !== dialogInvade.id);
      setTodo(edited)
      handleClose()
      localStorage.setItem("newGoal", JSON.stringify(edited))
       enqueueSnackbar('Goal Deleted!', { variant: 'error' } );
    }
    // Edit
     function handleCloseEdit() {
        setOpenEdit(false)
    }
    // Edit
     function handleOpenEdit(list) {
        setOpenEdit(true)
        setId(list);
    }
    //  handelEditConfirm
      function handelEditConfirm() {
      const edit = todolist.map((todo)=> {
        if (todo.id === dialogInvade.id) {
          return ({...todo, title: dialogInvade.title , subTitle: dialogInvade.details })
        } else {
          return todo
        }
      })
      setTodo(edit)
      localStorage.setItem("newGoal", JSON.stringify(edit))
      handleCloseEdit(true)
      enqueueSnackbar('Goal Edited!', { variant: 'info' } );
    }

    // UseEffect
    useEffect( ()=> {
      let newList = JSON.parse(localStorage.getItem("newGoal")) ?? []
      setTodo(newList)
    }, [setTodo])
  
       // =================== Method 2 =============================== //

    let doneGoals = useMemo(()=>{
      return todolist.filter((goal)=> {
        return goal.isCompleted
      })
    },[todolist]) 

    let notDoneGoals = useMemo(()=>{
      return  todolist.filter((goal)=> {
        return !goal.isCompleted
      })
    },[todolist]) 

    let allGoals = todolist

    if(displayType === 'done') {
      allGoals = doneGoals
     } else if (displayType === 'not') {
      allGoals = notDoneGoals
    } else {
       allGoals = todolist
    }

    const eachCard = allGoals.map((oneCard)=> {
      return <Cards key={oneCard.id} ele={oneCard} showModal={handleOpen} showEditModal={handleOpenEdit}/>
    })
    
    const handleChange = (e) => {
      setdisplayType(e.target.value);
    };

  return (
    <>
    {/* Modals */}
        {/* Delete Modal */}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Are You Sure You Want To Delete The Goal 😱😱"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  If You Are Really Sure Press DELETE
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>I'm Kidding</Button>
                <Button  autoFocus onClick={()=> handelDeleteConfirm()}>
                  DELETE
                </Button>
              </DialogActions>
            </Dialog>
        {/* Delete Modal */}

        {/* Edit Modal */}
      <Dialog
        open={openEdit}
        onClose={handleOpenEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"✨✨ Edit Your Goal ✨✨"}
        </DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Goal Title"
            fullWidth
            variant="outlined"
            value={dialogInvade.title}
            onChange={(e)=> setId({...dialogInvade, title: e.target.value})}
          />
         <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Goal Details"
            fullWidth
            variant="outlined"
            value={dialogInvade.details}
            onChange={(e)=> setId({...dialogInvade, details: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Close</Button>
          <Button  autoFocus onClick={()=> handelEditConfirm()}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
      {/* === Edit Modal ====*/}
  
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
     </>
  );
}
