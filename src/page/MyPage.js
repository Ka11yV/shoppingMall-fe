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
import NewReviewDialog from '../component/NewReviewDialog'

const MyPage = () => {
    const { getMyOrder } = orderStore();
    const [orders, setOrders] = useState([]);
    const { user } = userStore();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)


    const handleClose = () => {
        setOpen(false)
    }

    const fetchData = async () => {
        const response = await getMyOrder();
        await setOrders(response);
    };


    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        fetchData();
    }, [user, navigate, getMyOrder]);

    if (orders.length === 0 || orders.length === undefined) {
        return (
            <Container className="no-order-box">
                <div>주문한 상품이 없습니다</div>
            </Container>
        );
    }
    // 오더리스트가 없다면? 주문한 상품이 없습니다 메세지 보여주기
    return (
        <>
        <Container className="status-card-container">
            {orders.length > 0 &&
                orders.map((order, index) => <OrderStatusCard order={order} setOpen={setOpen} handleClose={handleClose}/>)}
        </Container>

        {open && (
            <NewReviewDialog open={open} handleClose={handleClose}/>
        )}</>
    );
};

export default MyPage;
