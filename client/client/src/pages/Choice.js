import React from "react";
// import { MenuList } from "../helpers/MenuList";
// import MenuItem from "../components/MenuItem";
 import "../styles/Choice.css";
 import Filter from "../components/Filter";
import Graphs from "./Graphs";

function Choice() {
  return (
    <div className="choice">
      <h1 className="title">Select from the options bellow:</h1>
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
