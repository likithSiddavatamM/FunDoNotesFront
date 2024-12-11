// import React, { useState } from "react";
// import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
// import { useLocation } from "react-router-dom";
// import { NotificationsOutlined, DeleteOutlineOutlined, ArchiveOutlined, LightbulbOutlined, ModeEditOutlined } from '@mui/icons-material';

// export default ({ drawerState, handleNavigate ,setDrawerState}) => {
//   const [hoveredItem, setHoveredItem] = useState(null);

//   const listItems = [
//     { key: "notes", text: "Notes", icon: <LightbulbOutlined style={{fontSize:"2em"}}/> },
//     { key: "reminder", text: "Reminder", icon: <NotificationsOutlined style={{fontSize:"2em"}}/> },
//     { key: "label", text: "Label", icon: <ModeEditOutlined style={{fontSize:"2em"}}/> },
//     { key: "trash", text: "Trash", icon: <DeleteOutlineOutlined style={{fontSize:"2em"}}/> },
//     { key: "archive", text: "Archive", icon: <ArchiveOutlined style={{fontSize:"2em"}}/> },
//   ];

//   return (
//     <>
//       {listItems.map((item) => (
//         <ListItem
//           key={item.key}
//           style={{
//             borderRadius: drawerState ? "0px 19px 19px 0px" : "100px",
//             width: drawerState ? "100%" : "3em",
//              backgroundColor : hoveredItem === item.key
//               ? !(useLocation().pathname === `/dashboard/${item.key}`)?"#f1f3f4":"rgb(254,239,195)"
//               : useLocation().pathname === `/dashboard/${item.key}`
//               ? "rgb(254,239,195)"
//               : "white",
//             cursor:"default",
//             paddingLeft:"10px",
//           }}
//           button
//           onClick={() => {handleNavigate(item.key); setHoveredItem(null)}}
//           onMouseEnter={() => {setDrawerState(true); setHoveredItem(item.key)}}
//           onMouseLeave={() => {setDrawerState(false); setHoveredItem(null)}}
//         >
//           <ListItemIcon 
//             style={{
//               color:hoveredItem === item.key
//               ? "black" 
//               : useLocation().pathname === `/dashboard/${item.key}` ? "black" : "gray",}}>
//                 {item.icon}
//           </ListItemIcon>
//             {drawerState && <ListItemText style={{cursor:"pointer"}} primary={item.text} />}
//         </ListItem>
//       ))}
//     </>
//   );
// };


import React, { useState } from "react";
import { ListItem, ListItemIcon, ListItemText, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from "@mui/material";
import { useLocation } from "react-router-dom";
import { NotificationsOutlined, DeleteOutlineOutlined, ArchiveOutlined, LightbulbOutlined, ModeEditOutlined, LabelOutlined, CloseOutlined, DoneOutlined } from "@mui/icons-material";

export default ({ drawerState, handleNavigate, setDrawerState }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [labelCount, setLabelCount] = useState(0);
  const [listItems, setListItems] = useState([
    { key: "notes", text: "Notes", icon: <LightbulbOutlined style={{ fontSize: "2em" }} /> },
    { key: "reminder", text: "Reminder", icon: <NotificationsOutlined style={{ fontSize: "2em" }} /> },
    { key: "label", text: "Label", icon: <ModeEditOutlined style={{ fontSize: "2em" }} /> },
    { key: "archive", text: "Archive", icon: <ArchiveOutlined style={{ fontSize: "2em" }} /> },
    { key: "trash", text: "Trash", icon: <DeleteOutlineOutlined style={{ fontSize: "2em" }} /> },
  ]);

  const location = useLocation();

  const handleDrawerItemClick = (key) => {
    if (key === "label")
      setOpenDialog(true);
    else
      handleNavigate(key);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setInputValue("");
  };
  
  const handleSave = () => {
    if (inputValue.trim()) {
      const newItem = {
        key: inputValue.toLowerCase(),
        text: inputValue,
        icon: <LabelOutlined style={{ fontSize: "2em" }} />,
      };
      setInputValue("");
      const labelIndex = listItems.findIndex((item) => item.key === "label");
      const updatedList = [
        ...listItems.slice(0, labelIndex + 1),
        newItem,
        ...listItems.slice(labelIndex + 1),
      ];
      setListItems(updatedList);
      setLabelCount(labelCount + 1);
    }
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Label</DialogTitle>
        <DialogContent style={{display:"flex", alignItems:"center"}}>
          <DialogActions>
            <IconButton sx={{height:"1.3em", width:"1.3em"}} onClick={handleCloseDialog} color="gray" aria-label="Close Dialog">
              <CloseOutlined  sx={{ fontSize: "1em" }}/>
            </IconButton>
              <TextField
                placeholder="Add new label"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                fullWidth
                autoFocus
              />
            <IconButton sx={{height:"1.3em", width:"1.3em"}} onClick={handleSave} color="gray" aria-label="Save Dialog">
              <DoneOutlined  sx={{ fontSize: "1em" }}/>
            </IconButton>
          </DialogActions>
        </DialogContent>
        {listItems.slice(listItems.findIndex((item) => item.key === "label") + 1).slice(0, labelCount)
                  .map((item) => (
                    <div
                      key={item.key}
                      style={{
                        marginBottom: "5px",
                        padding: "5px 10px",
                        border: "1px solid gray",
                        borderRadius: "4px",
                        backgroundColor: "#f0f0f0",
                      }}
                    >
                      {item.text}
                    </div>
                  ))}
      </Dialog>

      {listItems.map((item) => (
        <ListItem
          key={item.key}
          style={{
            borderRadius: drawerState ? "0px 19px 19px 0px" : "100px",
            width: drawerState ? "100%" : "3em",
            backgroundColor:
              hoveredItem === item.key
                ? !(location.pathname === `/dashboard/${item.key}`) ? "#f1f3f4" : "rgb(254,239,195)"
                : location.pathname === `/dashboard/${item.key}`
                ? "rgb(254,239,195)"
                : "white",
            cursor: "default",
            paddingLeft: "10px",
          }}
          button
          onClick={() => {
            handleDrawerItemClick(item.key);
            setHoveredItem(null);
          }}
          onMouseEnter={() => {
            setDrawerState(true);
            setHoveredItem(item.key);
          }}
          onMouseLeave={() => {
            setDrawerState(false);
            setHoveredItem(null);
          }}
        >
          <ListItemIcon
            style={{
              color: hoveredItem === item.key
                ? "black"
                : location.pathname === `/dashboard/${item.key}` ? "black" : "gray",
            }}
          >
            {item.icon}
          </ListItemIcon>
          {drawerState && <ListItemText style={{ cursor: "pointer" }} primary={item.text} />}
        </ListItem>
      ))}
    </>
  );
};