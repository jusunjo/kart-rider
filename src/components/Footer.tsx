import React from "react";
import styled from "styled-components";

const StyledFooter = styled.div`
    border-top: 0.01px solid #e5e5e5;
    color: gray;
    font-size: 14px;
    height: 100px;
    width: 48%;
    position: absolute;
    bottom: 0;

    .nexon {
        margin-top: 7px;
        margin-left: 3%;
    }

    .logo {
        margin-top: 7px;
        margin-left: 3%;
    }

    .feedBack {
        margin-top: 7px;
        margin-left: 3%;

        span {
            padding-right: 20px;
        }
    }
`;
const Footer = () => {
    return (
        <StyledFooter>
            <div className="nexon">DataBased on NEXON DEVELOPERS</div>
            <div className="logo">logo by SANGSUB</div>
            <div className="feedBack">
                <span>문의/피드백</span>
                <span>github</span>
                <span>Email : jo_ami@naver.com</span>
            </div>
        </StyledFooter>
    );
};

export default Footer;
