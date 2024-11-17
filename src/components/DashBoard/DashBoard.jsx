import { Outlet } from "react-router-dom";
import { Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import './DashBoard.scss';
import TakeNote from "../TakeNote/TakeNote";

export function DashBoard() {
    const [drawerState, setDrawerState] = useState(false);

    return (
        <>
            <span className="button-dashboard-takenote">
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
                        <span>Notes</span><br />
                        <span>Archive</span>
                    </div>
                </Drawer>
                <h1 className="dashboardText">DashBoard</h1>
                </span>
                <span>
                    <TakeNote className="bbbb"/>
                </span>
            </span>
            <div
            style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
            }}
            >
            <Outlet />
            </div> 
        </>
    );
}
