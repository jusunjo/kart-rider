import styled from "styled-components";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { userType } from "../page/DetailUser";
import { useEffect, useState } from "react";
import { track } from "../metadata/track";
import { kartList } from "../metadata/kart";
import { stringify } from "querystring";
import axios from "axios";
import { addDetailMatch } from "../modules/userInfo";

const StyledRecordBox = styled.div`
    border: 3px solid #f5f5f5;
    background-color: #e1f5fe;

    margin-bottom: 10px;
    display: flex;
    .map {
        margin-right: 5%;
        img {
            width: 120px;
            height: 120px;
        }
    }

    .DetailInfo {
        width: 100%;
        .mapName {
            font-weight: 600;
            font-size: 20px;
            margin-bottom: 20px;
        }

        .win {
            font-size: 22px;
            font-weight: 900;
            color: #1976d2;
            span {
                font-size: 18px;
                font-weight: 400;
            }
        }

        .middle {
            font-size: 22px;
            font-weight: 900;
            color: gray;
            span {
                font-size: 18px;
                font-weight: 400;
            }
        }

        .lose {
            font-size: 22px;
            font-weight: 900;
            color: red;
            span {
                font-size: 18px;
                font-weight: 400;
            }
        }

        .DetailInfoRight {
            display: flex;
            align-items: center;
            font-size: 18px;

            .win,
            .middle,
            .lose {
                width: 40%;
            }

            .cart {
                width: 40%;
            }
            .lapTime {
                width: 30%;
            }
        }
    }
    .detailRank {
        display: flex;
        justify-content: center;

        .ranks {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-right: 2.5px;
            padding: 0 10px;

            .rank {
                margin-bottom: 10px;
            }

            .nickname {
                font-size: 14px;
            }

            .cartImg {
                width: 50px;
                margin-bottom: 10px;
            }
        }
    }
`;

type Track = { name: string; id: string };

const API_KEY = process.env.REACT_APP_API_KEY;

const RecordBox = ({ it }: { it: userType }) => {
    const [lapTime, setLapTime] = useState<string>();
    const [trackName, setTrackName] = useState<Track>();
    const [kartName, setKartName] = useState<string>();
    const [toggleFlag, setToggleFlag] = useState<boolean>(true);
    const [rank, setRank] = useState<any[]>([]);

    const calculLapTime = (time: string) => {
        let min: number = Number(time.substring(0, time.length - 3));
        let mil: number = Number(time.substring(time.length - 3, 3));
        let lapTime: string = `${Math.floor(min / 60)}:${("0" + (min % 60)).slice(-2)}:${mil}0`;

        return lapTime;
    };

    useEffect(() => {
        //lapTime 계산
        setLapTime(calculLapTime(it.player.matchTime));

        const trackName = track.filter((data) => data.id === it.trackId)[0];
        const kartName = kartList.filter((data) => data.id === it.player.kart)[0];

        setTrackName(trackName && trackName);
        setKartName(kartName && kartName.name);
    }, []);

    const handleClick = async () => {
        setToggleFlag(!toggleFlag);

        const detailMatch = toggleFlag
            ? await axios
                  .get(`matches/${it.matchId}`, {
                      headers: {
                          Authorization: `${API_KEY}`,
                      },
                  })
                  .then((res) => res.data.teams || res.data.players)
            : setRank([]);

        detailMatch &&
            detailMatch.forEach((it: any) => {
                if (it.teamId) {
                    it.players.forEach((data: any) => {
                        setRank((a: any) => [...a, data]);
                    });
                } else {
                    setRank((a) => [...a, it]);
                }
            });

        console.log("rank", rank);
        console.log(detailMatch);
    };

    return (
        <>
            <StyledRecordBox onClick={handleClick}>
                <Accordion style={{ width: "100%" }}>
                    <AccordionSummary
                        style={{ backgroundColor: Number(it.player.matchRank) < 4 ? "#e1f5fe" : Number(it.player.matchRank) === 5 ? "#eeeeee" : "#ffebee" }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <div className="map">
                            <img alt="map" src={process.env.PUBLIC_URL + `/assets/track/${trackName ? trackName.id : "questionMark"}.png`} />
                        </div>
                        <div className="DetailInfo">
                            <div className="mapName">{trackName ? trackName.name : "알수없음"}</div>
                            <div className="DetailInfoRight">
                                {it.player.matchRank === "99" ? (
                                    <div className="lose">RETIRE</div>
                                ) : (
                                    <div className={Number(it.player.matchRank) < 4 ? "win" : Number(it.player.matchRank) === 5 ? "middle" : "lose"}>
                                        {it.player.matchRank}위 <span>/ {it.playerCount}명</span>
                                    </div>
                                )}
                                <div className="cart">{kartName ? kartName : "알수없음"}</div>
                                <div className="lapTime">{it.player.matchRank === "99" ? <div className="lapTime">retire</div> : lapTime}</div>
                            </div>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography component="div">
                            <div className="detailRank">
                                {rank &&
                                    rank
                                        .sort((a, b) => a.matchRank - b.matchRank)
                                        .map((it: any, idx: number): any => {
                                            return (
                                                <div key={it.accountNo} className="ranks">
                                                    <div className="rank">{idx + 1}위</div>
                                                    <img src={`/assets/kart/${kartList.filter((data: any): any => data.id === it.kart)[0].id || "ㅎㅇ"}.png`} alt="kartImg" className="cartImg" />
                                                    <div className="nickname">{it.characterName}</div>
                                                    <div className="lapTime">{it.matchTime ? calculLapTime(it.matchTime) : "retire"}</div>
                                                </div>
                                            );
                                        })}
                            </div>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </StyledRecordBox>
        </>
    );
};

export default RecordBox;
