import React, { useState, useEffect } from "react";
import { Grid, Menu, Select } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

import PieChart from '../../common/pieChart/pieChart';
import ProfileCard from "../../common/profileCard/profileCard";
import ModalCard from "../../common/modalCard/modalCard";

import * as profileApi from '../../../api/profile.api';

const County = () => {
    const [parliamentarians, setParliamentarians] = useState([{}]);
    const [county, setCounty] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState();
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

    const handleOnCardClick = async (e) => {
        const card = e.target.closest('.card');
        const user = parliamentarians.filter(parliamentar => {
            return parliamentar.id == card.getAttribute('data-key');
        });
        const senator = await profileApi.getDeputiesById(9, user[0].id);

        setModalData(senator);
        setOpenModal(true);
    }

    const loadData = async () => {
        const result = await profileApi.getDeputies();
        const counties = await profileApi.getDeputiesByCounty(9);

        const countyId = id.replace('ro_', '');
        const countyParliamentarians = result.filter(county => {
            return county.circumscription.number == countyId;
        });

        setCounty(counties[countyId]);
        setParliamentarians(countyParliamentarians);
    };

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
                                <Menu.Item className='header'>{county ? county.county_name : null}</Menu.Item>
                            </Menu>
                        </Grid.Column>
                        <Grid.Column textAlign='center'>
                            <Menu fluid vertical>
                                <Menu.Item className='header'>Parlamentari: {county ? county.deputati + county.senatori : null}</Menu.Item>
                                <Menu.Item>Deputați: {county ? county.deputati : null}</Menu.Item>
                                <Menu.Item>Senatori: {county ? county.senatori : null}</Menu.Item>
                            </Menu>
                        </Grid.Column>
                        <Grid.Column textAlign='right' className="aligned">
                            <Menu fluid vertical>
                                <Menu.Item className='header'>
                                    Mandate <Select options={data} defaultValue={data[data.length - 1].value} />
                                </Menu.Item>
                            </Menu>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <div className="profiles-container">
                    <div className="ui equal grid">
                        {parliamentarians ? parliamentarians.map((data, index) => (
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