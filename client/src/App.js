import "./App.css";
import NavigationBar from "./components/NavigationBar";
import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Transactions from "./components/Transactions";
import Operations from "./components/Operations";
import Breakdown from "./components/Breakdown";
import BankApi from "./BankApi";

const bankApi = new BankApi();
function App() {
    const [userDetails, setUserDetails] = useState({
        id: 0,
        balance: 0,
        name: "",
    });
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [userBreakdown, setUserBreakdown] = useState([]);
    const userId = 1;

    useEffect(() => {
        bankApi.getUser(userId).then((res) => {
            setUserDetails(res);
        });
        bankApi
            .getAllTransactions()
            .then((transactions) => setTransactions(transactions));
        bankApi
            .getAllCategories()
            .then((categories) => setCategories(categories));
        bankApi.getUserBreakdown(userId).then((res) => setUserBreakdown(res));
    }, []);

    return (
        <div className="App">
            <Router>
                <NavigationBar userDetails={userDetails}></NavigationBar>
                <Routes>
                    <Route
                        path="/transactions"
                        element={
                            <Transactions
                                transactions={transactions}
                                setTransactions={setTransactions}
                                setUserDetails={setUserDetails}
                            />
                        }
                    />
                    <Route
                        path="/operations"
                        element={
                            <Operations
                                categories={categories}
                                userId={userDetails.id}
                                userDetails={userDetails}
                                setUserDetails={setUserDetails}
                            />
                        }
                    />
                    <Route
                        path="/breakdown"
                        element={<Breakdown userBreakdown={userBreakdown} />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
