import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BankApi from "../BankApi";

export default function Operations(props) {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [details, setDetails] = useState("");
    const [vendor, setVendor] = useState("");
    const bankApi = new BankApi();

    const addTransaction = (operation) => {
        let newAmount = amount;
        if (operation === "Withdraw") newAmount = -amount;
        bankApi
            .addTransaction(props.userId, newAmount, category, details, vendor)
            .then((res) => {
                bankApi.getAllTransactions().then((transactions) => {
                    props.setTransactions(transactions[0]);
                });
                return res[0];
            })
            .then((userDetails) => {
                props.setUserDetails(userDetails);
            });
    };

    return (
        <Container>
            <Row>
                <Col xs={8}>
                    <div className="shadow-sm p-3 m-5 bg-white rounded">
                        <Form>
                            <h1>Insert Transactions</h1>
                            <Form.Group
                                className="mb-3"
                                controlId="transactionDetails"
                            >
                                <Form.Control
                                    type="htmlSize"
                                    placeholder="Transaction details"
                                    onChange={(e) => {
                                        setDetails(e.target.value);
                                    }}
                                    value={details}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="transactionAmount"
                            >
                                <Form.Control
                                    type="text"
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            alert("Only digits are allowed");
                                        }
                                    }}
                                    placeholder="Transaction amount"
                                    onChange={(e) => {
                                        setAmount(parseInt(e.target.value));
                                    }}
                                    value={amount}
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="transactionVendor"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Transaction vendor"
                                    onChange={(e) => {
                                        setVendor(e.target.value);
                                    }}
                                    value={vendor}
                                />
                            </Form.Group>

                            <Form.Select
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                }}
                            >
                                <option>choose category</option>
                                {props.categories.map((category) => (
                                    <option
                                        key={category.name}
                                        value={category.name}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </Form.Select>

                            <Button
                                type="submit"
                                className="btn btn-primary m-3"
                                variant="success"
                                onClick={() => {
                                    addTransaction("Deposit");
                                }}
                            >
                                Deposit
                            </Button>

                            <Button
                                type="submit"
                                className=" m-3"
                                variant="danger"
                                onClick={() => {
                                    addTransaction("Withdraw");
                                }}
                            >
                                Withdraw
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
            r
        </Container>
    );
}
