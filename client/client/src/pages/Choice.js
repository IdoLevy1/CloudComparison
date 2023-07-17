import React from "react";
import { Typography, styled } from "@mui/material";
import "../styles/Choice.css";
import Filter from "../components/Filter";

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "50px",
  color: theme.palette.primary.main,
  textAlign: "center",
  marginBottom: "16px",
}));
// import { MenuList } from "../helpers/MenuList";
// import MenuItem from "../components/MenuItem";
import "../styles/Choice.css";
import Filter from "../components/Filter";
import Graphs from "./Graphs";

function Choice() {
  return (
    <div className="choice">
      <Title variant="h1">Select from the options below:</Title>

      <p></p>
      <div className="selection">
        <Filter />
      <h1 className="title">Select from the options bellow:</h1>
      <p>
        
      </p>
      <div className="selection">
        <Filter />
        {/* <Graphs /> */}
        {/* <button onClick={() => <Graphs location={location} type={type} suppliers={suppliers} />}> */}
        {/* </button> */}
      </div>
    </div>
  );
}

export default Choice;
