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

function Choice() {
  return (
    <div className="choice">
      <Title variant="h1">Select from the options below:</Title>

      <p></p>
      <div className="selection">
        <Filter />
      </div>
    </div>
  );
}

export default Choice;
