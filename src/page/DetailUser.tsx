import { Tabs, ToggleButton, ToggleButtonGroup } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../components/Footer";
import RecordBox from "../components/RecordBox";
import { getDoc, doc } from "firebase/firestore/lite";
import { db } from "../firebase_config";
const StyledDetailUser = styled.div`
    width: 85%;
`;

const Profile = styled.div`
    margin-top: 80px;
    height: 180px;
    border: 3px solid #f5f5f5;
    border-left: 4px solid #1976d2;
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    .characterImg {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 150px;
        margin-right: 5%;
        margin-left: 1%;
    }

    .nickname {
        margin-bottom: 30px;
        font-weight: 900;
        font-size: 35px;
    }
`;


export interface userType {
    accountNo: string;
    channelName: string;
    character: string;
    endTime: string;
    matchId: string;
    matchResult: string;
    matchType: string;
    player: {
        accountNo: string;
        character: string;
        characterName: string;
        flyingPet: string;
        kart: string;
        license: string;
        matchRank: string;
        matchRetired: string;
        matchTime: string;
        matchWin: string;
        partsEngine: string;
        partsHandle: string;
        partsKit: string;
        partsWheel: string;
        pet: string;
        rankinggrade2: string;
    };
    playerCount: number;
    seasonType: string;
    startTime: string;
    teamId: string;
    trackId: string;
}

const API_KEY = process.env.REACT_APP_API_KEY;

const DetailUser = (): JSX.Element => {
    const userInfo = useSelector((it: any) => it.userInfo.userInfo);

    const record = useSelector((it: any) => it.userInfo.searchWord);

    console.log(record)

    const [mapList, setMapList] = useState<userType[]>([]);
    const [alignment, setAlignment] = useState<string>("all");
    const [filterList, setFilterList] = useState<any>([]);

    useEffect(() => {
        userInfo.matches.forEach((data: any) => {
            data.matches.forEach((it: any) => {
                setMapList((a) => [...a, it]);
            });
        });
    }, []);



    useEffect(() => {
        if (alignment === "all") {
            setFilterList(mapList);
        } else if (alignment === "team") {
            console.log("team");
        } else {
            console.log("solo");
        }
    }, [alignment]);

    const ChangeTeamOption = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
        setAlignment(newAlignment);
    };



    return (
        <>
            <StyledDetailUser>
                <Profile>
                    <img
                        src="https://w.namu.la/s/b027f0401ced567f156bd30d7e2fd56822a6fd6e3d7538dcddbb8394b26564661521a226def656033e510e0c28d0a5b70c25b0d41e745e731d63e49524aad0bb5d1c78f37aba20be761745d7e360bf97"
                        alt="characterImg"
                        className="characterImg"
                    />
                    <div>
                        <div className="nickname">{userInfo.nickName}</div>
                        <ToggleButtonGroup style={{ height: "30px" }} color="primary" value={alignment} exclusive onChange={ChangeTeamOption}>
                            <ToggleButton value="all">전체</ToggleButton>
                            <ToggleButton value="team">팀전</ToggleButton>
                            <ToggleButton value="solo">개인전</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                </Profile>
                {mapList.length > 0 ? (
                    mapList.map((it) => {
                        return <RecordBox it={it} key={it.matchId} />;
                    })
                ) : (
                    <div>데이터가 없습니다</div>
                )}
            </StyledDetailUser>
        </>
    );
};

export default DetailUser;
