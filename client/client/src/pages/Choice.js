import React from "react";
<<<<<<< HEAD
import { Typography, styled } from "@mui/material";
import "../styles/Choice.css";
import Filter from "../components/Filter";

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "50px",
  color: theme.palette.primary.main,
  textAlign: "center",
  marginBottom: "16px",
}));
=======
// import { MenuList } from "../helpers/MenuList";
// import MenuItem from "../components/MenuItem";
import "../styles/Choice.css";
import Filter from "../components/Filter";
import Graphs from "./Graphs";
>>>>>>> 62b88ebe38a934635a3335cf6d8ad7c66800ea9d

function Choice() {
  return (
    <div className="choice">
<<<<<<< HEAD
      <Title variant="h1">Select from the options below:</Title>

      <p></p>
      <div className="selection">
        <Filter />
=======
      <h1 className="title">Select from the options bellow:</h1>
      <p>
        
      </p>
      <div className="selection">
        <Filter />
        {/* <Graphs /> */}
        {/* <button onClick={() => <Graphs location={location} type={type} suppliers={suppliers} />}> */}
        {/* </button> */}
>>>>>>> 62b88ebe38a934635a3335cf6d8ad7c66800ea9d
      </div>
    </div>
  );
}

export default Choice;
