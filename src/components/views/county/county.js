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
        const result = await profileApi.getDeputies();

        setUserState({
            data: result
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

    const pieData = [{
        party: "PNL",
        sales: 3
    }, {
        party: "PSD",
        sales: 2
    }, {
        party: "USR",
        sales: 1
    }, {
        party: "AUR",
        sales: 1
    }];

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
                                    Mandate <Select options={data} defaultValue={data[data.length-1].value} />
                                </Menu.Item>
                            </Menu>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <div className="profiles-container">
                    <div className="ui equal grid">
                        {usersState.data ? usersState.data.map((data, index) => (
                            <ProfileCard key={index} data={data} index={index} handleOnCardClick={handleOnCardClick} />
                        )) : null}
                    </div>
                </div>
                <ModalCard openModal={openModal} setOpenModal={setOpenModal} modalData={modalData} />

                <PieChart data={pieData} />
            </div>
        </>
    );
}

export default County;