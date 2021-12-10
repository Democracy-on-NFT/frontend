import React from 'react';
import { useState, useEffect } from 'react';
import { Grid, Menu, Select } from 'semantic-ui-react';

import PieChart from '../../common/pieChart/pieChart';
import PartyCard from "../../common/partyCard/partyCard";

import * as service from '../../../api/service.api';

const Parties = () => {

    const [parties, setParties] = useState([]);
    const [partyActivities, setPartyActivities] = useState([]);
    const data = [{
        id: 2,
        text: '2020 - 2024',
        value: 2
    }];

    const filterPartiesActivities = (activity) => {
        const data = [];
        partyActivities.map(party => {
            data.push({
                party: party.party,
                activity: party[activity]
            })
        });

        return data;
    }

    const loadData = async () => {
        const parties = await service.getParties();
        const activities = await service.getPartiesActivity(9);

        const filteredParties = parties.map(party => {
            const activity = { ...activities[party.abbreviation] }

            activity.party = party.abbreviation;
            return activity;
        });

        setPartyActivities(filteredParties);
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

                {partyActivities.length ?
                    <Grid columns='equal' className="pie-charts-list">
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                Proiecte de hotărâri
                                <PieChart data={filterPartiesActivities('draft_decisions_count')} id='pie-chart-1' width="900px" height="400px" />
                            </Grid.Column>
                            <Grid.Column>
                                Inițiative legislative
                                <PieChart data={filterPartiesActivities('legislative_initiatives_count')} id='pie-chart-2' width="900px" height="400px" />
                            </Grid.Column>
                            <Grid.Column>
                                Întrebări
                                <PieChart data={filterPartiesActivities('questions_count')} id='pie-chart-3' width="900px" height="400px" />
                            </Grid.Column>
                            <Grid.Column>
                                Moțiuni semnate
                                <PieChart data={filterPartiesActivities('signed_motions_count')} id='pie-chart-4' width="900px" height="400px" />
                            </Grid.Column>
                            <Grid.Column>
                                Discursuri
                                <PieChart data={filterPartiesActivities('speeches_count')} id='pie-chart-5' width="900px" height="400px" />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    : null}
            </div>
        </>
    )
}

export default Parties;