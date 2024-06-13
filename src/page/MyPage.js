import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../action/orderAction";
import OrderStatusCard from "../component/OrderStatusCard";
import "../style/orderStatus.style.css";
import orderStore from "../store/orderStore";
import { useState } from "react";
import userStore from "../store/userStore";
import { useNavigate } from "react-router";

const MyPage = () => {
    const { getMyOrder } = orderStore();
    const [orders, setOrders] = useState([]);
    const { user } = userStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        const fetchData = async () => {
            const response = await getMyOrder();
            setOrders(response);
        };
        fetchData();
    }, [user, navigate, getMyOrder]);

    console.log(orders.length);

    if (orders.length === 0 || orders.length === undefined) {
        return (
            <Container className="no-order-box">
                <div>주문한 상품이 없습니다</div>
            </Container>
        );
    }
    // 오더리스트가 없다면? 주문한 상품이 없습니다 메세지 보여주기
    return (
        <Container className="status-card-container">
            {orders.length > 0 &&
                orders.map((order) => <OrderStatusCard order={order} />)}
        </Container>
    );
};

export default MyPage;
