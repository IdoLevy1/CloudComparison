import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import BannerImage from "../assets/cloud.jpg";

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
        <h1> Cloud comparison </h1>
        <p> Check your cloud bla bla</p>
        <Link to="/choice">
          <button> GET STARTED </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
