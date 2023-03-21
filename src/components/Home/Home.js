import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Grid } from "@mui/material";
import { useState } from "react";
import Map from "./Map";
import SearchField from "./SearchField";

const Home = () => {
  const [selectPosition, setSelectPosition] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <Grid
      container
      sx={{
        height: "100vh",
      }}
    >
      {/* Sidebar Search Panel */}
      {sidebarOpen && (
        <Grid
          item
          md={5}
          sm={12}
          xs={12}
          sx={{ height: { sm: "80%", md: "100%" } }}
        >
          <SearchField
            selectPosition={selectPosition}
            setSelectPosition={setSelectPosition}
            setSidebarOpen={setSidebarOpen}
          />
        </Grid>
      )}
      {/* Map Panel */}
      <Grid
        item
        md={sidebarOpen ? 7 : 12}
        sm={12}
        xs={12}
        sx={{ position: "relative" }}
      >
        {!sidebarOpen && (
          <Box
            sx={{
              position: "absolute",
              top: "100px",
              left: "10px",
              zIndex: "999",
            }}
          >
            <KeyboardArrowRightIcon
              sx={{ color: "secondary.main" }}
              onClick={() => setSidebarOpen(true)}
            />
          </Box>
        )}
        <Map selectPosition={selectPosition} setSidebarOpen={setSidebarOpen} />
      </Grid>
    </Grid>
  );
};

export default Home;
