import React, { useState, useEffect } from "react";
import { Grid, Menu, Select } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

import PieChart from '../../common/pieChart/pieChart';
import ProfileCard from "../../common/profileCard/profileCard";
import ModalCard from "../../common/modalCard/modalCard";

import * as service from '../../../api/service.api';

const County = () => {
    const [parliamentarians, setParliamentarians] = useState([{}]);
    const [county, setCounty] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState();
    const { id } = useParams();

    const data = [{
        id: 2,
        text: '2020 - 2024',
        value: 2
    }];

    const generateRandomData = () => {
        const data = [{
            party: "PNL",
            sales: Math.floor(Math.random() * 10)
        }, {
            party: "PSD",
            sales: Math.floor(Math.random() * 10)
        }, {
            party: "USR",
            sales: Math.floor(Math.random() * 10)
        }, {
            party: "AUR",
            sales: Math.floor(Math.random() * 10)
        }];

        return data;
    }

    const handleOnCardClick = async (e) => {
        const card = e.target.closest('.card');
        const user = parliamentarians.filter(parliamentar => {
            return parliamentar.id == card.getAttribute('data-key');
        });
        const senator = await service.getDeputiesById(9, user[0].id);

        setModalData(senator);
        setOpenModal(true);
    }

    const loadData = async () => {
        let data = [], parties = [];
        const result = await service.getDeputies();
        const counties = await service.getDeputiesByCounty(9);

        const countyId = id.replace('ro_', '');
        const countyParliamentarians = result.filter(county => {
            return county.circumscription.number == countyId;
        });

        countyParliamentarians.map(parlam => {
            data.push(parlam.id);
            if (parties.indexOf(parlam.party.abbreviation) == -1)
                parties.push(parlam.party.abbreviation);
        })
        // const parties = await service.getPartiesPerCounty(9, data);
        console.log(parties);

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

                <Grid columns='equal' className="pie-charts-list">
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            Proiecte de hotărâri
                            <PieChart data={generateRandomData()} id='pie-chart-1' />
                        </Grid.Column>
                        <Grid.Column>
                            Inițiative legislative
                            <PieChart data={generateRandomData()} id='pie-chart-2' />
                        </Grid.Column>
                        <Grid.Column>
                            Întrebări
                            <PieChart data={generateRandomData()} id='pie-chart-3' />
                        </Grid.Column>
                        <Grid.Column>
                            Moțiuni semnate
                            <PieChart data={generateRandomData()} id='pie-chart-4' />
                        </Grid.Column>
                        <Grid.Column>
                            Discursuri
                            <PieChart data={generateRandomData()} id='pie-chart-5' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <div className="profiles-container">
                    <Grid>
                        <Grid.Row columns={5}>
                            {parliamentarians ? parliamentarians.map((data, index) => (
                                <ProfileCard key={index} data={data} index={index} handleOnCardClick={handleOnCardClick} />
                            )) : null}
                        </Grid.Row>
                    </Grid>
                </div>
                <ModalCard openModal={openModal} setOpenModal={setOpenModal} modalData={modalData} />
            </div>
        </>
    );
}

export default County;