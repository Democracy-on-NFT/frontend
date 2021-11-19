import React, { useState, useEffect } from "react";
import { Select, Header, Image, Modal } from "semantic-ui-react";
import Icon from '@mdi/react';
import { mdiMapMarkerRadius, mdiEmail } from '@mdi/js';

import * as profileApi from '../../../api/profile.api';

const UserCards = () => {

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

    const uppercase = word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

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
                        <div className="four wide column">
                            <div className="card" key={index.toString()} data-key={index.toString()} onClick={handleOnCardClick}>
                                <div className="card-body">
                                    <div className="avatar">
                                        <img
                                            src={data.picture.large}
                                            className="card-img-top"
                                            alt=""
                                        />
                                    </div>

                                    <h5 className="card-title">
                                        {uppercase(data.name.first) +
                                            " " +
                                            uppercase(data.name.last)}
                                    </h5>

                                    <p className="card-text">
                                        {data.location.city +
                                            ", " +
                                            uppercase(data.location.state)}
                                        <br />
                                        <span className="phone">{data.phone}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
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
                <Modal
                    closeIcon
                    onClose={() => setOpenModal(false)}
                    onOpen={() => setOpenModal(true)}
                    open={openModal}
                >
                    <Modal.Header>Parlamentar</Modal.Header>
                    <Modal.Content image>
                        <Image size='medium' src={modalData.picture.large} wrapped />
                        <Modal.Description>
                            <Header>{modalData.name.first} {modalData.name.last} </Header>
                            <p>
                            <Icon path={mdiEmail}
                                    size={1} />
                                {modalData.email}
                            </p>
                            <p>{modalData.nat}</p>
                            <p>{modalData.dob.age}</p>
                            <p>
                                <Icon path={mdiMapMarkerRadius}
                                    size={1} />
                                {modalData.location.city}, {modalData.location.state}
                            </p>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        </>
    );
}

export default UserCards;
