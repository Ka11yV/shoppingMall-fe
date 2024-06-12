import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { badgeBg } from "../constants/order.constants";
import { currencyFormat } from "../utils/number";
import { formatDataTime } from "../utils/string";

const OrderStatusCard = ({ order }) => {
    formatDataTime(order.createdAt);

    const items = order.items;

    const productNameFormmating = (items) => {
        if (items.length > 1) {
            return `${items[0].productId.name} 외 1개`;
        } else {
            return items[0].productId.name;
        }
    };

    return (
        <div>
            <Row className="status-card">
                <Col xs={2}>
                    <img
                        src={order.items[0].productId.image}
                        alt=""
                        height={96}
                    />
                </Col>
                <Col xs={8} className="order-info">
                    <div>
                        <strong>주문번호: {order.orderNum}</strong>
                    </div>

                    <div className="text-12">
                        {formatDataTime(order.createdAt)}
                    </div>

                    <div>{productNameFormmating(items)}</div>
                    <div>₩ {currencyFormat(order.totalPrice)}</div>
                </Col>
                <Col md={2} className="vertical-middle">
                    <div className="text-align-center text-12">주문상태</div>
                    <Badge bg="warning">{order.status}</Badge>
                </Col>
            </Row>
        </div>
    );
};

export default OrderStatusCard;
