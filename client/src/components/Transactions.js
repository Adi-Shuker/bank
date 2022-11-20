import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Transaction from "./Transaction";

export default function Transactions(props) {
    return (
        <div className="shadow-sm p-3 m-5 bg-white rounded">
            <Container>
                <Row>
                    <Col xs={3}>
                        <p>Details</p>
                    </Col>
                    <Col xs={3}>
                        <p>Category</p>
                    </Col>
                    <Col xs={3}>
                        <p>Amount</p>
                    </Col>
                </Row>
                {props.transactions.map((transaction) => {
                    return (
                        <Row key={transaction.transaction_id}>
                            <Transaction
                                id={transaction.transaction_id}
                                userId={transaction.user_id}
                                amount={transaction.amount}
                                category={transaction.category_name}
                                details={transaction.details}
                                vendor={transaction.vendor}
                                setTransactions={props.setTransactions}
                                setUserDetails={props.setUserDetails}
                            />
                        </Row>
                    );
                })}
            </Container>
        </div>
    );
}
