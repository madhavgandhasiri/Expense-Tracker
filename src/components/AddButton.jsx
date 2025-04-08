import React from "react";
import styles from "./AddButton.module.css"

function AddButton({text, onClick}){
  return (
    <div>
      <button type="submit" className={styles.addBtn} onClick={onClick}>{text}</button>
    </div>
  )
}

export default AddButton;