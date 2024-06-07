import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";
import errorStore from "../store/errorStore";
import productStore from "../store/productStore";

const ProductAll = () => {
    const { error } = errorStore();
    const { product, getProductList } = productStore();
    const products = Array.isArray(product) ? product : [];
    const [query, setQuery] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState({
        name: query.get("name") || "",
    });

    useEffect(() => {
        const name = query.get("name") || "";
        setSearchQuery({ name });
    }, [query]);

    // `searchQuery`가 변경될 때 상품 목록을 가져옴
    useEffect(() => {
        if (searchQuery.name !== undefined) {
            getProductList(searchQuery);
        }
    }, [searchQuery, getProductList]);

    return (
        <Container>
            <Row>
                {products.map((item, index) => (
                    <Col key={index} md={3} sm={12}>
                        <ProductCard
                            productName={item.name}
                            imgSrc={item.image}
                            price={item.price}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
export default ProductAll;
