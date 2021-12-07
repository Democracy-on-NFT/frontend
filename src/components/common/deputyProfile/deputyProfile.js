import React, { useEffect, useState } from "react";

import * as profileApi from '../../../api/profile.api';

const DeputyProfile = props => {
    const { data } = props;

    const [deputy, setDeputy] = useState({});

    const getAge = (dateString) => {
        const today = new Date();
        const birthDate = new Date(dateString);
        const age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const loadData = async () => {
        const result = await profileApi.getDeputiesById(9, data.id);

        console.log(result)

        setDeputy(result);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div key={data.id}>
            <div className="deputy-profile-info">
                <p>
                    {deputy.date_of_birth ? getAge(deputy.date_of_birth) : '-'}
                </p>
                <p>
                    {deputy.activities ? deputy.activities[0].electoral_circumscription.county_name : '-'}
                </p>
                <p>
                    {deputy.parties && deputy.parties[1] ? deputy.parties[1].party.abbreviation : '-'}
                </p>
                <p>
                    
                    {deputy.parties && deputy.parties[0] ? deputy.parties[0].party.abbreviation : '-'}
                </p>
            </div>
        </div>
    )
};

export default DeputyProfile;