import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { ColorRing } from "react-loader-spinner";
import productStore from "../store/productStore";
import "../style/productDetail.style.css";
import userStore from "../store/userStore";
import cartStore from "../store/cartStore";

const ProductDetail = () => {
    const { getProductDetail, loading } = productStore();
    const [size, setSize] = useState("");
    const { id } = useParams();
    const [sizeError, setSizeError] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState();
    const { user } = userStore();
    const { addToCart } = cartStore();

    const navigate = useNavigate();

    const addItemToCart = () => {
        if (!size) {
            setSizeError(true);
            return;
        }
        if (!user) navigate("/login");
        console.log(id, size);
        addToCart({ id, size });
        // 카트에 아이템 추가하기 로직 추가
    };

    const selectSize = (value) => {
        setSize(value);
        setSizeError(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProductDetail(id);
                setSelectedProduct(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    // useEffect(() => {
    //     console.log(selectedProduct);
    // }, [selectedProduct]);

    if (loading || !selectedProduct) {
        return (
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
        );
    }

    return (
        <Container className="product-detail-card">
            <Row>
                <Col sm={6}>
                    <img
                        src={selectedProduct.image}
                        className="w-100"
                        alt="image"
                    />
                </Col>
                <Col className="product-info-area" sm={6}>
                    <div className="product-info">{selectedProduct.name}</div>
                    <br />
                    <div className="product-info">
                        ₩ {selectedProduct.price}
                    </div>
                    <br />
                    <div className="product-info">
                        {selectedProduct.description}
                    </div>

                    <Dropdown
                        className="drop-down size-drop-down"
                        onSelect={(value) => selectSize(value)}
                    >
                        <Dropdown.Toggle
                            className="size-drop-down"
                            variant={
                                sizeError ? "outline-danger" : "outline-dark"
                            }
                            id="dropdown-basic"
                            align="start"
                        >
                            {size === "" ? "사이즈 선택" : size.toUpperCase()}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="size-drop-down">
                            {Object.keys(selectedProduct.stock).length > 0 &&
                                Object.keys(selectedProduct.stock).map(
                                    (item) => (
                                        <Dropdown.Item
                                            key={item}
                                            eventKey={item}
                                        >
                                            {item.toUpperCase()}
                                        </Dropdown.Item>
                                    )
                                )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <div className="warning-message">
                        {sizeError && "사이즈를 선택해주세요."}
                    </div>
                    <Button
                        variant="dark"
                        className="add-button"
                        onClick={addItemToCart}
                    >
                        추가
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
