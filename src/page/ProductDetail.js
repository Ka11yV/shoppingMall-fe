import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown, Card } from "react-bootstrap"; // Card 컴포넌트 추가
import { ColorRing } from "react-loader-spinner";
import productStore from "../store/productStore";
import "../style/productDetail.style.css";
import userStore from "../store/userStore";
import cartStore from "../store/cartStore";
import reviewStore from "../store/reviewStore";
import { Rating } from "@mui/material";

const ProductDetail = () => {
    const { getProductDetail, loading } = productStore();
    const [size, setSize] = useState("");
    const { id } = useParams();
    const [sizeError, setSizeError] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState();
    const { user } = userStore();
    const { addToCart } = cartStore();
    const {getReviews} = reviewStore()
    const [reviews, setReviews] = useState([])
    const [averageRating, setAverageRating] = useState(0)

    const navigate = useNavigate();

    const addItemToCart = () => {
        if (!size) {
            setSizeError(true);
            return;
        }
        if (!user) navigate("/login");
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
                const res = await getReviews(id)
                setReviews(res.reviews)
                console.log(res, response)
            } catch (error) {
                console.log(error); 
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        if(!reviews) {
            setAverageRating(0)
            return;
        }
        average()
    }, [reviews])

    const average = () => {
        let sum = 0;
        reviews.map((review) => {
            sum += review.rating
        })
        setAverageRating((sum / reviews.length).toFixed(1))
        console.log(sum / reviews.length)
    }



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
                    {averageRating}
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

                    <Card className="mt-4 text-align-center" style={{ transition: 'none', transform: 'none' }}>
                        <Card.Header>
                            <h4>평점</h4> 
                        </Card.Header>
                        <Card.Body>
                            <Rating value={averageRating} precision={0.1} readOnly />
                            <Card.Text>{averageRating} / 5</Card.Text>
                        </Card.Body>
                    </Card>
                    
                    {reviews && reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <Card className="mt-4" style={{ transition: 'none', transform: 'none' }} key={index}>
                                <Card.Header>
                                    평점 : <Rating value={review.rating} readOnly />
                                    <br />
                                    이름 : {review.userId.name}
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        {review.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <h3 className="mt-4 text-align-center">아직 리뷰가 없습니다.</h3>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
