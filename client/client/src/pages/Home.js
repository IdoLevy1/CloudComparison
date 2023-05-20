import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import BannerImage from "../assets/cloud.jpg";

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
        <h1> Welcome to Cloud Fit </h1>
        <p> Here, we will help you find the best cloud match for your needs!</p>
        <Link to="/choice">
          <button> GET STARTED </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
