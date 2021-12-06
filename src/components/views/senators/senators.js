import React, { useState, useEffect } from "react";
import { Select, Header, Image, Modal } from "semantic-ui-react";


import * as profileApi from '../../../api/profile.api';
import ProfileCard from "../../common/profileCard/profileCard";
import ModalCard from "../../common/modalCard/modalCard";

const Senators = () => {

    const [usersState, setUserState] = useState({
        data: [],
        per: 8,
        page: 1,
        total_pages: null
    });

    const [partyFilter, setPartyFilter] = useState({});
    const [countyFilter, setCountyFilter] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState({
        name: {
            first: '',
            last: ''
        },
        email: '',
        dob: {
            date: '',
            age: ''
        },
        nat: '',
        picture: {
            large: ''
        },
        location: {
            city: '',
            state: ''
        }
    });



    const loadData = async () => {
        const { per, page, data } = usersState;
        const result = await profileApi.getProfile(per, page);

        setUserState({
            data: [...data, ...result.results],
            scrolling: false,
            total_pages: result.info.results,
            page: result.info.page + 1,
            per: 8
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

    const onChangePartyHandler = (e) => {
        const party = dummyParties.filter(party => {
            return party.text === e.target.textContent;
        })

        setPartyFilter(party[0]);
    }

    const onChangecountyHandler = (e) => {
        const county = dummyCounties.filter(county => {
            return county.text === e.target.textContent;
        })

        setCountyFilter(county[0]);
    }

    const handleOnCardClick = (e) => {
        const card = e.target.closest('.card');

        setModalData(usersState.data[card.getAttribute('data-key')]);
        setOpenModal(true);
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <div className="profiles-container">
                <p>Filter</p>
                <div className="ui equal grid">
                    <div>
                        <Select
                            options={dummyParties}
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
                        <ProfileCard data={data} index={index} handleOnCardClick={handleOnCardClick} />
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
