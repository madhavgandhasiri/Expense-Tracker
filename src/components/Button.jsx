import React, { useState } from "react";
import DialogBox from "./DialogBox";

function Button({ text, color, dialog, expenses, setExpenses, setBalance, setExpenseMoney, balance }) {
  const [showDialog, setShowDialog] = useState(false);

  function handleClick() {
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
          cursor: "pointer",
          borderStyle: "none",
          color: "white",
          fontSize: "1rem",
        }}
        onClick={handleClick}
      >
        {text}
      </button>
      {showDialog && (
        <DialogBox
          onClose={handleClose}
          dialog={dialog}
          setExpenses={setExpenses}
          setBalance={setBalance}
          expenses = {expenses}
          setExpenseMoney = {setExpenseMoney}
          balance = {balance}
        />
      )}
    </div>
  );
}

export default Button;
