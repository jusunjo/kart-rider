import React, { useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore/lite";
import { db } from "../firebase_config";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Switch, ToggleButton, ToggleButtonGroup } from "@mui/material";

const StyledCreateTalk = styled.div`
    display: flex;
    justify-content: center;
    font-weight: 600;

    .talkForm {
        width: 50%;
        display: flex;
        flex-direction: column;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        margin-top: 200px;
        padding: 30px;
        background-color: #eeeeee;
        border: 0.5px solid #e0e0e0;
        border-radius: 10px;

        .micAndLicense {
            display: flex;
        }

        .text {
            margin-left: 5px;
        }

        .micGroup {
            margin-left: 70px;
        }

        .licenseGroup {
            margin-left: 170px;
        }

        .mic {
            margin-left: 10px;
        }
    }

    input,
    textarea {
        height: 30px;
        border-radius: 10px;
        border: none;
        background-color: #fafafa;
        margin: 10px 0;
        padding-left: 10px;
    }

    .content {
        height: 100px;
    }

    .btnGroup {
        display: flex;
        justify-content: space-between;
        button {
            background-color: #64b5f6;
            margin-top: 20px;
            height: 50px;
            border-radius: 10px;
            border: none;
            width: 47%;
            font-size: 1.1rem;
            cursor: pointer;
        }
    }
`;

const CreateTalk = () => {
    const navigate = useNavigate();

    const [id, setId] = useState<string>("");
    const [mic, setMic] = useState<boolean>(true);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const userCollection = collection(db, "communication");

    const createTalk = async () => {
        if (title.length <= 4 || title.length >= 15) {
            return alert("제목을 5자 이상 15자 이하로 입력해주세요");
        } else if (id.length <= 1 || id.length >= 10) {
            return alert("아이디를 2자 이상 10자 이하로 입력해주세요");
        } else if (content.length <= 4 || content.length >= 30) {
            // return alert("내용을 5자 이상 30자 이하로 입력해주세요");
        }

        await addDoc(userCollection, { id: id, title: title, content: content, mic: mic, timestamp: +new Date() });

        navigate("/talkplaza");
    };

    console.log(mic);

    return (
        <StyledCreateTalk>
            <div className="talkForm">
                <div className="text">제목</div>
                <input onChange={(e) => setTitle(e.target.value)} />
                <div className="text">라이더명</div>
                <input onChange={(e) => setId(e.target.value)} />
                <div className="text">내용</div>
                <textarea className="content" onChange={(e) => setContent(e.target.value)} />
                <div className="micAndLicense">
                    <div className="micGroup">
                        <div className="text mic">마이크</div>
                        <Switch onChange={() => setMic(!mic)} defaultChecked />
                    </div>
                    <div className="licenseGroup"></div>
                </div>
                <div className="btnGroup">
                    <button onClick={createTalk}>등록</button>
                    <button onClick={() => navigate(-1)}>취소</button>
                </div>
            </div>
        </StyledCreateTalk>
    );
};

export default CreateTalk;
