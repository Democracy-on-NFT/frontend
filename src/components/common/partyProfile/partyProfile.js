import React from "react";

const PartyProfile = props => {
    const { data } = props;

    return (
        <div className="party-profile" key={data.id}>
            <h1>
                {data.name}
            </h1>

            <div className="party-profile-info">
                <p>
                    {data.abbreviation || '-'}
                </p>
                <p>
                    {data.president || '-'}
                </p>
                <p>
                    {data.senators || '-'}
                </p>
                <p>
                    {data.deputati || '-'}
                </p>
                <p>
                    {data.ministers || '-'}
                </p>
            </div>
        </div>
    )
};

export default PartyProfile;