import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import BankApi from "../BankApi";

const bankApi = new BankApi();

export default function Transaction(props) {
    const deleteTransaction = (transactionId, setTransactions) => {
        bankApi.deleteTransaction(transactionId).then((res) => {
            console.log("deleteTransaction", res[0]);
            bankApi.getAllTransactions().then((transactions) => {
                setTransactions(transactions);
            });
            props.setUserDetails(res[0]);
        });
    };
    const amountClass =
        props.amount >= 0 ? "text-light bg-success" : "text-light bg-danger";
    return (
        <div className="shadow-sm m-2 bg-white rounded">
            <Container>
                <Row>
                    <Col xs={3}>
                        <p>{props.details}</p>
                    </Col>
                    <Col xs={3}>
                        <p>{props.category}</p>
                    </Col>
                    <Col xs={3}>
                        <p className={amountClass}>{props.amount}</p>
                    </Col>
                    <Col xs={3}>
                        <Button
                            className="mb-2"
                            variant="danger"
                            onClick={() => {
                                deleteTransaction(
                                    props.id,
                                    props.setTransactions
                                );
                            }}
                        >
                            Delete
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
