import { async } from "@firebase/util";
import axios from "axios";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";

import { addInfo, deleteSearchWord, recordSearchWord, user } from "../modules/userInfo";
import DetailUser from "./DetailUser";

const StyledMain = styled.div`
    /* width: 90vw; */

    .logoBox {
        display: flex;
        justify-content: center;

        margin-top: 230px;

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

    .leftBox {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .InputUserName {
            width: 100%;
            height: 55px;
            border-radius: 30px;
            border: none;
            padding-left: 20px;
            font-size: 20px;
            background-color: #f5f5f5;
            border: 0.1px solid #eeeeee;
        }

        .noneHistory {
            display: none;
        }

        .recentHistory {
            width: 95%;
            padding-left: 20px;

            background-color: #fafafa;
            border: 1px solid #c7c7c7;
            border-top: none;
            border-radius: 10px;

            .history {
                padding: 3px 0;
                display: flex;
                justify-content: space-between;

                .searchWord {
                    cursor: pointer;
                }

                .close {
                    margin-right: 10px;
                    cursor: pointer;
                }
            }
        }
    }

    .rightBox {
        width: 15%;
        .BtnUserName {
            height: 55px;
            margin-left: 30px;
            width: 90%;
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
    }
`;

const API_KEY = process.env.REACT_APP_API_KEY;

const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userName, setUserName] = useState<string>();
    const [isFocus, setIsFocus] = useState<boolean>(false);

    const exRef = useRef();

    const recordWord = useSelector((it: any) => it.userInfo.searchWord);

    const clickOnFocus = () => {
        setIsFocus(true);
    };

    const MoveDetailUser = async () => {
        if (userName) {
            //????????? ?????? ??? api ??????
            try {
                const response = await axios.get(`/users/nickname/${userName}/`, {
                    headers: {
                        Authorization: `${API_KEY}`,
                    },
                });

                //???????????? ??????
                dispatch(user(response.data));

                //?????????????????? api ??????
                const DetailUserInfo = await axios
                    .get(`/users/${response.data.accessId}/matches?start_date=&end_date=&offset=10&limit=20&match_types=`, {
                        headers: {
                            Authorization: `${API_KEY}`,
                        },
                    })
                    .then((res) => res.data);

                //?????????????????? ??????
                dispatch(addInfo(DetailUserInfo));

                navigate("/detailuser");

                //??????????????? ??????
                dispatch(recordSearchWord(userName));
            } catch (e) {
                return alert("???????????? ?????? ??? ????????????.");
            }
        } else {
            alert("??????????????? ??????????????????");
        }
    };

    //????????????????????? api ??????
    const clickSearchWord = async (nickName: string) => {
        const response = await axios.get(`/users/nickname/${nickName}/`, {
            headers: {
                Authorization: `${API_KEY}`,
            },
        });

        console.log(response);

        dispatch(user(response.data));

        const DetailUserInfo = await axios
            .get(`/users/${response.data.accessId}/matches?start_date=&end_date=&offset=10&limit=20&match_types=`, {
                headers: {
                    Authorization: `${API_KEY}`,
                },
            })
            .then((res) => res.data);

        // ?????????????????? ??????
        dispatch(addInfo(DetailUserInfo));

        navigate("/detailuser");
    };

    const removeSearchWord = (nickName: string) => {
        console.log(nickName);
        dispatch(deleteSearchWord(nickName));
    };

    return (
        <>
            <StyledMain>
                <div className="logoBox">
                    <img className="logo" alt="logo" src={process.env.PUBLIC_URL + `/assets/logo1.png`} />
                </div>
                <InputAndButton>
                    <div onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)} tabIndex={0} className="leftBox">
                        <input onChange={(e) => setUserName(e.target.value)} placeholder="????????? ????????? ??????????????????" className="InputUserName" />
                        {recordWord === [] ? (
                            ""
                        ) : (
                            <div className={isFocus ? "recentHistory" : "noneHistory"}>
                                {recordWord.map((it: any, idx: number): any => {
                                    return (
                                        <div key={idx} className="history">
                                            <div className="searchWord" onClick={() => clickSearchWord(it)}>
                                                {it}
                                            </div>
                                            <div className="close" onClick={() => removeSearchWord(it)}>
                                                x
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <div className="rightBox">
                        <button onClick={MoveDetailUser} className="BtnUserName">
                            ??????
                        </button>
                    </div>
                </InputAndButton>

                <Footer />
            </StyledMain>
        </>
    );
};

export default Main;
