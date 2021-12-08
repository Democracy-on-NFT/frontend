import React, { useState, useEffect } from "react";
import { Select, Header, Image, Modal } from "semantic-ui-react";


import * as profileApi from '../../../api/profile.api';
import ProfileCard from "../../common/profileCard/profileCard";
import ModalCard from "../../common/modalCard/modalCard";

const Senators = () => {

    const [usersState, setUserState] = useState({
        data: []
    });

    const [filterByParty, setFilterByParty] = useState();
    const [filterByCounty, setFilterByCounty] = useState();
    const [filterByPartyAndCounty, setFilterByPartyAndCounty] = useState();
    const [partyFilter, setPartyFilter] = useState([{}]);
    const [countyFilter, setCountyFilter] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState();

    const loadData = async () => {
        const { per, page, data } = usersState;
        const result = await profileApi.getDeputies();

        console.log(result);

        setUserState(result);
    };

    const dummyCounties = [{
        text: 'Suceava',
        value: 1,
        key: 1
    },
    {
        text: 'Botosani',
        value: 2,
        key: 2
    }];

    const onChangePartyHandler = async (e) => {
        const filteredSenators = usersState.filter(user => {
            return user.party.abbreviation === e.target.textContent;
        })

        console.log(filteredSenators)

        setFilterByParty(filteredSenators);


        // setPartyFilter(filteredSenators[0]);
    }

    const onChangecountyHandler = (e) => {
        const county = dummyCounties.filter(county => {
            return county.text === e.target.textContent;
        })

        // console.log(county)

        setCountyFilter(county[0]);
    }

    const handleOnCardClick = async (e) => {
        const card = e.target.closest('.card');

        const user = usersState[card.getAttribute('data-key')];

        const result = await profileApi.getDeputiesById(9, user.id);

        setModalData(result);
        setOpenModal(true);
    }

    useEffect(async () => {
        const parties = await profileApi.getParties();
        parties.map(party => {
            party.text = party.abbreviation;
            party.value = party.id;
        });
        console.log(parties);
        setPartyFilter(parties);
        loadData();
    }, []);

    return (
        <>
            <div className="profiles-container">
                <p>Filter</p>
                <div className="ui equal grid">
                    <div>
                        <Select
                            options={partyFilter}
                            placeholder="Select party"
                            onChange={onChangePartyHandler}
                        // value={partyFilter.value}
                        />
                    </div>

                    <div>
                        <Select
                            options={dummyCounties}
                            placeholder="Select county"
                            onChange={onChangecountyHandler}
                        // value={countyFilter}
                        />
                    </div>
                </div>

                <div className="ui equal grid">
                    {!filterByParty && !filterByCounty && usersState.length ? usersState.map((data, index) => (
                        <ProfileCard key={index} id={index} data={data} index={index} handleOnCardClick={handleOnCardClick} />
                    )) : null}

                    {filterByParty && !filterByCounty && usersState.length ? filterByParty.map((data, index) => (
                        <ProfileCard key={index} id={index} data={data} index={index} handleOnCardClick={handleOnCardClick} />
                    )) : null}
                    {!filterByParty && filterByCounty && usersState.length ? filterByCounty.map((data, index) => (
                        <ProfileCard key={index} id={index} data={data} index={index} handleOnCardClick={handleOnCardClick} />
                    )) : null}

                    {filterByParty && filterByCounty && usersState.length ? filterByPartyAndCounty.map((data, index) => (
                        <ProfileCard key={index} id={index} data={data} index={index} handleOnCardClick={handleOnCardClick} />
                    )) : null}
                </div>

                <ModalCard openModal={openModal} setOpenModal={setOpenModal} modalData={modalData} />
            </div>
        </>
    );
}

export default Senators;
