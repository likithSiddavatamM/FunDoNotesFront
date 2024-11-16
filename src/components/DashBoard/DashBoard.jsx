import { Outlet } from "react-router-dom"
import Drawer from '@mui/material/Drawer';
import { useState } from "react";

export function DashBoard(){
    const [drawerState, setDrawerState] = useState(false)
    return(
        <>
        <h1>DashBoard</h1>
        <Drawer open={drawerState} onClose={() => setDrawerState(false)}>
        <span>Notes</span><br />
        <span>archive</span>
        </Drawer>
        <Outlet/>
        </>
    )
}