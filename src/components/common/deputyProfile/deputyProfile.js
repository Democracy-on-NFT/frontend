import React from "react";

const DeputyProfile = props => {
    const { name, party } = props;
    return (
        <>
            <h1 className>
                {name} - {party}
            </h1>
        </>
    )
};

export default DeputyProfile;