import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { State } from "../context/PassState";
import { useContext,useState } from "react";


export default function OutlinedCard({ele}) {   

  // States
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const {todolist , setTodo} = useContext(State)
    const [updatedList , setUpdatedList] = useState({title: ele.title, details: ele.subTitle})
  // Functions
      // 1
    function handleChecker(id) {
      const updatedOne = todolist.map((card) => {
        if (card.id === id) {
          return { ...card, isCompleted: !card.isCompleted };
        }
        return card;
      });
      setTodo(updatedOne);
      localStorage.setItem("newGoal", JSON.stringify(updatedOne))
    }
    // handelDelete
    function handelDelete() {
      setOpen(true)
    }
    //  handelDeleteConfirm
    function handelDeleteConfirm(id) {
      let edited = todolist.filter((ele) => ele.id !== id);
      setTodo(edited)
      handleClose()
      localStorage.setItem("newGoal", JSON.stringify(edited))
    }
    // handleClose
    const handleClose = () => {
      setOpen(false);
    };   
    // handleOpenEdit
    function handleOpenEdit() {
        setOpenEdit(true)
    }
    // handleCloseEdit
    function handleCloseEdit() {
        setOpenEdit(false)
    }
    // handelEditConfirm
    function handelEditConfirm(id) {
      const edit = todolist.map((todo)=> {
        if (todo.id === id) {
          return ({...todo, title: updatedList.title , subTitle: updatedList.details })
        } else {
          return todo
        }
      })
      setTodo(edit)
      localStorage.setItem("newGoal", JSON.stringify(edit))
      handleCloseEdit(true)
    }
    
  
    return (
      <>    
      {/* Close Modal */}
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
          <Button  autoFocus onClick={()=> handelDeleteConfirm(ele.id)}>
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
      {/*======== Close Modal======== */}

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
            value={updatedList.title}
            onChange={(e)=> setUpdatedList({...updatedList, title: e.target.value})}
          />
         <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Goal Details"
            fullWidth
            variant="outlined"
            value={updatedList.details}
            onChange={(e)=> setUpdatedList({...updatedList, details: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Close</Button>
          <Button  autoFocus onClick={()=> handelEditConfirm(ele.id)}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
      {/* === Edit Modal ====*/}
        <Card>
          <CardContent
            sx={{
              color: "#f8f8f8",
              background: "linear-gradient(145deg, #3a2f4b, #2e003e)",
              margin: "10px",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
              borderRadius: "10px",
            }}
          >
            <div className="card">
              <Grid container spacing={0} sx={{ alignItems: "center" }}>
                <Grid size={8}>
                  <Typography variant="h5" textAlign={"left"} className={ele.isCompleted ? 'line' : ''}>
                    {ele.title}
                  </Typography>
                  <Typography
                    variant="overline"
                    textAlign={"left"}
                    display="block"
                  >
                    {ele.subTitle}
                  </Typography>
                </Grid>
                <Grid size={4}>
                  {/* Check Icon Button */}
                  <IconButton onClick={() => handleChecker(ele.id)}>
                    <CheckCircleRoundedIcon
                      className="icon"
                      sx={{
                        fontSize: "40px",
                        color: ele.isCompleted ? "green" : "white",
                        borderRadius: "20px",
                      }}
                    />
                  </IconButton>
                  {/* Delete Button */}
                  <IconButton onClick={()=> handelDelete()}>
                    <DeleteSweepRoundedIcon
                      className="icon"
                      sx={{
                        fontSize: "40px",
                        color: "red",
                        borderRadius: "10px",
                      }}
                    />
                  </IconButton>
                  {/* Edit Button */}
                  <IconButton onClick={handleOpenEdit}>
                    <EditNoteRoundedIcon
                      className="icon"
                      sx={{
                        fontSize: "40px",
                        color: "yellow",
                        borderRadius: "10px",
                      }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Card>
      </>
    );
  };

