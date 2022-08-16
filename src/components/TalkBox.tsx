import React from "react";
import { talkBoxType } from "../page/TalkPlaza";
import styled from "styled-components";

const StyledTalkBox = styled.div`
    border: 1px solid black;
    padding: 15px;
    width: 90%;
    margin: 30px auto;
`;

const TalkBox = ({ doc }: { doc: talkBoxType }) => {
    return (
        <StyledTalkBox>
            <div>제목 : {doc.title}</div>
            <div>라이더명 : {doc.id}</div>
            <div>내용 : {doc.content}</div>
            <div>마이크 : {doc.mic ? "가능" : "불가능"}</div>
        </StyledTalkBox>
    );
};

export default TalkBox;
