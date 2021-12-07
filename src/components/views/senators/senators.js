import React, { useState, useEffect } from "react";
import { Select, Header, Image, Modal } from "semantic-ui-react";


import * as profileApi from '../../../api/profile.api';
import ProfileCard from "../../common/profileCard/profileCard";
import ModalCard from "../../common/modalCard/modalCard";

const Senators = () => {

    const [usersState, setUserState] = useState({
        data: []
    });

    const [partyFilter, setPartyFilter] = useState([{}]);
    const [countyFilter, setCountyFilter] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState();



    const loadData = async () => {
        const { per, page, data } = usersState;
        const result = await profileApi.getDeputies();

        console.log(result);

        setUserState({
            data: result
        });
    };

    const dummyParties = [{
        text: 'Partidul National Liberal',
        value: 'pnl',
        key: 'pnl'
    },
    {
        text: 'Partidul Social Democrat',
        value: 'psd',
        key: 'psd'
    }];

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
        // const filteredSenators = usersState.filter(party => {
        //     return party.text === e.target.textContent;
        // })

        // console.log(filteredSenators)

        
        // setPartyFilter(filteredSenators[0]);
    }

    const onChangecountyHandler = (e) => {
        const county = dummyCounties.filter(county => {
            return county.text === e.target.textContent;
        })

        console.log(county)

        setCountyFilter(county[0]);
    }

    const handleOnCardClick = async (e) => {
        const card = e.target.closest('.card');

        const user = usersState.data[card.getAttribute('data-key')];
        
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
                    {usersState.data ? usersState.data.map((data, index) => (
                        <ProfileCard key={index} id={index} data={data} index={index} handleOnCardClick={handleOnCardClick} />
                    )) : null}
                </div>
                {/* <button
                className="btn btn-light btn-block mx-auto"
                onClick={e => {
                    loadData();
                }}
            >
                Load More Users
            </button> */}
                <ModalCard openModal={openModal} setOpenModal={setOpenModal} modalData={modalData} />
            </div>
        </>
    );
}

export default Senators;
