import React, { useState } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LabelIcon from "@mui/icons-material/Label";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";

export default ({ drawerState, handleNavigate ,setDrawerState}) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const listItems = [
    { key: "notes", text: "Notes", icon: <NotesIcon /> },
    { key: "reminder", text: "Reminder", icon: <NotificationsIcon /> },
    { key: "label", text: "Label", icon: <LabelIcon /> },
    { key: "trash", text: "Trash", icon: <DeleteIcon /> },
    { key: "archive", text: "Archive", icon: <ArchiveIcon /> },
  ];

  return (
    <>
      {listItems.map((item) => (
        <ListItem
          key={item.key}
          style={{
            borderRadius: drawerState ? "0px 19px 19px 0px" : "100px",
            width: drawerState ? "100%" : "3em",
            backgroundColor: hoveredItem === item.key ? "#f0f0f0" : "white",
            transition: "background-color 0.3s ease",
            cursor:"default",

          }}
          button
          onClick={() => handleNavigate(item.key)}
          onMouseEnter={() => {setDrawerState(true); setHoveredItem(item.key)}}
          onMouseLeave={() => {setDrawerState(false); setHoveredItem(null)}}
        >
          <ListItemIcon style={{color:hoveredItem === item.key?"#1f5a4fd4":"gray"}}>{item.icon}</ListItemIcon>
          {drawerState && <ListItemText style={{cursor:"default"}} primary={item.text} />}
        </ListItem>
      ))}
    </>
  );
};

