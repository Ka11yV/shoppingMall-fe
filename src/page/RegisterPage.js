import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { userActions } from "../action/userAction";
import userStore from "../store/userStore";

import "../style/register.style.css";
import uiStore from "../store/uiStore";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
        policy: false,
    });
    const navigate = useNavigate();
    const { error, setError } = userStore();
    const [passwordError, setPasswordError] = useState("");
    const [policyError, setPolicyError] = useState(false);
    const { registerUser } = userStore();

    const register = async (event) => {
        const { email, name, password, confirmPassword, policy } = formData;
        event.preventDefault();
        try {
            if (password !== confirmPassword) {
                setPasswordError("비밀번호 중복확인이 일치하지않습니다.");
            }
            if (!policy) setPolicyError(true);
            await registerUser({ name, email, password }, navigate);
            setPolicyError("");
            setPasswordError("");
        } catch (error) {
            setError(error.message);
        }

        // 비번 중복확인 일치하는지 확인
        // 이용약관에 체크했는지 확인
        // FormData에 있는 값을 가지고 백엔드로 넘겨주기
        //성공후 로그인 페이지로 넘어가기
    };

    const handleChange = (event) => {
        event.preventDefault();
        const { id, value, checked } = event.target;

        if (id === "policy") {
            setFormData({ ...formData, [id]: checked });
        } else {
            setFormData({ ...formData, [id]: value });
        }
    };

    return (
        <Container className="register-area">
            {error && (
                <div>
                    <Alert variant="danger" className="error-message">
                        {error}
                    </Alert>
                </div>
            )}
            <Form onSubmit={register}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        id="name"
                        placeholder="Enter name"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        required
                        isInvalid={passwordError}
                    />
                    <Form.Control.Feedback type="invalid">
                        {passwordError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        label="이용약관에 동의합니다"
                        id="policy"
                        onChange={handleChange}
                        isInvalid={policyError}
                        checked={formData.policy}
                        value={formData.policy}
                    />
                </Form.Group>
                <Button variant="danger" type="submit">
                    회원가입
                </Button>
            </Form>
        </Container>
    );
};

export default RegisterPage;
