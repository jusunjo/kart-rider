import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore/lite";
import { db } from "../firebase_config";
import { useNavigate } from "react-router-dom";
import TalkBox from "../components/TalkBox";

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
        <div>
            {talkList &&
                talkList.map((doc: any) => {
                    return <TalkBox key={doc.timestamp} doc={doc} />;
                })}
            <button onClick={() => navigate("/createtalk")}>글쓰기</button>
        </div>
    );
};

export default TalkPlaza;
