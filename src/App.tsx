import React from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Main from "./page/Main";
import DetailUser from "./page/DetailUser";
import Nav from "./components/Nav";
import TalkPlaza from "./page/TalkPlaza";
import PersonalityTest from "./page/PersonalityTest";
import CreateTalk from "./page/CreateTalk";

const StyledApp = styled.div`
    margin: 0 auto;
    width: 868px;
    height: 100vh;

    /* display: flex; */
    justify-content: center;
    /* flex-direction :column; */
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    @media (max-width: 1000px) {
        width: 90vw;
    }
`;

function App() {
    return (
        <StyledApp>
            <Nav/>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/detailuser" element={<DetailUser />} />
                <Route path='/talkplaza' element={<TalkPlaza />}/>
                <Route path='/createtalk' element={<CreateTalk />}/>
                <Route path='/personalitytest' element={<PersonalityTest />}/>
            </Routes>
        </StyledApp>
    );
}

export default App;
