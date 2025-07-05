import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import { useReduce } from "../context/reduceContext";
import { useSnackbar } from "notistack";

export default function OutlinedCard({ ele, showModal, showEditModal }) {
  // States
  const { todolist, dispatch } = useReduce();
  const { enqueueSnackbar } = useSnackbar();
  // Functions
  function handleChecker(id) {
    dispatch({ type: "checked", payload: id });
    enqueueSnackbar("Mission Accomplished!", { variant: "success" });
  }

  return (
    <>
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
                <Typography
                  variant="h5"
                  textAlign={"left"}
                  className={ele.isCompleted ? "line" : ""}
                >
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
                <IconButton onClick={() => showModal(ele)}>
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
                <IconButton onClick={() => showEditModal(ele)}>
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
}
