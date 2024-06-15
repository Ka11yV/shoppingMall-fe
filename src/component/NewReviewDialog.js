import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import reviewStore from "../store/reviewStore"; // Zustand 스토어 import
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import userStore from "../store/userStore";

const ReviewForm = ({ open, handleClose,  }) => {
    const [description, setDescription] = useState("");
    const { addReview, reviewProductId, reviewOrderNum } = reviewStore();
    const [value, setValue] = useState(0)
    const {user} = userStore()


    const handleSubmit = async (event) => { 
        event.preventDefault();
        const newReview = {
            productId: reviewProductId,
            userId: user._id,
            rating: value,
            description,
            orderNum: reviewOrderNum
        };
        try {
            await addReview(newReview);
            handleClose();
        } catch (error) {
            console.error("Failed to add review:", error);
            // 에러 처리 로직 추가 (예: 사용자에게 알림)
        }
    };

    return (
        <Modal show={open} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>리뷰 작성</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="rating">
                    <Typography component="legend">평점</Typography>
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>리뷰 내용</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <div className="review-button-area">
                        <Button variant="light" onClick={handleClose} className="review-button">
                            닫기
                        </Button>
                        <Button type="submit">저장</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ReviewForm;
