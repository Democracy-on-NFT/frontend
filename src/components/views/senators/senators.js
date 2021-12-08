import React, { useState, useEffect } from "react";
import { Select } from "semantic-ui-react";

import ProfileCard from "../../common/profileCard/profileCard";
import ModalCard from "../../common/modalCard/modalCard";

import * as profileApi from '../../../api/profile.api';

const Senators = () => {
    const [senators, setSenators] = useState();
    const [filterByParty, setFilterByParty] = useState();
    const [filterByCounty, setFilterByCounty] = useState();
    const [partyFilter, setPartyFilter] = useState([{}]);
    const [countyFilter, setCountyFilter] = useState([{}]);
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState();

    const onChangePartyHandler = (e) => {
        setFilterByParty(e.target.textContent);
    }

    const onChangecountyHandler = (e) => {
        setFilterByCounty(e.target.textContent);
    }

    const handleOnCardClick = async (e) => {
        const card = e.target.closest('.card');
        const user = senators.filter(senator => {
            return senator.id == card.getAttribute('data-key');
        });
        const senator = await profileApi.getDeputiesById(9, user[0].id);

        setModalData(senator);
        setOpenModal(true);
    }

    const filterUsers = (users) => {
        let filteredUsers = users;
        if (filterByParty) {
            filteredUsers = filteredUsers.filter(user => {
                return filterByParty === user.party.abbreviation
            })
        }

        if (filterByCounty) {
            filteredUsers = filteredUsers.filter(user => {
                return filterByCounty === user.circumscription.county_name
            })
        }

        return filteredUsers;
    }

    const loadData = async () => {
        const members = await profileApi.getDeputies();
        const parties = await profileApi.getParties();
        const counties = await profileApi.getCounties();

        const senators = members.filter(member => {
            return member.room == 'senator';
        })

        parties.map(party => {
            party.text = party.abbreviation;
            party.value = party.id;
        });
        counties.map(county => {
            county.text = county.county_name;
            county.value = county.id;
        });

        setSenators(senators);
        setPartyFilter(parties);
        setCountyFilter(counties);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <div className="profiles-container">
                <p>Filtru</p>
                <div className="ui equal grid">
                    <div>
                        <Select
                            selection
                            options={partyFilter}
                            placeholder="După partid"
                            onChange={onChangePartyHandler}
                        />
                    </div>

                    <div>
                        <Select
                            selection
                            options={countyFilter}
                            placeholder="După județ"
                            onChange={onChangecountyHandler}
                        />
                    </div>
                </div>

                <div className="ui equal grid">
                    {senators ? filterUsers(senators).map((user) => (
                        <ProfileCard key={user.id} id={user.id} data={user} handleOnCardClick={handleOnCardClick} />
                    )) : null}
                </div>

                <ModalCard openModal={openModal} setOpenModal={setOpenModal} modalData={modalData} />
            </div>
        </>
    );
}

export default Senators;
