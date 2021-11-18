import React from "react";

const DeputyProfile = props => {
    const { data } = props;

    return (
        <div key={data.id}>
            <h1>
                {data.name} - {data.currentParty}
            </h1>

            <div className="deputy-profile-info">
                <p>
                    {data.age}
                </p>
                <p>
                    {data.county}
                </p>
                <p>
                    {data.previousParty}
                </p>
                <p>
                    {data.currentParty}
                </p>
            </div>
        </div>
    )
};

export default DeputyProfile;