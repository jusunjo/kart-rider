import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore/lite";
import { db } from "../firebase_config";
import { useNavigate } from "react-router-dom";
import TalkBox from "../components/TalkBox";
import styled from "styled-components";

const StyledTalkPlaza = styled.div`
    .plazaTitle {
        margin-left: 30px;
        h1 {
            margin-top: 100px;
            margin-bottom: 0px;
        }
    }

    .createTalk {
        /* margin-top: 100px; */
        margin-left: 770px;
        border: none;
        padding: 10px 20px;
        border-radius: 10px;
        /* text-align : */
        background-color: #e0e0e0;
    }

    .talkList {
        display: flex;
        flex-wrap: wrap;
    }
`;

export interface talkBoxType {
    id: string;
    title: string;
    content: string;
    timestamp: string;
    mic: boolean;
}

const TalkPlaza = () => {
    const navigate = useNavigate();

    const [talkList, setTalkList] = useState<any>();
    const userCollection = collection(db, "communication");

    useEffect(() => {
        const getUser = async () => {
            const data = await getDocs(userCollection);
            setTalkList(data.docs.map((doc) => ({ ...doc.data() })));
        };
        getUser();
    }, []);

    return (
        <StyledTalkPlaza>
            <div className="plazaTitle">
                <h1>소통광장</h1>
                <div>자유롭게 소통할 수 있는 공간입니다</div>
            </div>
            <button className="createTalk" onClick={() => navigate("/createtalk")}>
                글쓰기
            </button>

            <div className="talkList">
                {talkList &&
                    talkList
                        .sort((a: any, b: any) => b.timestamp - a.timestamp)
                        .map((doc: any) => {
                            return <TalkBox key={doc.timestamp} doc={doc} />;
                        })}
            </div>
        </StyledTalkPlaza>
    );
};

export default TalkPlaza;
