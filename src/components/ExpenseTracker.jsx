import React, { useState, useEffect } from "react";
import styles from "./ExpenseTracker.module.css";
import Button from "./Button";
import deleteImg from "../assets/delete.png";
import editImg from "../assets/edit.png";
import DialogBox from "./DialogBox";
import TopExpenses from "./TopExpenses";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { LiaPizzaSliceSolid } from "react-icons/lia";
import { BiCameraMovie } from "react-icons/bi";
import { MdCardTravel } from "react-icons/md";
import { TfiLayoutWidthDefault } from "react-icons/tfi";
const categoryIcons = {
  Food: <LiaPizzaSliceSolid />,
  Travel: <MdCardTravel />,
  Entertainment: <BiCameraMovie />,
  default: <TfiLayoutWidthDefault />,
};

function ExpenseTracker() {
  const [balance, setBalance] = useState(() => {
    const storedBalance = localStorage.getItem("balance");
    return storedBalance ? Number(storedBalance) : 5000;
  });
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [expenseMoney, setExpenseMoney] = useState(0);

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("balance", JSON.stringify(balance));
  }, [balance]);

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
      const parsedExpenses = JSON.parse(storedExpenses);
      setExpenses(parsedExpenses);
      const totalExpense = parsedExpenses.reduce(
        (sum, curr) => sum + Number(curr.price),
        0
      );
      setExpenseMoney(totalExpense);
    }
  }, []);
  

  function handleDeleteExpense(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (confirmDelete && id) {
      const deletedExpense = expenses.find((exp) => exp.id === id);
      const updatedExpenses = expenses.filter((expense) => expense.id !== id);
      setExpenses(updatedExpenses);
      const totalExpense = updatedExpenses.reduce(
        (sum, curr) => sum + Number(curr.price),
        0
      );
      setExpenseMoney(totalExpense);
      if (deletedExpense) {
        setBalance((prev) => prev + Number(deletedExpense.price));
      }
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    }
  }

  function handleEditExpense(id) {
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    if (expenseToEdit) {
      setEditingExpense(expenseToEdit);
    }
  }

  const defaultCategories = ["Food", "Entertainment", "Travel"];

  const categoryData = defaultCategories.map((cat) => {
    // const found = expenses.find((exp) => exp.category === cat);
    const total = expenses
      .filter((exp) => exp.category === cat)
      .reduce((sum, curr) => sum + Number(curr.price), 0);
    return { category: cat, amount: total };
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Expense Tracker</h1>
      </div>
      <div className={styles.upper}>
        <div className={styles.wallet}>
          <p>Wallet Balance: ₹{balance}</p>
          <Button
            text="+ Add Income"
            color="#89E148"
            dialog="income"
            setBalance={setBalance}
            balance={balance}
          />
        </div>
        <div className={styles.expenses}>
          <p>Expenses: ₹{expenseMoney}</p>
          <Button
            text="+ Add Expense"
            color="#FF3838"
            dialog="expenses"
            expenses={expenses}
            setExpenses={setExpenses}
            setBalance={setBalance}
            setExpenseMoney={setExpenseMoney}
            balance={balance}
          />
        </div>
        <div className={styles.piechart}>
          <PieChart width={250} height={250}>
            <Pie
              data={categoryData}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#A000FF"
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={["#A000FF", "#FF9304", "#FDE006"][index % 3]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                display: "flex",
                justifyContent: "center",
                marginTop: 10,
                fontSize: "12px",
              }}
              payload={categoryData.map((item, index) => ({
                value: item.category,
                type: "square",
                color: ["#A000FF", "#FF9304", "#FDE006"][index % 3],
              }))}
            />
          </PieChart>
        </div>
      </div>
      <div className={styles.lower}>
        <div className={styles.transactions}>
          <h2>
            <i>Recent Transactions</i>
          </h2>
          {expenses.length > 0 ? (
            [...expenses].slice(0, 3).map((expense) => (
              <div key={expense.id} className={styles.transacDiv}>
                <div className={styles.transacleft}>
                  <div className={styles.transacIcon}>
                    {categoryIcons[expense.category] ||
                      categoryIcons["default"]}
                  </div>
                  <div className={styles.transacTitle}>
                    <h3>{expense.title}</h3>
                    <p>
                      {new Date(expense.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className={styles.transacPrice}>
                  <h3>₹ {expense.price}</h3>
                  <img
                    src={deleteImg}
                    alt="delete-icon"
                    onClick={() => handleDeleteExpense(expense.id)}
                  />
                  <img
                    src={editImg}
                    alt="edit-icon"
                    onClick={() => handleEditExpense(expense.id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <span>No transactions!</span>
          )}
        </div>
        <div className={styles.topExpenses}>
          <TopExpenses expenses={expenses} />
        </div>
      </div>
      {editingExpense && (
        <DialogBox
          dialog="editExpense"
          editingExpense={editingExpense}
          onClose={() => setEditingExpense(null)}
          expenses={expenses}
          setExpenses={setExpenses}
          onSave={() => setEditingExpense(null)}
          setExpenseMoney={setExpenseMoney}
          setBalance={setBalance}
          balance={balance}
        />
      )}
    </div>
  );
}

export default ExpenseTracker;
