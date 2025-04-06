import React from "react";
import styles from "./ExpenseTracker.module.css";
import Button from "./Button";

function ExpenseTracker() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Expense Tracker</h1>
      </div>
      <div className={styles.upper}>
        <div className={styles.wallet}>
          <p>Wallet Balance: 4500</p>
          <Button text="+ Add Income" color="#89E148"/>
        </div>
        <div className={styles.expenses}>
          <p>Expenses: 500</p>
          <Button text="+ Add Expense" color="#FF3838" />
        </div>
        <div className={styles.piechart}>
          
        </div>
      </div>
      <div className={styles.lower}>
        <div className={styles.transactions}></div>
        <div className={styles.topExpenses}></div>
      </div>
    </div>
  );
}

export default ExpenseTracker;
