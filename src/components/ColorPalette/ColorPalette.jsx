import React from "react";
import "./ColorPalette.scss";

const colors = [
  "FFFFFF", "faafa8", "f39f76", "fff8b8", 
  "e2f6d3", "b4ddd3", "d4e4ed", "aeccdc", 
  "d3bfdb", "f6e2dd", "e9e3d4", "efeff1"
];

const ColorPalette = ({handlePalatteColor, handleCloseColorPalette}) => {

  return (
    <span className="container" >
      {colors.map((color, index) => (
        <span 
          key={index} 
          className={`note note--${color}`}
          onClick={()=>{console.log("colorpalatte is in"); handlePalatteColor(color);}}
        >
        </span>
      ))}
    </span>
  );
};

export default ColorPalette;
