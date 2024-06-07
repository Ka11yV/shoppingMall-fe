import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";
import errorStore from "../store/errorStore";
import productStore from "../store/productStore";
import uiStore from "../store/uiStore";

const ProductAll = () => {
    const { error } = errorStore();
    const { product, getProductList } = productStore();
    const products = Array.isArray(product) ? product : [];
    const [query, setQuery] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState({
        name: query.get("name") || "",
    });
    const { showToastMessage } = uiStore();

    useEffect(() => {
        const name = query.get("name") || "";
        setSearchQuery({ name });
    }, [query]);

    // `searchQuery`가 변경될 때 상품 목록을 가져옴
    useEffect(() => {
        if (searchQuery.name !== undefined) {
            getProductList(searchQuery);
        }
    }, [searchQuery]);

    return (
        <>
            <Container>
                <Row>
                    {products.length === 0 && (
                        <div>
                            <h1>검색 결과가 없습니다</h1>
                        </div>
                    )}
                    {products.map((item, index) => (
                        <Col key={index} md={3} sm={12}>
                            <ProductCard
                                id={item._id}
                                productName={item.name}
                                imgSrc={item.image}
                                price={item.price}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};
export default ProductAll;
