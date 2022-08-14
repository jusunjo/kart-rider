import axios from "axios";
import { collection, getDocs } from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import { db } from "../firebase_config";

import { addInfo, recordSearchWord, user } from "../modules/userInfo";
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
   
    


    .leftBox {
        width: 50%;
        display : flex;
        flex-direction : column;
        justify-content : center;
        align-items : center;
        
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

        .recentHistory {
            width :95%;
            padding-left: 20px;
    
            background-color : #fafafa;
            border : 1px solid #c7c7c7;
            border-top : none;
            border-radius : 10px;

            .history {
                padding : 3px 0;
                display : flex;
                justify-content : space-between;

                .searchWord {
                    cursor: pointer;
                }

                .close {
                    margin-right :10px;
                }
            }
        }
    }

    .rightBox {
        width: 15%;
        .BtnUserName {
            height: 55px;
            margin-left : 30px;
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
    const recordWord = useSelector((it: any) => it.userInfo.searchWord);

    const MoveDetailUser = async () => {

        if (userName) {
            //닉네임 입력 후 api 호출
            const response = await axios.get(`/users/nickname/${userName}/`, {
                headers: {
                    Authorization: `${API_KEY}`,
                },
            });

            //유저정보 담기
            dispatch(user(response.data));

            //상세매치내역 api 호출
            const DetailUserInfo = await axios
                .get(`/users/${response.data.accessId}/matches?start_date=&end_date=&offset=10&limit=20&match_types=`, {
                    headers: {
                        Authorization: `${API_KEY}`,
                    },
                })
                .then((res) => res.data);

            //상세매치내역 담기
            dispatch(addInfo(DetailUserInfo));
         
            navigate("/detailuser");

            //최근검색어 담기
            dispatch(recordSearchWord(userName))

        } else {
            alert("라이더명을 입력해주세요");
        }
    };

    
    // const userCollection = collection(db, "communication");
    // const getUser = async () => {
        //     const data = await getDocs(userCollection);
        //     console.log(data.docs);
        // };
        // getUser();
        
        const clickSearchWord = () => {
            console.log('gd')
        }
    
    return (
        <>
            <StyledMain>
                <div className="logoBox">
                    <img className="logo" alt="logo" src={process.env.PUBLIC_URL + `/assets/logo1.png`} />
                </div>
                <InputAndButton>
                    <div className="leftBox">
                    <input onChange={(e) => setUserName(e.target.value)} placeholder="라이더 이름을 입력해주세요" className="InputUserName"/>
                    { recordWord === [] 
                    ?   '' 
                    :   <div className="recentHistory">
                        {recordWord.map((it:any, idx:number) => {
                          return  <div key={idx} className="history">
                                <div className="searchWord" onClick={clickSearchWord}>{it}</div>
                                <div className="close">x</div>
                            </div>
                        })}
                        </div>
                    }
                    </div>
                    <div className="rightBox">
                    <button onClick={MoveDetailUser} className="BtnUserName">
                        검색
                    </button>
                    </div>
           
                </InputAndButton>
                
                <Footer />
            </StyledMain>
        </>
    );
};

export default Main;
