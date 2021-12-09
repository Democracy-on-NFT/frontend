import React, { useState, useEffect, createElement } from "react";
import { Select } from 'semantic-ui-react';
import { Container } from 'semantic-ui-react';
import Skeleton from 'react-loading-skeleton';
import * as am5 from '@amcharts/amcharts5';
import CustomCheckbox from "../../common/customCheckbox/customCheckbox";
import ViewHeader from "../../common/viewHeader/viewHeader";
import DeputyProfile from "../../common/deputyProfile/deputyProfile";
import PartyProfile from "../../common/partyProfile/partyProfile";
import StackedChart from "../../common/stackedChart/stackedChart";


import * as profileApi from '../../../api/profile.api';

const Compare = () => {
    const [parliamentarians, setParliamentarians] = useState([{}]);
    const [leftUserStats, setLeftUserStats] = useState([]);
    const [rightUserStats, setRightUserStats] = useState([]);
    const [isPartyTypeChecked, setIsPartyTypeChecked] = useState(false);
    const [isDeputyTypeChecked, setIsDeputyTypeChecked] = useState(true);
    const [leftDeputyInfo, setLeftDeputyInfo] = useState(null);
    const [rightDeputyInfo, setRightDeputyInfo] = useState(null);
    const [leftPartyInfo, setLeftPartyInfo] = useState(null);
    const [rightPartyInfo, setRightPartyInfo] = useState(null);

    const onCompareTypeChange = (type) => {
        if (type === 'deputies') {
            setIsDeputyTypeChecked(true);
            setIsPartyTypeChecked(false);
        } else {
            setIsDeputyTypeChecked(false);
            setIsPartyTypeChecked(true);
        }
    };

    const dummyParties = [{
        id: 1,
        name: 'Partidul National Liberal',
        abbreviation: 'PNL',
        totalMembers: 120,
        president: 'Florin Citu',
        secretaryGeneral: 'Dan Valceanu',
        firstVicePresident: 'Rares Bogdan',
        ministers: 13
    },
    {
        id: 2,
        name: 'Partidul Social Democrat',
        abbreviation: 'PSD',
        totalMembers: 150,
        president: 'Marcel Ciolacu',
        secretaryGeneral: 'Paul Stanescu',
        firstVicePresident: 'Gabriela Firea',
        ministers: 11
    }];

    dummyParties.map(party => {
        party.text = party.abbreviation;
        party.value = party.id;
    });

    const getDeputyById = async (id) => {
        const result = await profileApi.getDeputiesById(9, id);

        return result;
    };

    const onChangeDeputyHandler = async (e, position) => {
        if (e) {
            switch (position) {
                case 'left':
                    const leftDeputy = parliamentarians.filter(deputy => {
                        return deputy.text === e.target.textContent;
                    });
                    const leftResult = await getDeputyById(leftDeputy[0].id);

                    setLeftDeputyInfo(leftResult);
                    setLeftUserStats([
                        leftResult.activities[0].draft_decisions,
                        leftResult.activities[0].legislative_initiatives,
                        leftResult.activities[0].questions,
                        leftResult.activities[0].signed_motions,
                        leftResult.activities[0].speeches
                    ]);
                    break;
                case 'right':
                    const rightDeputy = parliamentarians.filter(deputy => {
                        return deputy.text === e.target.textContent;
                    })
                    const rightResult = await getDeputyById(rightDeputy[0].id);

                    setRightDeputyInfo(rightResult);
                    setRightUserStats([
                        rightResult.activities[0].draft_decisions,
                        rightResult.activities[0].legislative_initiatives,
                        rightResult.activities[0].questions,
                        rightResult.activities[0].signed_motions,
                        rightResult.activities[0].speeches
                    ]);
                    break;
                default:
                    break;
            }
        }
    };

    const onChangePartyHandler = (e, position) => {
        if (e) {
            switch (position) {
                case 'left':
                    const leftParty = dummyParties.filter(party => {
                        return party.text === e.target.textContent;
                    });

                    setLeftPartyInfo(leftParty[0]);
                    break;
                case 'right':
                    const rightParty = dummyParties.filter(party => {
                        return party.text === e.target.textContent;
                    });

                    setRightPartyInfo(rightParty[0]);
                    break;
                default:
                    break;
            }
        }
    };

    const rerenderStackedCHart = () => {
        if (document.getElementById('stacked-bar-chart'))
            document.getElementById('stacked-bar-chart').remove();

        const child = document.createElement('div');
        const parent = document.querySelector('.compare-container');

        child.id = 'stacked-bar-chart';
        parent.append(child);

        const root = am5.Root.new('stacked-bar-chart');

        StackedChart({ left: leftUserStats, right: rightUserStats, root });
    }

    const loadData = async () => {
        const result = await profileApi.getDeputies();

        result.map(deputy => {
            deputy.text = deputy.name;
            deputy.value = deputy.id;
        });

        setParliamentarians(result);
    };

    useEffect(() => {
        rerenderStackedCHart()
    }, [leftUserStats, rightUserStats]);

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <Container fluid className="compare-container">
                <ViewHeader>
                    <h1>Compara contribuțiile aduse</h1>
                </ViewHeader>

                <div className="compare-types">
                    <CustomCheckbox
                        isChecked={isDeputyTypeChecked}
                        label={'deputați'}
                        size={1}
                        onChangeState={() => {
                            onCompareTypeChange('deputies');
                        }}
                    />

                    <CustomCheckbox
                        isChecked={isPartyTypeChecked}
                        label={'partid politic'}
                        size={1}
                        onChangeState={() => {
                            onCompareTypeChange('political party');
                        }}
                    />
                </div>
                {isDeputyTypeChecked ? (
                    <>
                        <div className="select-to-compare-panel">
                            <div className="deputy-panel">
                                <Select
                                    selection
                                    search
                                    options={parliamentarians}
                                    placeholder="Alege parlamentar"
                                    onChange={(option) => onChangeDeputyHandler(option, 'left')}
                                />
                            </div>

                            <div className="data-panel">
                                {leftDeputyInfo ? <img src={leftDeputyInfo.image_link} /> :
                                    <Skeleton height="100" />}
                                <h1>Informații</h1>
                                {rightDeputyInfo ? <img src={rightDeputyInfo.image_link} /> :
                                    <Skeleton width="100" height="150" />}
                            </div>
                            <div className="deputy-panel">
                                <Select
                                    selection
                                    search
                                    options={parliamentarians}
                                    placeholder="Alege parlamentar"
                                    onChange={(option) => onChangeDeputyHandler(option, 'right')} />
                            </div>
                        </div>

                        <div className="compare-panel">
                            <Container fluid>
                                {leftDeputyInfo ? (
                                    <DeputyProfile key={leftDeputyInfo.id.toString()} data={leftDeputyInfo} />
                                ) : <>
                                    <Skeleton height="25px" />
                                    <Skeleton count="4" height="20px" />
                                </>}
                            </Container>

                            <Container fluid className="compare-informations-label">
                                <div>
                                    <p>
                                        Poziția
                                    </p>
                                    <p>
                                        Vârsta
                                    </p>
                                    <p>
                                        Județ
                                    </p>
                                    <p>
                                        Partid curent
                                    </p>
                                    <p>
                                        Partid precedent
                                    </p>

                                </div>
                            </Container>

                            <Container fluid>
                                {rightDeputyInfo ? (
                                    <DeputyProfile key={rightDeputyInfo.id.toString()} data={rightDeputyInfo} />
                                ) : <>
                                    <Skeleton height="25px" />
                                    <Skeleton count="4" height="20px" />
                                </>}
                            </Container>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="select-to-compare-panel">
                            <div className="party-panel">
                                <Select
                                    options={dummyParties}
                                    placeholder="Alege partid"
                                    onChange={(option) => onChangePartyHandler(option, 'left')}
                                />
                            </div>

                            <div className="data-panel">
                                <h1>Informații</h1>

                            </div>
                            <div className="party-panel">
                                <Select
                                    options={dummyParties}
                                    placeholder="Alege partid"
                                    onChange={(option) => onChangePartyHandler(option, 'right')}
                                />
                            </div>
                        </div>

                        <div className="compare-panel">
                            <Container fluid>
                                {leftPartyInfo ? (
                                    <PartyProfile className="party-profile" key={leftPartyInfo.id.toString()} data={leftPartyInfo} />
                                ) : <>
                                    <Skeleton height="25px" />
                                    <Skeleton count="6" height="20px" />
                                </>}
                            </Container>

                            <Container fluid className="compare-informations-label">
                                <h1>
                                    <p>
                                        Numele
                                    </p>
                                </h1>
                                <p>
                                    Prescurtarea
                                </p>
                                <p>
                                    Nr. membri
                                </p>
                                <p>
                                    Președinte
                                </p>
                                <p>
                                    Vice președinte
                                </p>
                                <p>
                                    Secretar general
                                </p>
                                <p>
                                    Miniștri
                                </p>
                            </Container>

                            <Container fluid>
                                {rightPartyInfo ? (
                                    <PartyProfile key={rightPartyInfo.id.toString()} data={rightPartyInfo} />
                                ) : <>
                                    <Skeleton height="25px" />
                                    <Skeleton count="6" height="20px" />
                                </>}
                            </Container>
                        </div>
                    </>
                )}
            </Container>
        </>
    )
}

export default Compare;