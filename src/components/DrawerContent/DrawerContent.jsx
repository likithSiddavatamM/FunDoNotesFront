import React, { useState } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

export default ({ drawerState, handleNavigate ,setDrawerState}) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const listItems = [
    { key: "notes", text: "Notes", icon: <LightbulbOutlinedIcon style={{fontSize:"2em"}}/> },
    { key: "reminder", text: "Reminder", icon: <NotificationsOutlinedIcon style={{fontSize:"2em"}}/> },
    { key: "label", text: "Label", icon: <ModeEditOutlinedIcon style={{fontSize:"2em"}}/> },
    { key: "trash", text: "Trash", icon: <DeleteOutlineOutlinedIcon style={{fontSize:"2em"}}/> },
    { key: "archive", text: "Archive", icon: <ArchiveOutlinedIcon style={{fontSize:"2em"}}/> },
  ];

  return (
    <>
      {listItems.map((item) => (
        <ListItem
          key={item.key}
          style={{
            borderRadius: drawerState ? "0px 19px 19px 0px" : "100px",
            width: drawerState ? "100%" : "3em",
            backgroundColor: hoveredItem === item.key ? "rgb(254,239,195)" : "white",
            transition: "background-color 0.3s ease",
            cursor:"default",
            paddingLeft:"10px"

          }}
          button
          onClick={() => handleNavigate(item.key)}
          onMouseEnter={() => {setDrawerState(true); setHoveredItem(item.key)}}
          onMouseLeave={() => {setDrawerState(false); setHoveredItem(null)}}
        >
          <ListItemIcon style={{color:hoveredItem === item.key?"black":"gray",}}>{item.icon}</ListItemIcon>
          {drawerState && <ListItemText style={{cursor:"pointer"}} primary={item.text} />}
        </ListItem>
      ))}
    </>
  );
};

