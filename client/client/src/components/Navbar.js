import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReorderIcon from "@mui/icons-material/Reorder";
import "../styles/Navbar.css";
import Logo from "../assets/logo.png";

<<<<<<< HEAD
=======
// import ReorderIcon from "@material-ui/icons/Reorder";

>>>>>>> 62b88ebe38a934635a3335cf6d8ad7c66800ea9d
function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={Logo} />
        <div className="hiddenLinks">
          <Link to="/"> Home </Link>
<<<<<<< HEAD
=======
          {/* <Link to="/menu"> Menu </Link>
          <Link to="/about"> About </Link>
        //   <Link to="/contact"> Contact </Link> */}
>>>>>>> 62b88ebe38a934635a3335cf6d8ad7c66800ea9d
          <Link to="/about"> About </Link>
          <Link to="/contact"> Contact </Link>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/"> Home </Link>
        <Link to="/about"> About </Link>
        <Link to="/contact"> Contact </Link>
        <button onClick={toggleNavbar}>
          <ReorderIcon />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
