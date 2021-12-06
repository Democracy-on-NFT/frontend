import React, { useState, useEffect } from "react";
import { Grid, Menu, Select } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

import PieChart from '../../common/pieChart/pieChart';
import ProfileCard from "../../common/profileCard/profileCard";
import ModalCard from "../../common/modalCard/modalCard";
import countiesPath from '../../utils/countiesPath.json';
import countiesName from '../../utils/countiesName.json';

import * as profileApi from '../../../api/profile.api';

const County = props => {

    const [usersState, setUserState] = useState({
        data: [],
        per: 8,
        page: 1,
        total_pages: null
    });

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
    const { id } = useParams();

    const data = [{
        id: 1,
        text: '2018 - 2020',
        value: 1
    }, {
        id: 2,
        text: '2020 - 2022',
        value: 2
    }];

    console.log('id: ', id);

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
            <div className="county-container">
                <Grid columns='equal'>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <Menu fluid vertical>
                                <Menu.Item className='header'>{countiesName[id]}</Menu.Item>
                            </Menu>
                        </Grid.Column>
                        <Grid.Column textAlign='center'>
                            <Menu fluid vertical>
                                <Menu.Item className='header'>Parlamentari: 7</Menu.Item>
                                <Menu.Item>Deputați: 5</Menu.Item>
                                <Menu.Item>Senatori: 2</Menu.Item>
                            </Menu>
                        </Grid.Column>
                        <Grid.Column textAlign='right' className="aligned">
                            <Menu fluid vertical>
                                <Menu.Item className='header'>
                                    Mandate <Select options={data} />
                                </Menu.Item>
                            </Menu>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                {/* <svg width="500" height="500">
                    <g>
                        <path className="land" id="ro_1" fill="#FAFDFF" stroke="#BCC5CC" d="M0.082,0.375 C0,0.39,0,0.533,0.082,0.542 S0.106,0.586,0.172,0.619 C0.293,0.679,0.096,0.792,0.215,0.831 C0.239,0.839,0.268,0.946,0.249,0.981 C0.571,1,0.468,0.938,0.573,0.835 S0.712,0.811,0.745,0.786 S0.679,0.749,0.783,0.655 S0.953,0.584,0.97,0.563 C0.987,0.542,0.972,0.433,0.949,0.413 C0.891,0.363,1,0.309,0.949,0.255 C0.859,0.167,1,0.253,1,0.141 C0.976,0.102,1,0.079,0.931,0.043 C0.89,0.086,0.818,0.041,0.738,0.075 C0.637,0.118,0.45,0,0.415,0.038 S0.348,0.013,0.313,0.092 S0.204,0.073,0.18,0.178 S0.084,0.25,0.082,0.3 S0.164,0.36,0.082,0.375"></path>
                    </g>
                </svg> */}
                {/* <svg className="svg">
                    <path d="M0.082,0.375 C0,0.39,0,0.533,0.082,0.542 S0.106,0.586,0.172,0.619 C0.293,0.679,0.096,0.792,0.215,0.831 C0.239,0.839,0.268,0.946,0.249,0.981 C0.571,1,0.468,0.938,0.573,0.835 S0.712,0.811,0.745,0.786 S0.679,0.749,0.783,0.655 S0.953,0.584,0.97,0.563 C0.987,0.542,0.972,0.433,0.949,0.413 C0.891,0.363,1,0.309,0.949,0.255 C0.859,0.167,1,0.253,1,0.141 C0.976,0.102,1,0.079,0.931,0.043 C0.89,0.086,0.818,0.041,0.738,0.075 C0.637,0.118,0.45,0,0.415,0.038 S0.348,0.013,0.313,0.092 S0.204,0.073,0.18,0.178 S0.084,0.25,0.082,0.3 S0.164,0.36,0.082,0.375"></path>
                </svg> */}
                <div className="profiles-container">
                    <div className="ui equal grid">
                        {usersState.data ? usersState.data.map((data, index) => (
                            <ProfileCard data={data} index={index} handleOnCardClick={handleOnCardClick} />
                        )) : null}
                    </div>
                </div>
                <ModalCard openModal={openModal} setOpenModal={setOpenModal} modalData={modalData} />

                <PieChart />
            </div>
        </>
    );
}

export default County;