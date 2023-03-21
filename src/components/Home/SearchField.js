import styled from "@emotion/styled";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import SearchIcon from "@mui/icons-material/Search";
import {
    Box,
    FormControlLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Switch,
    TextField,
    Typography
} from "@mui/material";
import { useContext, useState } from "react";
import marker from "../../assets/images/map-marker.png";
import { ColorModeContext } from "./../../theme/index";

// search url
const SEARCH_URL =
  "https://barikoi.xyz/v1/api/search/autocomplete/NDYyMzpVOFpXVVRIVkww/place?";

// styling the switch
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const SearchField = ({
  selectPosition,
  setSelectPosition,
  setSidebarOpen,
  darkMode,
  setDarkMode,
}) => {
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState();
  const colorMode = useContext(ColorModeContext);
  return (
    <div>
      <Box>
        <Box sx={{ padding: "20px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontSize: "24px",
                  color: "secondary.main",
                  marginBottom: "20px",
                  fontWeight: "700",
                }}
              >
                Bari
              </Typography>
              <Typography
                sx={{
                  fontSize: "24px",
                  color: "primary.main",
                  marginBottom: "20px",
                  fontWeight: "700",
                }}
              >
                koi
              </Typography>
            </Box>
            <Typography>
              <FormControlLabel
                control={
                  <IOSSwitch
                    sx={{ m: 1 }}
                    onClick={colorMode.toggleColorMode}
                  />
                }
              />
              <KeyboardArrowLeftIcon onClick={() => setSidebarOpen(false)} />
            </Typography>
          </Box>
          <Box
            sx={{
              padding: " 0.8rem 0.6rem 0.8rem 1rem",
              boxShadow: "3px 4px 10px -4px rgba(0,0,0,.25)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              sx={{
                border: "none",
                fontSize: "1.2rem",
                width: "400px",
                "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
                  fontSize: "1.2rem",
                },
                "& .css-z0mwlv-MuiInputBase-root-MuiInput-root:after": {
                  border: "none",
                },
                "& .css-z0mwlv-MuiInputBase-root-MuiInput-root:before": {
                  border: "none",
                },
                "& .css-z0mwlv-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before":
                  {
                    border: "none",
                  },
                "& .css-kgkwc8::after": {
                  border: "none",
                },
                "& .css-kgkwc8::before": {
                  border: "none",
                },
                "& .css-kgkwc8:hover:not(.Mui-disabled, .Mui-error)::before": {
                  border: "none",
                },
              }}
              id="standard-basic"
              variant="standard"
              placeholder="Search Location"
              onChange={(event) => {
                setSelectedProperty(null);
                setSearchText(event.target.value);
                const requestOptions = {
                  method: "GET",
                  redirect: "follow",
                };
                fetch(
                  `${SEARCH_URL}q=${event.target.value}&city=dhaka`,
                  requestOptions
                )
                  .then((response) => response.text())
                  .then((result) => {
                    console.log(JSON.parse(result));
                    setListPlace(JSON.parse(result)?.places || []);
                  })
                  .catch((err) => console.log(err));
              }}
            />
            <Box
              sx={{
                backgroundColor: "primary.main",
                borderRadius: "5px",
                width: "50px",
                paddingY: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={(event) => {
                setSelectedProperty(null);
                const requestOptions = {
                  method: "GET",
                  redirect: "follow",
                };
                fetch(`${SEARCH_URL}q=${searchText}&city=dhaka`, requestOptions)
                  .then((response) => response.text())
                  .then((result) => {
                    console.log(JSON.parse(result));
                    setListPlace(JSON.parse(result)?.places || []);
                  })
                  .catch((err) => console.log(err));
              }}
            >
              <SearchIcon sx={{ color: "white", fontSize: "14px" }} />
            </Box>
          </Box>
        </Box>
        {/* Address List */}
        {!selectedProperty && (
          <List sx={{ padding: "20px" }}>
            {listPlace.map((item) => (
              <ListItem
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",

                  marginBottom: "20px",
                }}
                onClick={() => {
                  setSelectPosition(item);
                  setSelectedProperty(item);
                }}
              >
                <ListItemIcon>
                  <img src={marker} alt="" style={{ width: 38, height: 38 }} />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    marginBottom: "10px",
                    fontSize: "16px",
                    wordWrap: "break-word",
                  }}
                >
                  {item.address}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        )}
        {/* Address and Place Type property */}
        {selectedProperty && (
          <Box
            sx={{ paddingX: "20px", paddingLeft: "50px", paddingRight: "20px" }}
          >
            <Typography
              sx={{
                fontSize: "22px",
                marginBottom: "10px",
              }}
            >
              {selectedProperty.address}
            </Typography>
            <Typography
              sx={{
                backgroundColor: "secondary.main",
                color: "#ffffff",
                width: "max-content",
                paddingY: "5px",
                paddingX: "8px",
                borderRadius: "5px",
                marginBottom: "20px",
              }}
            >
              {selectedProperty.pType}
            </Typography>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default SearchField;
