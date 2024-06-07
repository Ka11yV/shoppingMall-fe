import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";

const ProductCard = ({ productName, imgSrc, price }) => {
    const navigate = useNavigate();
    const showProduct = (id) => {
        // 상품 디테일 페이지로 가기
    };
    return (
        <div className="card" onClick={() => showProduct("hard_code")}>
            <img src={imgSrc} alt="" />
            <div>{productName}</div>
            <div>₩ {price}</div>
        </div>
    );
};

export default ProductCard;
