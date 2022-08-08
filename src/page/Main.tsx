import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import { addInfo } from "../modules/userInfo";
import DetailUser from "./DetailUser";

const StyledMain = styled.div`
    width: 90vw;

    .logoBox {
        display: flex;
        justify-content: center;

        margin-top: 200px;

        .logo {
            width: 50%;
        }
    }
`;

const InputAndButton = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: center;
    border-radius: 30px;
    border: none;

    .InputUserName {
        width: 50%;
        height: 55px;
        border-radius: 30px;
        border: none;
        margin-right: 10px;
        padding-left: 20px;
        font-size: 20px;
        background-color: #f5f5f5;
        border: 0.1px solid #eeeeee;
    }

    .BtnUserName {
        width: 15%;
        border-radius: 30px;
        border: none;
        cursor: pointer;
        font-weight: 500;
        font-size: 15px;
        background-color: #64b5f6;

        &:hover {
            background-color: #1e88e5;
        }
    }
`;

const API_KEY = process.env.REACT_APP_API_KEY;

const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userName, setUserName] = useState<string>();

    console.log(userName);

    const MoveDetailUser = async () => {
        if (userName) {
            const response = await axios.get(`/users/nickname/${userName}/`, {
                headers: {
                    Authorization: `${API_KEY}`,
                },
            });

            const DetailUserInfo = await axios
                .get(`/users/${response.data.accessId}/matches?start_date=&end_date=&offset=0&limit=20&match_types=`, {
                    headers: {
                        Authorization: `${API_KEY}`,
                    },
                })
                .then((res) => res.data);

            console.log(DetailUserInfo.matches[0]);

            // const DetailMatchInfo = await axios.get()

            dispatch(addInfo(DetailUserInfo));
            console.log("DetailUserInfo", DetailUserInfo);
            navigate("/detailuser");
        } else {
            alert("라이더명을 입력해주세요");
        }
    };

    return (
        <>
            <StyledMain>
                <div className="logoBox">
                    <img className="logo" alt="logo" src={process.env.PUBLIC_URL + `/assets/logo1.png`} />
                </div>
                <InputAndButton>
                    <input onChange={(e) => setUserName(e.target.value)} placeholder="라이더 이름을 입력해주세요" className="InputUserName"></input>
                    <button onClick={MoveDetailUser} className="BtnUserName">
                        검색
                    </button>
                </InputAndButton>
                <Footer />
            </StyledMain>
        </>
    );
};

export default Main;
