import React from "react";
import styled from "styled-components";

const StyledPersonalityTest = styled.div`
    .test {
        border: 1px solid black;
        width: 300px;
    }
`;

const PersonalityTest = () => {
    return (
        <StyledPersonalityTest>
            PersonalityTest
            <div className="test">
                <p>PersonalityTestPersonalityTestPersonalityTestPersonality</p>
            </div>
        </StyledPersonalityTest>
    );
};

export default PersonalityTest;
