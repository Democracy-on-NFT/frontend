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

import * as service from '../../../api/service.api';

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
        senators: 38,
        deputies: 79,
        president: 'FLORIN-VASILE CÎȚU',
        ministers: 13
    },
    {
        id: 2,
        name: 'Partidul Social Democrat',
        abbreviation: 'PSD',
        senators: 47,
        deputati: 110,
        president: 'Marcel Ciolacu',
        ministers: 11
    },
    {
        id: 3,
        name: 'Grupul parlamentar al Uniunii Salvați România',
        abbreviation: 'USR',
        senators: 25,
        deputati: 55,
        president: 'DACIAN CIOLOȘ',
        ministers: 0
    },
    {
        id: 4,
        name: '	Grupul parlamentar Alianța pentru Unirea Românilor',
        abbreviation: 'AUR',
        senators: 13,
        deputati: 30,
        president: 'George Simion',
        ministers: 0
    },
    {
        id: 5,
        name: 'Grupul parlamentar al Uniunii Democrate Maghiare din România',
        abbreviation: 'UDMR',
        senators: 9,
        deputati: 20,
        president: 'Kelemen Hunor',
        ministers: 0
    },
    {
        id: 6,
        name: 'Grupul parlamentar al minorităţilor naţionale',
        abbreviation: 'MIN',
        senators: 0,
        deputati: 18,
        president: 'Pambuccian Varujan',
        ministers: 0
    }
        ,
    {
        id: 7,
        name: 'Neafiliați',
        abbreviation: 'NA',
        senators: 4,
        deputati: 18,
        president: '',
        ministers: 0
    }];

    dummyParties.map(party => {
        party.text = party.abbreviation;
        party.value = party.id;
    });

    const getDeputyById = async (id) => {
        const result = await service.getDeputiesById(9, id);

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

                    setLeftUserStats([
                        Math.floor(Math.random() * 100) + 50,
                        Math.floor(Math.random() * 300) + 200,
                        Math.floor(Math.random() * 500) + 200,
                        Math.floor(Math.random() * 10),
                        Math.floor(Math.random() * 450) + 100,
                    ]);
                    break;
                case 'right':
                    const rightParty = dummyParties.filter(party => {
                        return party.text === e.target.textContent;
                    });
                    setRightPartyInfo(rightParty[0]);

                    setRightUserStats([
                        Math.floor(Math.random() * 100) + 50,
                        Math.floor(Math.random() * 300) + 200,
                        Math.floor(Math.random() * 500) + 200,
                        Math.floor(Math.random() * 10),
                        Math.floor(Math.random() * 450) + 100,
                    ]);
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
        const result = await service.getDeputies();

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

                            <Container fluid className="compare-informations-label party-profile">
                                <h1>
                                    <p>
                                        Numele
                                    </p>
                                </h1>
                                <p>
                                    Prescurtarea
                                </p>
                                <p>
                                    Președinte
                                </p>
                                <p>
                                    Senatori
                                </p>
                                <p>
                                    Deputați
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