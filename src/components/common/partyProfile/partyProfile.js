import React from "react";

const PartyProfile = props => {
    const { data } = props;

    return (
        <div key={data.id}>
            <h1>
                {data.name}
            </h1>

            <div className="party-profile-info">
                <p>
                    {data.abbreviation}
                </p>
                <p>
                    {data.totalMembers}
                </p>
                <p>
                    {data.president}
                </p>
                <p>
                    {data.secretaryGeneral}
                </p>
                <p>
                    {data.firstVicePresident}
                </p>
                <p>
                    {data.ministers}
                </p>
            </div>
        </div>
    )
};

export default PartyProfile;