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
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        mollitia, molestiae quas vel sint commodi repudiandae consequuntur
        voluptatum laborum numquam blanditiis harum quisquam eius sed odit
        fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
        accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
        molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
        officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum
        nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque
        error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis
        modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias
        error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt
        dolorem! Officiis iure rerum voluptates a cumque velit
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
