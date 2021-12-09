import React from "react";

const DeputyProfile = props => {
    const { data } = props;
    const getAge = (dateString) => {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const uppercase = word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    return (
        <div key={data.id}>
            <div className="deputy-profile-info">
                <p>
                    {data.room ? uppercase(data.room) : '-'}
                </p>
                <p>
                    {data.date_of_birth ? getAge(data.date_of_birth) : '-'}
                </p>
                <p>
                    {data.activities ? data.activities[0].electoral_circumscription.county_name : '-'}
                </p>
                <p>
                    {data.parties && data.parties[data.parties.length - 1] ? data.parties[data.parties.length - 1].party.abbreviation : '-'}
                </p>
                <p>
                    {data.parties && data.parties[data.parties.length - 2] ? data.parties[data.parties.length - 2].party.abbreviation : '-'}
                </p>
            </div>
        </div>
    )
};

export default DeputyProfile;
