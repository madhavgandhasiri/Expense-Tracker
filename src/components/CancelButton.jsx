import React from "react";
import styles from "./CancelButton.module.css"

function CancelButton ({text, onClose}){
  return (
    <div>
      <button onClick={onClose} className={styles.cancelBtn}>{text}</button>
    </div>
  )
}

export default CancelButton;