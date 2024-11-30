import { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./DashBoard.scss";
import { Drawer, IconButton, Menu, MenuItem, TextField, InputAdornment } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import downloadKeep from "../../assets/downloadKeep.png"
import DrawerContent from "../DrawerContent/DrawerContent";
import { AccountCircle, Search, Refresh, DnsOutlined, SettingsSharp, Apps } from "@mui/icons-material";

export function DashBoard() {
  const [drawerState, setDrawerState] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const [log, setLog] = useState(null);

  const handleMenu = (event) => {
    setLog(event.currentTarget);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setDrawerState(false);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchQuery("");
    }
  };

  const handleClose = (logout) => {
    if(logout=="logout"){
      localStorage.removeItem("accessToken");
      navigate("/")
    }
    setLog(null);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <>
      <header className="button-dashboard">
        <div style={{ display: "flex", justifyContent: "space-between", gap: "2em", paddingTop: "5px", width:"50%"}}>
          <div style={{ display: "flex",}}>
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={() => setDrawerState(!drawerState)}
              className="drawerButton"
            >
              <MenuIcon sx={{fontSize:"1.5em"}} />
            </IconButton>

            <img
              src={downloadKeep}
              alt="User Icon"
              style={{ padding: "10px", width: "2em", height: "3em" }}
            />
            <h1>FunDoNotes</h1>
            </div>
            <div
              style={{padding: "7px", width: "43em" }}
              ref={searchRef}
            >
              <TextField
                placeholder="Search..."
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    background: "#f1f3f4",
                    border:"none",
                    fontSize:"1.3em"
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{fontSize:"1.3em"}} />
                    </InputAdornment>
                  ),
                }}
              />
          </div>
          

        </div>
        <div style={{display:"flex",}}>
          <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
              <IconButton >
              <Refresh style={{fontSize:"1.2em"}}/>
              </IconButton>
              <IconButton >
              <DnsOutlined style={{fontSize:"1.1em"}}/>
              </IconButton>  
              <IconButton >
              <SettingsSharp style={{fontSize:"1.1em"}}/>
              </IconButton>      
              <IconButton >
              <Apps style={{fontSize:"1.1em"}}/>
              </IconButton>       
               <IconButton
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle style={{fontSize:"1.5em"}}/>
              </IconButton>
              <Menu
                id="menu-appbar"
                log={log}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(log)}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    marginTop: '4em',
                    marginLeft:"10px"
                  },
                }}
              >
                <MenuItem onClick={() => handleClose("logout")}>Logout</MenuItem>
              </Menu>
            </div>
          </div>
      </header>

      <div style={{ display: "flex", height: "100%", position: "relative", top: "5.5em" }}>
      <div style={{width:drawerState?"20%":"4em",}}>
        <Drawer
          variant="persistent"
          open={drawerState}
          PaperProps={{
            style: {
              width: drawerState ? "250px" : "90px",
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
