import { Outlet } from "react-router-dom";
import { Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import FunDoNotesIcon from '../../assets/3429149.png'
import './DashBoard.scss';

export function DashBoard() {
    const [drawerState, setDrawerState] = useState(false);

    return (
        <>
            <span className="button-dashboard">
                <span style={{   display:"flex", justifyContent: "space-evenly", gap:"10px" }}>
                    <IconButton 
                        edge="end" 
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
                    <img src={FunDoNotesIcon} alt="User Icon" style={{padding:"10px", width: '3em', height: '3em' }} />
                    <h1>FunDoNotes</h1> 
                </span>
            </span>
            <div
                style={{
                    width: "98%",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "16px",
                    position:"relative",
                    top:"3em",
                    paddingLeft:"2%",
                }}>
                <Outlet/>
            </div> 
        </>
    );
}
