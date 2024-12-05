import React, { useState } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useLocation } from "react-router-dom";
import { NotificationsOutlined, DeleteOutlineOutlined, ArchiveOutlined, LightbulbOutlined, ModeEditOutlined } from '@mui/icons-material';

export default ({ drawerState, handleNavigate ,setDrawerState}) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const listItems = [
    { key: "notes", text: "Notes", icon: <LightbulbOutlined style={{fontSize:"2em"}}/> },
    { key: "reminder", text: "Reminder", icon: <NotificationsOutlined style={{fontSize:"2em"}}/> },
    { key: "label", text: "Label", icon: <ModeEditOutlined style={{fontSize:"2em"}}/> },
    { key: "trash", text: "Trash", icon: <DeleteOutlineOutlined style={{fontSize:"2em"}}/> },
    { key: "archive", text: "Archive", icon: <ArchiveOutlined style={{fontSize:"2em"}}/> },
  ];

  return (
    <>
      {listItems.map((item) => (
        <ListItem
          key={item.key}
          style={{
            borderRadius: drawerState ? "0px 19px 19px 0px" : "100px",
            width: drawerState ? "100%" : "3em",
             backgroundColor : hoveredItem === item.key
              ? !(useLocation().pathname === `/dashboard/${item.key}`)?"#f1f3f4":"rgb(254,239,195)"
              : useLocation().pathname === `/dashboard/${item.key}`
              ? "rgb(254,239,195)"
              : "white",
            cursor:"default",
            paddingLeft:"10px",
          }}
          button
          onClick={() => {handleNavigate(item.key); setHoveredItem(null)}}
          onMouseEnter={() => {setDrawerState(true); setHoveredItem(item.key)}}
          onMouseLeave={() => {setDrawerState(false); setHoveredItem(null)}}
        >
          <ListItemIcon 
            style={{
              color:hoveredItem === item.key
              ? "black" 
              : useLocation().pathname === `/dashboard/${item.key}` ? "black" : "gray",}}>
                {item.icon}
          </ListItemIcon>
            {drawerState && <ListItemText style={{cursor:"pointer"}} primary={item.text} />}
        </ListItem>
      ))}
    </>
  );
};

