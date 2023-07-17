import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
<<<<<<< HEAD
import BannerImage from "../assets/background.png";
=======
import BannerImage from "../assets/cloud.jpg";
>>>>>>> 62b88ebe38a934635a3335cf6d8ad7c66800ea9d

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
        <h1> Welcome to Cloud Fit </h1>
        <p> Here, you will find your best cloud match!</p>
<<<<<<< HEAD
        <Link to="/filter">
=======
        <Link to="/choice">
>>>>>>> 62b88ebe38a934635a3335cf6d8ad7c66800ea9d
          <button> GET STARTED </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
