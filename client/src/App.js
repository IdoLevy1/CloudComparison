import "./App.css";
import CPU from "./CPU";
import Network from "./Network";
import Memory from "./Memory";
import SupplierChoice from "./SupplierChoice";
import LocationChoice from "./LocationChoice";
import TypeChoice from "./TypeChoice";

function App() {
  return (
    <div className="App">
      <h1>Cloud Comparison</h1>
      <div className="radio">
        <div
          className="choice"
          // class="custom-select"
          style={{
            width: "400px",
          }}
        >
          <SupplierChoice />
        </div>
        <div
          className="choice"
          // class="custom-select"
          style={{
            width: "400px",
          }}
        >
          <LocationChoice />
        </div>
        <div
          className="choice"
          // class="custom-select"
          style={{
            width: "400px",
          }}
        >
          <TypeChoice />
        </div>
      </div>
    </div>
  );
}

export default App;
