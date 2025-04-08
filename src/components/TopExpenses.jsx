import React from "react";
import styles from "./TopExpenses.module.css";

function TopExpenses({ expenses }) {
  const fixedCategories = ["Food", "Entertainment", "Travel"];
  const categoryTotals = expenses.reduce((acc, expense) => {
    if (fixedCategories.includes(expense.category)) {
      acc[expense.category] = (acc[expense.category] || 0) + Number(expense.price);
    }
    return acc;
  }, {});

  fixedCategories.forEach((cat) => {
    if (!(cat in categoryTotals)) {
      categoryTotals[cat] = 0;
    }
  });

  const maxExpense = Math.max(...Object.values(categoryTotals), 1);

  return (
    <div className={styles.topExpenses}>
      <h2><i>Top Expenses</i></h2>
      <div className={styles.chartBox}>
        {fixedCategories.map((category) => (
          <div key={category} className={styles.barRow}>
            <span className={styles.label}>{category}</span>
            <div className={styles.bar}>
              <div
                className={styles.fill}
                style={{ width: `${(categoryTotals[category] / maxExpense) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopExpenses;
