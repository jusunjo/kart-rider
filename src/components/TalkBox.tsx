import React, { useRef } from "react";
import { talkBoxType } from "../page/TalkPlaza";
import styled from "styled-components";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import copy from "copy-to-clipboard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addInfo, recordSearchWord, user } from "../modules/userInfo";
import { useNavigate } from "react-router-dom";
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
        height: 90px;
        /* margin-bottom: 70px; */
        word-break: break-all;
    }

    .talkBoxBottom {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .id {
            margin-right: 70px;
        }

        button {
            border: none;
            background-color: #64b5f6;
            border-radius: 30px;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 9px 29px 0px;
            color: white;
            cursor: pointer;
            padding: 5px 10px;
            font-size: 11px;
        }

        .copy {
            margin-right: 5px;
        }
    }
`;

const API_KEY = process.env.REACT_APP_API_KEY;

const TalkBox = ({ doc }: { doc: talkBoxType }) => {
    const textInput = useRef<any>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCopyClipBoard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);

            alert("복사 성공!");
        } catch (error) {
            alert("복사 실패!");
        }
    };

    const handleSearchUser = async (id: string) => {
        if (id) {
            //닉네임 입력 후 api 호출
            try {
                const response = await axios.get(`/users/nickname/${id}/`, {
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
                dispatch(recordSearchWord(id));
            } catch (e) {
                return alert("라이더를 찾을 수 없습니다.");
            }
        } else {
            alert("라이더명을 입력해주세요");
        }
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
                        <button onClick={() => handleCopyClipBoard(doc.id)} className="copy">
                            복사하기
                        </button>
                        <button onClick={() => handleSearchUser(doc.id)}>전적보기</button>
                    </div>
                </div>
            </StyledTalkBox>
        </>
    );
};

export default TalkBox;
