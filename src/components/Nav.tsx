import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const StyledNav = styled.div`
    background-color: #64b5f6;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 60px;
    color: white;
    font-weight: 500;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 9px 29px 0px;

    .nav {
        text-decoration: none;
        color: white;
        cursor: pointer;

        &:hover {
            color: #005cb2;
        }
    }

    .clickNav {
        text-decoration: none;
        color: #005cb2;
        cursor: pointer;
    }
`;

const Nav = () => {
    const location: { pathname: string } = useLocation();

    console.log(location.pathname);
    return (
        <StyledNav>
            <Link className={location.pathname === "/" ? "clickNav" : location.pathname === "/detailuser" ? "clickNav" : "nav"} to="/">
                전적검색
            </Link>
            <div>|</div>
            <Link className={location.pathname === "/talkplaza" ? "clickNav" : location.pathname === "/createtalk" ? "clickNav" : "nav"} to="/talkplaza">
                소통광장
            </Link>
            <div>|</div>
            <Link className={location.pathname === "/personalitytest" ? "clickNav" : "nav"} to="/personalitytest">
                길드전
            </Link>
        </StyledNav>
    );
};

export default Nav;
