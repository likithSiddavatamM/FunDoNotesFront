import { Outlet, useNavigate } from "react-router-dom";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useRef, useEffect } from "react";
import FunDoNotesIcon from "../../assets/3429149.png";
import "./DashBoard.scss";
import DrawerContent from "../DrawerContent/DrawerContent";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

export function DashBoard() {
  const [drawerState, setDrawerState] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setDrawerState(false);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchQuery(""); // Clear the search text
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <>
      <span className="button-dashboard">
        <span style={{ display: "flex", justifyContent: "space-evenly", gap: "10px" }}>
          <IconButton
            edge="end"
            aria-label="menu"
            onClick={() => setDrawerState(!drawerState)}
            className="drawerButton"
          >
            <MenuIcon />
          </IconButton>

          <img src={FunDoNotesIcon} alt="User Icon" style={{ padding: "10px", width: "3em", height: "3em" }} />
          <h1>FunDoNotes</h1>
          <div style={{ marginLeft:"23em", padding: "7px", width: "30em" }} ref={searchRef}>
            <TextField
              placeholder="Search..."
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                  background:"rgb(0 0 12 / 7%)",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search/>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </span>
      </span>

      <div style={{ display: "flex", height: "100%", position: "relative", top: "4em" }}>
      <div style={{width:drawerState?"20%":"4em",}}>
        <Drawer
          variant="persistent"
          open={drawerState}
          PaperProps={{
            style: {
              width: drawerState ? "250px" : "50px",
              position: "relative",
              height: "100%",
              border: "none",
            },
          }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerState ? "250px" : "50px",
              height: "100%",
              zIndex: 0,
            },
          }}
          >
        </Drawer>
        <div style={{position:"fixed", width:drawerState&&"13%"}}>
        <DrawerContent drawerState={drawerState} handleNavigate={handleNavigate} setDrawerState={setDrawerState} />
        </div>
      </div>
        <div
          style={{
            width: "100%",
            transition: "margin-left 0.3s ease",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}
