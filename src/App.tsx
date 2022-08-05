import React from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Main from "./page/Main";
import DetailUser from "./page/DetailUser";

const StyledApp = styled.div`
    margin: 0 auto;
    width: 768px;
    min-height: 100vh;

    display: flex;
    justify-content: center;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    @media (max-width: 1000px) {
        width: 90vw;
    }
`;

function App() {
    return (
        <StyledApp>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/detailuser" element={<DetailUser />} />
            </Routes>
        </StyledApp>
    );
}

export default App;
