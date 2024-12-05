import { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./DashBoard.scss";
import { Drawer, IconButton, Menu, MenuItem, TextField, InputAdornment } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import downloadKeep from "../../assets/downloadKeep.png"
import DrawerContent from "../DrawerContent/DrawerContent";
import { Search, Refresh, DnsOutlined, SettingsSharp, Apps } from "@mui/icons-material";

export function DashBoard() {
  const [drawerState, setDrawerState] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const [log, setLog] = useState(null);
  const [color, setColor] = useState(null);
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

 useEffect(()=>{(() => {
  const letters = "0123456789ABCDEF";
  let bgColor = "#";
    for (let i = 0; i < 6; i++) {
      bgColor += letters[Math.floor(Math.random() * 8)];
  }
  setColor(bgColor);
  })()},[])

  return (
    <>
      <header className="button-dashboard">
        <div className="dashboard-left">
          <div className="dashboard-flex-container">
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={() => setDrawerState(!drawerState)}
              className="drawerButton"
            >
              <MenuIcon sx={{fontSize:"1.1em"}} />
            </IconButton>

            <img
            src={downloadKeep}
            alt="User Icon"
            className="user-icon"
            />

            <h1>FunDoNotes</h1>
          </div>
          <div className="search-container" ref={searchRef}>
            <TextField
              placeholder="Search..."
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-text-field"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" className="search-icon">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div className="outer-flex">
          <div className="inner-flex">
            <IconButton >
              <Refresh onClick={()=>{window.location.reload()}} style={{fontSize:"1.2em"}}/>
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
              {/* <AccountCircle style={{fontSize:"1.5em"}}/> */}
            <span style={{ width: "29px", height:"29px", background: color, color : "white", borderRadius: "25px", padding: "2px"}}>{localStorage.getItem('alphabet')}</span>
      
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
      <div className="main-container">
      <div className={`drawer-container ${drawerState ? "expanded" : "collapsed"}`}>
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
        <div className={`drawer-content-container ${drawerState ? "expanded" : ""}`}>
          <DrawerContent drawerState={drawerState} handleNavigate={handleNavigate} setDrawerState={setDrawerState} />
        </div>
      </div>
      <div className="outlet-container">
        <Outlet />
      </div>

      </div>
    </>
  );
}
