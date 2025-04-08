import React, { useState, useEffect } from "react";
import styles from "./DialogBox.module.css";
import CancelButton from "./CancelButton";
import AddButton from "./AddButton";

function DialogBox({
  onClose,
  dialog,
  expenses,
  setExpenses,
  setBalance,
  editingExpense,
  onSave,
  setExpenseMoney,
  balance,
}) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [income, setIncome] = useState(0);

  useEffect(() => {
    if (dialog === "editExpense" && editingExpense) {
      setTitle(editingExpense.title);
      setPrice(editingExpense.price);
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
    }
  }, [dialog, editingExpense]);

  function handleAddExpense() {
    if (!title || !price || !category || !date) {
      alert("Please fill all details");
      return;
    }

    const expenseAmount = Number(price);

    if (expenseAmount > balance) {
      alert("Expense exceeds current balance!");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title,
      price: expenseAmount,
      category,
      date,
    };

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);

    const totalExpense = updatedExpenses.reduce(
      (sum, curr) => sum + Number(curr.price),
      0
    );
    setExpenseMoney(totalExpense);

    const newBalance = balance - expenseAmount;
    setBalance(newBalance);
    localStorage.setItem("balance", JSON.stringify(newBalance));
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

    onClose();
    setTitle("");
    setPrice("");
    setCategory("");
    setDate("");
  }

  function handleEditExpenseSave() {
    if (!title || !price || !category || !date) {
      alert("Please fill all details");
      return;
    }

    const updatedPrice = Number(price);
    const oldPrice = Number(editingExpense.price);
    const currentBalance = Number(balance);

    const priceDifference = updatedPrice - oldPrice;

    if (priceDifference > currentBalance) {
      alert("Updated expense exceeds available balance!");
      return;
    }

    const updatedExpense = {
      ...editingExpense,
      title,
      price: updatedPrice,
      category,
      date,
    };

    const updatedExpenses = expenses.map((exp) =>
      exp.id === editingExpense.id ? updatedExpense : exp
    );

    const totalExpense = updatedExpenses.reduce(
      (sum, curr) => sum + Number(curr.price),
      0
    );
    setExpenseMoney(totalExpense);

    const newBalance = currentBalance - priceDifference;
    console.log({ updatedPrice, oldPrice, balance, priceDifference });
    setBalance(newBalance);
    localStorage.setItem("balance", JSON.stringify(newBalance));
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

    setExpenses(updatedExpenses);
    onSave?.();
    onClose();
  }

  function handleAddBalance() {
    const parsedIncome = Number(income);
    const newBalance = balance + parsedIncome;
    setBalance(newBalance);
    localStorage.setItem("balance", JSON.stringify(newBalance));

    onClose();
    setIncome(0);
  }

  return (
    <>
      {dialog === "expenses" && (
        <div className={styles.overlay}>
          <div className={styles.dialog}>
            <div className={styles.dialogTitle}>
              <h2>Add Expenses</h2>
            </div>
            <div className={styles.dialogInput}>
              <div className={styles.firstInputDiv}>
                <input
                  type="text"
                  placeholder="Title"
                  required
                  className={styles.input}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Price"
                  min="1"
                  className={styles.input}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className={styles.secondInputDiv}>
                <select
                  className={styles.input}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
                <input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  className={styles.input}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.btnDiv}>
              <AddButton text="Add Expense" onClick={handleAddExpense} />
              <CancelButton onClose={onClose} text="Cancel" />
            </div>
          </div>
        </div>
      )}

      {dialog === "income" && (
        <div className={styles.overlay}>
          <div className={styles.dialog}>
            <div className={styles.dialogTitle}>
              <h2>Add Balance</h2>
            </div>
            <div className={styles.dialogInput}>
              <div className={styles.firstInputDiv}>
                <input
                  type="number"
                  placeholder="Income Amount"
                  required
                  min="1"
                  className={styles.input}
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                />
              </div>
            </div>
            <div className={styles.btnDiv}>
              <AddButton text="Add Balance" onClick={handleAddBalance} />
              <CancelButton onClose={onClose} text="Cancel" />
            </div>
          </div>
        </div>
      )}

      {dialog === "editExpense" && (
        <div className={styles.overlay}>
          <div className={styles.dialog}>
            <div className={styles.dialogTitle}>
              <h2>Edit Expenses</h2>
            </div>
            <div className={styles.dialogInput}>
              <div className={styles.firstInputDiv}>
                <input
                  type="text"
                  placeholder="Title"
                  required
                  className={styles.input}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Price"
                  min="1"
                  className={styles.input}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className={styles.secondInputDiv}>
                <select
                  className={styles.input}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Entertainment">Entertainment</option>
                </select>

                <input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  className={styles.input}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.btnDiv}>
              <AddButton text="Add Expense" onClick={handleEditExpenseSave} />
              <CancelButton onClose={onClose} text="Cancel" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DialogBox;
