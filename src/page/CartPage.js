import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../action/cartAction";
import CartProductCard from "../component/CartProductCard";
import OrderReceipt from "../component/OrderReceipt";
import "../style/cart.style.css";
import cartStore from "../store/cartStore";

const CartPage = () => {
    const { cart, getCartItems, totalPrice } = cartStore();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getCartItems();
        };
        fetchData();
    }, []);

    return (
        <Container>
            <Row>
                <Col xs={12} md={7}>
                    {cart.length < 0 ? (
                        <div className="text-align-center empty-bag">
                            <h2>카트가 비어있습니다.</h2>
                            <div>상품을 담아주세요!</div>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <CartProductCard item={item} key={item._id} />
                        ))
                    )}
                </Col>
                <Col xs={12} md={5}>
                    <OrderReceipt cart={cart}/>
                </Col>
            </Row>
        </Container>
    );
};

export default CartPage;
