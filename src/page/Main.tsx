import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DetailUser from "./DetailUser";

const StyledMain = styled.div`
    width: 90vw;
`;

const InputAndButton = styled.div`
    margin-top: 300px;
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
    const [userName, setUserName] = useState<string>();

    const navigate = useNavigate();

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
            console.log(DetailUserInfo);
            navigate("/detailuser");
        } else {
            alert("라이더명을 입력해주세요");
        }
    };

    return (
        <StyledMain>
            <div></div>
            <InputAndButton>
                <input onChange={(e) => setUserName(e.target.value)} placeholder="라이더 이름을 입력해주세요" className="InputUserName"></input>
                <button onClick={MoveDetailUser} className="BtnUserName">
                    검색
                </button>
            </InputAndButton>
        </StyledMain>
    );
};

export default Main;
