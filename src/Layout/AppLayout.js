import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { Col, Row } from "react-bootstrap";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import ToastMessage from "../component/ToastMessage";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../action/userAction";
import { commonUiActions } from "../action/commonUiAction";
import userStore from "../store/userStore";

const AppLayout = ({ children }) => {
    const location = useLocation();
    const { user, loginWithToken } = userStore();

    // const { user } = useSelector((state) => state.user);
    useEffect(() => {
        loginWithToken();
    }, []);

    return (
        <div>
            <ToastMessage />
            {location.pathname.includes("admin") ? (
                <Row className="vh-100">
                    <Col xs={12} md={3} className="sidebar mobile-sidebar">
                        <Sidebar />
                    </Col>
                    <Col xs={12} md={9}>
                        {children}
                    </Col>
                </Row>
            ) : (
                <>
                    <Navbar user={user} />
                    {children}
                </>
            )}
        </div>
    );
};

export default AppLayout;
