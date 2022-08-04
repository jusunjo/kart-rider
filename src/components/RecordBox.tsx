import styled from "styled-components";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";

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
        .rank {
            font-size: 22px;
            font-weight: 900;
            color: #1976d2;
            span {
                font-size: 18px;
                font-weight: 400;
            }
        }

        .DetailInfoRight {
            display: flex;
            align-items: center;
            font-size: 18px;

            .rank {
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
            /* border-right: 1px solid black */
        }
    }
`;

const StyledRetireBox = styled.div`
    border: 3px solid #f5f5f5;
    background-color: #ffebee;
    padding: 15px;
    display: flex;
    .map {
        margin-right: 5%;
        img {
            width: 120px;
            height: 120px;
        }
    }

    .DetailInfo {
        .mapName {
            font-weight: 600;
            font-size: 20px;
            margin-bottom: 20px;
        }
        .rank {
            font-size: 22px;

            span {
                font-size: 18px;
            }
        }
    }
`;

const RecordBox = () => {
    const userInfo = useSelector((it: any) => it.userInfo.userInfo);

    return (
        <>
            <StyledRecordBox>
                <Accordion>
                    <AccordionSummary style={{ backgroundColor: "#e1f5fe" }} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <div className="map">
                            <img alt="map" src="http://storage.nexon.com/Data02/GnxFile/002/037/000/06/30/9007358169161153.jpg" />
                        </div>
                        <div className="DetailInfo">
                            <div className="mapName">차이나 동방명주</div>
                            <div className="DetailInfoRight">
                                <div className="rank">
                                    1위 <span>/ 8명</span>
                                </div>
                                <div className="cart">스펙터x</div>
                                <div className="lapTime">01:30:23</div>
                            </div>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography component="div">
                            <div className="detailRank">
                                <div className="ranks">
                                    <div className="rank">1위</div>
                                    <div className="cartImg">카트이미지</div>
                                    <div className="nickname">닉네임</div>
                                    <div className="lapTime">01:23:11</div>
                                </div>
                                <div className="ranks">
                                    <div className="rank">1위</div>
                                    <div className="cartImg">카트이미지</div>
                                    <div className="nickname">닉네임</div>
                                    <div className="lapTime">01:23:11</div>
                                </div>
                                <div className="ranks">
                                    <div className="rank">1위</div>
                                    <div className="cartImg">카트이미지</div>
                                    <div className="nickname">닉네임</div>
                                    <div className="lapTime">01:23:11</div>
                                </div>
                                <div className="ranks">
                                    <div className="rank">1위</div>
                                    <div className="cartImg">카트이미지</div>
                                    <div className="nickname">닉네임</div>
                                    <div className="lapTime">01:23:11</div>
                                </div>
                                <div className="ranks">
                                    <div className="rank">1위</div>
                                    <div className="cartImg">카트이미지</div>
                                    <div className="nickname">닉네임</div>
                                    <div className="lapTime">01:23:11</div>
                                </div>
                                <div className="ranks">
                                    <div className="rank">1위</div>
                                    <div className="cartImg">카트이미지</div>
                                    <div className="nickname">닉네임</div>
                                    <div className="lapTime">01:23:11</div>
                                </div>
                                <div className="ranks">
                                    <div className="rank">1위</div>
                                    <div className="cartImg">카트이미지</div>
                                    <div className="nickname">닉네임</div>
                                    <div className="lapTime">01:23:11</div>
                                </div>
                                <div className="ranks">
                                    <div className="rank">1위</div>
                                    <div className="cartImg">카트이미지</div>
                                    <div className="nickname">닉네임</div>
                                    <div className="lapTime">01:23:11</div>
                                </div>
                            </div>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </StyledRecordBox>
            {/* <StyledRetireBox>
                <div className="map">
                    <img src="http://storage.nexon.com/Data02/GnxFile/002/037/000/06/30/9007358169161153.jpg" />
                </div>
                <div className="DetailInfo">
                    <div className="mapName">차이나 동방명주</div>
                    <div className="rank">Retire</div>
                    <div>스펙터x</div>
                    <div>-</div>
                </div>
            </StyledRetireBox> */}
        </>
    );
};

export default RecordBox;
