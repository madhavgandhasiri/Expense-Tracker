import React from "react";
import styles from "./DialogBox.module.css";
import CancelButton from "./CancelButton";
import AddButton from "./AddButton";

function DialogBox({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <div className={styles.dialogTitle}>
         <h2>Add Expenses</h2>
        </div>
        <div className={styles.dialogInput}>
          <div className={styles.firstInputDiv}>
          <input type="text" placeholder="Title" className={styles.input}/>
          <input type="text" placeholder="Price" className={styles.input}/>
          </div>
          <div className={styles.secondInputDiv}>
          <input type="text" placeholder="Select Category" className={styles.input}/>
          <input type="text" placeholder="dd/mm/yyyy" className={styles.input}/>
          </div>
        </div>
        <div className={styles.btnDiv}>
        <AddButton text="Add Expense"/>
        <CancelButton onClose={onClose} text="Cancel"/>
        </div>
      </div>
    </div>
  );
}

export default DialogBox;
