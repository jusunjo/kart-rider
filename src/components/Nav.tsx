import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
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
    const [search, setSearch] = useState<boolean>(true);
    const [talk, setTalk] = useState<boolean>(false);
    const [personality, setPersonality] = useState<boolean>(false);

    // let {a}= useParams();

    // console.log({a})

    const clickNav = (text: string) => {
        if (text === "전적검색") {
            setSearch(true);
            setTalk(false);
            setPersonality(false);
        } else if (text === "소통광장") {
            setSearch(false);
            setTalk(true);
            setPersonality(false);
        } else if (text === "성격검사") {
            setSearch(false);
            setTalk(false);
            setPersonality(true);
        }
    };

    return (
        <StyledNav>
            <Link onClick={() => clickNav("전적검색")} className={search ? "clickNav" : "nav"} to="/">
                전적검색
            </Link>
            <div>|</div>
            <Link onClick={() => clickNav("소통광장")} className={talk ? "clickNav" : "nav"} to="/talkplaza">
                소통광장
            </Link>
            <div>|</div>
            <Link onClick={() => clickNav("성격검사")} className={personality ? "clickNav" : "nav"} to="/personalitytest">
                성격검사
            </Link>
        </StyledNav>
    );
};

export default Nav;
