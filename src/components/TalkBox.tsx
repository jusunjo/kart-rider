import React, { useRef } from "react";
import { talkBoxType } from "../page/TalkPlaza";
import styled from "styled-components";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";

const StyledTalkBox = styled.div`
    border: 0.5px solid gray;
    padding: 15px 20px;
    width: 40%;
    height: 150px;
    margin: 20px auto;
    border-radius: 10px;
    background-color: #f5f5f5;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 9px 29px 0px;

    h3 {
        margin: 0;
        margin-bottom: 10px;
    }

    .talkBoxTop {
        display: flex;
    }

    .content {
        /* position: relative; */
        color: gray;
        margin-bottom: 70px;
        word-break: break-all;
    }

    .talkBoxBottom {
        display: flex;
        justify-content: space-between;

        .id {
            margin-right: 70px;
        }

        button {
            border: none;
            background-color: #64b5f6;
            border-radius: 10px;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 9px 29px 0px;
            color: white;
            cursor: pointer;
        }

        .copy {
            margin-right: 5px;
        }
    }
`;

const TalkBox = ({ doc }: { doc: talkBoxType }) => {
    const textInput = useRef<any>();

    const copy = () => {
        const el: any = textInput.current;
        el.select();
        document.execCommand("copy");
    };

    return (
        <>
            <StyledTalkBox>
                <div className="talkBoxTop">
                    <h3 className="title"> {doc.title}</h3>
                    {doc.mic ? <KeyboardVoiceIcon style={{ color: "#64b5f6", width: "20px", marginTop: "3px" }} /> : ""}
                </div>

                <div className="content">{doc.content}</div>
                <div className="talkBoxBottom">
                    <div ref={textInput} className="id">
                        {doc.id}
                    </div>
                    <div>
                        <button onClick={copy} className="copy">
                            복사하기
                        </button>
                        <button>전적보기</button>
                    </div>
                </div>
            </StyledTalkBox>
        </>
    );
};

export default TalkBox;
