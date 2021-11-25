import React, { useState } from "react";
import { Select } from 'semantic-ui-react';
import { Container } from 'semantic-ui-react';
import Skeleton from 'react-loading-skeleton'

import CustomCheckbox from "../../common/customCheckbox/customCheckbox";
import ViewHeader from "../../common/viewHeader/viewHeader";
import DeputyProfile from "../../common/deputyProfile/deputyProfile";
import PartyProfile from "../../common/partyProfile/partyProfile";
import StackedChart from "../../common/stackedChart/stackedChart";

const Compare = () => {

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

    const dummyDeputies = [{
        name: 'Florin Citu',
        id: 1,
        age: 40,
        previousParty: 'PNL',
        currentParty: 'PNL ',
        talks: 10,
        county: 'Ilfov',
        proposals: ['asdasd', 'qqqw1', 'asd123', 'afffff']
    },
    {
        name: 'Marcel Ciolacu',
        id: 2,
        age: 52,
        previousParty: '-',
        currentParty: 'PSD',
        talks: 30,
        county: 'Tulcea',
        proposals: ['aaaaa', 'bbbbb', 'ccccc', 'ddddd']
    }];

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

    dummyDeputies.map(deputy => {
        deputy.text = deputy.name;
        deputy.value = deputy.id;
    });

    dummyParties.map(party => {
        party.text = party.abbreviation;
        party.value = party.id;
    });

    const onChangeDeputyHandler = (e, position) => {
        if (e) {
            switch (position) {
                case 'left':
                    const leftDeputy = dummyDeputies.filter(deputy => {
                        return deputy.text === e.target.textContent;
                    })
                    setLeftDeputyInfo(leftDeputy[0]);
                    break;
                case 'right':
                    const rightDeputy = dummyDeputies.filter(deputy => {
                        return deputy.text === e.target.textContent;
                    })
                    setRightDeputyInfo(rightDeputy[0]);
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
                    })
                    setLeftPartyInfo(leftParty[0]);
                    break;
                case 'right':
                    const rightParty = dummyParties.filter(party => {
                        return party.text === e.target.textContent;
                    })
                    setRightPartyInfo(rightParty[0]);
                    break;
                default:
                    break;
            }
        }
    };

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
                                    options={dummyDeputies}
                                    placeholder="Alege deputat"
                                    onChange={(option) => onChangeDeputyHandler(option, 'left')} />
                            </div>

                            <div className="data-panel">
                                <h1>Informații</h1>

                            </div>
                            <div className="deputy-panel">
                                <Select
                                    options={dummyDeputies}
                                    placeholder="Alege deputat"
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
                                <h1>
                                    <p>
                                        Nume
                                    </p>
                                </h1>
                                <div>
                                    <p>
                                        Vârsta
                                    </p>
                                    <p>
                                        Județ
                                    </p>
                                    <p>
                                        Partid precedent
                                    </p>
                                    <p>
                                        Partid curent
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

                <StackedChart left={[1, 2, 1]} right={[3, 2, 1]} />

            </Container>
        </>
    )
}

export default Compare;