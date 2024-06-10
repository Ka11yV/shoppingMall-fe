import React, { useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { cartActions } from "../action/cartAction";
import { currencyFormat } from "../utils/number";
import cartStore from "../store/cartStore";
import userStore from '../store/userStore'

const CartProductCard = ({ item }) => {
    const { getCartItems, deleteCartItem, getCartItemQty, setItemQty } = cartStore();
    const [total, setTotal] = useState();
    const {user} = userStore();
    const [price, setPrice] = useState(item.productId.price)
    const [qty, setQty] = useState(item.qty)
    const {totalPrice } = cartStore();


    const handleQtyChange = async (event, id) => {
        const qty = event.target.value;
        setQty(qty)
        await setItemQty(id, qty)
        getCartItems();
    };

    const deleteCart = async (id) => {
        await deleteCartItem(id);
        getCartItems();
        getCartItemQty({user})
    };

    useEffect(() => {
        setTotal(price * qty)
    }, [qty])

    return (
        <div className="product-card-cart">
            <Row>
                <Col md={2} xs={12}>
                    <img src={item.productId.image} width={112} />
                </Col>
                <Col md={10} xs={12}>
                    <div className="display-flex space-between">
                        <h3>{item.productId.name}</h3>
                        <button className="trash-button">
                            <FontAwesomeIcon
                                icon={faTrash}
                                width={24}
                                onClick={() => {
                                    deleteCart(item._id);
                                }}
                                style={{ cursor: "pointer" }}
                            />
                        </button>
                    </div>

                    <div>
                        <strong>₩ {currencyFormat(item.productId.price)}</strong>
                    </div>
                    <div>Size: {item.size.toUpperCase()}</div>
                    <div>Total: ₩ {currencyFormat(total)}</div>
                    <div>
                        Quantity:
                        <Form.Select
                            onChange={(event) => handleQtyChange(event, item._id)}
                            required
                            defaultValue={item.qty || 1}
                            className="qty-dropdown"
                        >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                        </Form.Select>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default CartProductCard;
