import React from 'react';
import { useState, useEffect } from 'react';
import { Grid, Menu, Select } from 'semantic-ui-react';

import PieChart from '../../common/pieChart/pieChart';
import PartyCard from "../../common/partyCard/partyCard";

import * as service from '../../../api/service.api';

const Parties = () => {
    const [total, setTotal] = useState();
    const [parties, setParties] = useState([{}]);
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
        }, {
            party: "UDMR",
            sales: Math.floor(Math.random() * 10)
        }, {
            party: "MIN",
            sales: Math.floor(Math.random() * 10)
        }, {
            party: "NA",
            sales: Math.floor(Math.random() * 10)
        }];

        return data;
    }

    const loadData = async () => {
        const parties = await service.getParties();
        // const counties = await service.getPartiesActivity(9);

        console.log('Partide', parties);
        // console.log('County', counties);

        setParties(parties);
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
                                <Menu.Item className='header'>Partide politice</Menu.Item>
                            </Menu>
                        </Grid.Column>
                        <Grid.Column textAlign='center'>
                            <Menu fluid vertical>
                                <Menu.Item className='header'>Total: {parties.length || ''}</Menu.Item>
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
                    <Grid>
                        <Grid.Row columns={5}>
                            {parties ? parties.map((data, index) => (
                                <PartyCard key={index} data={data} index={index} />
                            )) : null}
                        </Grid.Row>
                    </Grid>
                </div>

                <Grid columns='equal' className="pie-charts-list">
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            Proiecte de hotărâri
                            <PieChart data={generateRandomData()} id='pie-chart-1' width="900px" height="400px" />
                        </Grid.Column>
                        <Grid.Column>
                            Inițiative legislative
                            <PieChart data={generateRandomData()} id='pie-chart-2' width="900px" height="400px" />
                        </Grid.Column>
                        <Grid.Column>
                            Întrebări
                            <PieChart data={generateRandomData()} id='pie-chart-3' width="900px" height="400px" />
                        </Grid.Column>
                        <Grid.Column>
                            Moțiuni semnate
                            <PieChart data={generateRandomData()} id='pie-chart-4' width="900px" height="400px" />
                        </Grid.Column>
                        <Grid.Column>
                            Discursuri
                            <PieChart data={generateRandomData()} id='pie-chart-5' width="900px" height="400px" />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </>
    )
}

export default Parties;