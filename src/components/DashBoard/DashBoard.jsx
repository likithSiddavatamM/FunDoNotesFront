import { Outlet } from "react-router-dom";
import { Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import './DashBoard.scss';

export function DashBoard() {
    const [drawerState, setDrawerState] = useState(false);

    return (
        <>
            <span className="button-dashboard">
            <IconButton 
                edge="start" 
                aria-label="menu" 
                onClick={() => {
                    setDrawerState(!drawerState);
                }}
                className="drawerButton">
                <MenuIcon />
            </IconButton>
            <Drawer open={drawerState} onClose={() => setDrawerState(false)}>
                <div className="DrawerIcon">
                    <span style={{cursor:"default"}}>Notes</span>
                    <br/>
                    <span style={{cursor:"default"}}>Archive</span>
                </div>
            </Drawer>
            <h1>DashBoard</h1>
            </span>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "16px",
                }}>
                <Outlet/>
            </div> 
        </>
    );
}
