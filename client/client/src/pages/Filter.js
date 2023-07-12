import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Alert, AlertTitle } from "@mui/material";
import { Typography, styled } from "@mui/material";
import SupplierChoice from "../components/SupplierChoice";
import TypeChoice from "../components/TypeChoice";
import LocationChoice from "../components/LocationChoice";
import "../styles/Filter.css";
import BannerImage from "../assets/HomePage1.png";

const Filter = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedSupplier, setSelectedSuppliers] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedLocation && selectedType && selectedSupplier.length > 0) {
      console.log(formSubmitted);
      setFormSubmitted(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleSupplierChange = (e) => {
    const supplier = e.target.value;
    if (e.target.checked) {
      setSelectedSuppliers([...selectedSupplier, supplier]);
    } else {
      setSelectedSuppliers(selectedSupplier.filter((s) => s !== supplier));
    }
  };

  return (
    <div
      className="submitChoice"
      style={{ backgroundImage: `url(${BannerImage})` }}
    >
      <form onSubmit={handleFormSubmit}>
        <h1>Select from the options below:</h1>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={10} sm={3} className="grid-item">
            <SupplierChoice
              selectedSupplier={selectedSupplier}
              onSupplierChange={handleSupplierChange}
            />
          </Grid>
          <Grid item xs={10} sm={3} className="grid-item">
            <LocationChoice
              selectedLocation={selectedLocation}
              onLocationChange={(e) => setSelectedLocation(e.target.value)}
            />
          </Grid>
          <Grid item xs={10} sm={3} className="grid-item">
            <TypeChoice
              selectedType={selectedType}
              onTypeChange={(e) => setSelectedType(e.target.value)}
            />
          </Grid>
        </Grid>
        {error && (
          <div className="errorContainer">
            <Alert severity="error" sx={{ marginTop: "10px" }}>
              <AlertTitle>Error</AlertTitle>
              Please select from all three options
            </Alert>
          </div>
        )}
        <div className="buttonWrapper">
          {!error && formSubmitted ? (
            <Link
              to={"/Graphs"}
              state={{
                location: selectedLocation,
                type: selectedType,
                suppliers: selectedSupplier,
              }}
            >
              <button type="submit">Submit</button>
            </Link>
          ) : (
            <button type="submit">Submit</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Filter;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Button, Grid } from "@mui/material";
// import { Typography, styled } from "@mui/material";
// import SupplierChoice from "../components/SupplierChoice";
// import TypeChoice from "../components/TypeChoice";
// import LocationChoice from "../components/LocationChoice";
// import "../styles/Filter.css";

// const Filter = () => {
//   const [selectedLocation, setSelectedLocation] = useState("");
//   const [selectedType, setSelectedType] = useState("");
//   const [selectedSupplier, setSelectedSuppliers] = useState([]);
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     setFormSubmitted(true);
//   };

//   const handleSupplierChange = (e) => {
//     const supplier = e.target.value;
//     if (e.target.checked) {
//       setSelectedSuppliers([...selectedSupplier, supplier]);
//     } else {
//       setSelectedSuppliers(selectedSupplier.filter((s) => s !== supplier));
//     }
//   };
//   const Title = styled(Typography)(({ theme }) => ({
//     fontSize: "40px",
//     marginTop: "16px",
//     color: "black",
//     textAlign: "center",
//     marginBottom: "30px",
//     marginTop: "30px",
//   }));

//   return (
//     <div className="submitChoice">
//       <form onSubmit={handleFormSubmit}>
//         <Title variant="h1">Select from the options below:</Title>
//         <Grid container spacing={2} justifyContent="center" alignItems="center">
//           <Grid item xs={10} sm={3} className="grid-item">
//             <SupplierChoice
//               selectedSupplier={selectedSupplier}
//               onSupplierChange={handleSupplierChange}
//             />
//           </Grid>
//           <Grid item xs={10} sm={3} className="grid-item">
//             <LocationChoice
//               selectedLocation={selectedLocation}
//               onLocationChange={(e) => setSelectedLocation(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={10} sm={3} className="grid-item">
//             <TypeChoice
//               selectedType={selectedType}
//               onTypeChange={(e) => setSelectedType(e.target.value)}
//             />
//           </Grid>
//         </Grid>
//         <div className="buttonWrapper">
//           <Link
//             to={"/Graphs"}
//             state={{
//               location: selectedLocation,
//               type: selectedType,
//               suppliers: selectedSupplier,
//             }}
//           >
//             <button type="submit">Submit</button>
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Filter;
