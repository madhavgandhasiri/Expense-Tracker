import React, { useState } from "react";
import styles from "./Button.module.css";
import DialogBox from "./DialogBox";

function  Button({ text, color }) {
  const [showDialog, setShowDialog] = useState(false);

  function handleClick(){
    setShowDialog(true);
  }

  function handleClose() {
    setShowDialog(false);
  }

  return (
    <div>
      <button
        style={{
          backgroundColor: color,
          height: "2.5rem",
          width: "8rem",
          borderRadius: "0.7rem",
          cursor:"pointer",
          borderStyle: "none",
          color:"white",
          fontSize: "1rem"
          
        }}
        onClick={handleClick}
      >
        {text}
      </button>
      {showDialog && <DialogBox onClose={handleClose} />}
    </div>
  );
}

export default Button;
