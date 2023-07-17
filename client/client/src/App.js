import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
<<<<<<< HEAD
import Filter from "./pages/Filter";
import Graphs from "./pages/Graphs";
import About from "./pages/About";
import Contact from "./pages/Contact";
=======
import Choice from "./pages/Choice";
import Graphs from "./pages/Graphs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import InsertToDB from "./components/InsertToDB";
>>>>>>> 62b88ebe38a934635a3335cf6d8ad7c66800ea9d

function App() {
  return (
    <div className="App">
      {/* <h1>HI</h1> */}
      <div className="content">
        <Router>
          <Navbar />
          <Routes>
<<<<<<< HEAD
            <Route path="/" element={<Home />} />
            <Route path="/filter" element={<Filter />} />
            <Route path="/graphs" element={<Graphs />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      </div>
=======
            <Route path="/" element={<Home />} exact />
            <Route path="/choice" element={<Choice />} exact />
            <Route path="/graphs" element={<Graphs />} exact />
            <Route path="/about" element={<About />} exact />
            <Route path="/contact" element={<Contact />} exact />
          </Routes>
        </Router>
      </div>

>>>>>>> 62b88ebe38a934635a3335cf6d8ad7c66800ea9d
      <Footer />
    </div>
  );
}

export default App;
