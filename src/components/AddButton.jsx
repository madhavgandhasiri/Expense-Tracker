import React from "react";
import styles from "./AddButton.module.css"

function AddButton({text}){
  return (
    <div>
      <button className={styles.addBtn}>{text}</button>
    </div>
  )
}

export default AddButton;