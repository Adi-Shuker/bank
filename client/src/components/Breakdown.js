import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";

export default function Breakdown(props) {
    return (
        <div className="shadow-sm p-3 m-5 bg-white rounded">
            <Container>
                {props.userBreakdown.map((category) => {
                    return (
                        <Row key={category.category_name}>
                            <Col>{category.category_name}</Col>
                            <Col>{category.total_amount}</Col>
                        </Row>
                    );
                })}
            </Container>
        </div>
    );
}
