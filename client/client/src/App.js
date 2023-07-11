import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Filter from "./pages/Filter";
import Graphs from "./pages/Graphs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import InsertToDB from "./components/InsertToDB";

function App() {
  return (
    <div className="App">
      {/* <h1>HI</h1> */}
      <div className="content">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/filter" element={<Filter />} exact />
            <Route path="/graphs" element={<Graphs />} exact />
            <Route path="/about" element={<About />} exact />
            <Route path="/contact" element={<Contact />} exact />
          </Routes>
        </Router>
      </div>

      <Footer />
    </div>
  );
}

export default App;
