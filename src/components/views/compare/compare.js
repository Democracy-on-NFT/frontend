import React, { useState } from "react";
import Select from 'react-select';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CustomCheckbox from "../../common/customCheckbox/customCheckbox";
import ViewHeader from "../../common/viewHeader/viewHeader";
import DeputyProfile from "../../common/deputyProfile/deputyProfile";

import './compare.style.scss';

const Compare = () => {

    const [isWarningTypeChecked, setIsWarningTypeChecked] = useState(false);
    const [isNoticeTypeChecked, setIsNoticeTypeChecked] = useState(true);
    const [leftDeputyInfo, setLeftDeputyInfo] = useState(null);
    const [rightDeputyInfo, setRightDeputyInfo] = useState(null);


    const onCompareTypeChange = (type) => {
        if (type === 'deputies') {
            setIsNoticeTypeChecked(true);
            setIsWarningTypeChecked(false);
        } else {
            setIsNoticeTypeChecked(false);
            setIsWarningTypeChecked(true);
        }
    };

    const data = [{
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
    }
    ];

    data.map(deputy => {
        deputy.label = deputy.name;
        deputy.value = deputy.id;
    });

    const onChangeHandler = (option, position) => {
        if (option) {
            switch (position) {
                case 'left':
                    setLeftDeputyInfo(option);
                    break;
                case 'right':
                    setRightDeputyInfo(option);
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
                    <Row>
                        <Col sm={6}>
                            <h1>Compare contributions</h1>
                        </Col>
                    </Row>
                </ViewHeader>

                <Row>
                    <div className="compare-types">
                        <CustomCheckbox
                            isChecked={isNoticeTypeChecked}
                            label={'deputies'}
                            size={1}
                            onChangeState={() => {
                                onCompareTypeChange('deputies');
                            }}
                        />

                        <CustomCheckbox
                            isChecked={isWarningTypeChecked}
                            label={'political party'}
                            size={1}
                            onChangeState={() => {
                                onCompareTypeChange('political party');
                            }}
                        />
                    </div>
                </Row>
                <Row>
                    <div className="compare-panel">
                        <div className="deputy-panel">
                            <Row>
                                <Col className="d-flex justify-content-center">
                                    <Select
                                        options={data}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        onChange={(option) => onChangeHandler(option, 'left')}
                                    />
                                </Col>
                            </Row>
                        </div>

                        <div className="data-panel">
                            <Row>
                                <Col className="d-flex justify-content-center">
                                    <h1>Informations</h1>
                                </Col>
                            </Row>

                        </div>
                        <div className="deputy-panel">
                            <Row>
                                <Col className="d-flex justify-content-center">
                                    <Select
                                        options={data}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        onChange={(option) => onChangeHandler(option, 'right')}
                                    />
                                </Col>
                            </Row>

                        </div>
                    </div>
                </Row>
                <Row className="deputies-compare-panel">
                    <Container fluid>
                        {leftDeputyInfo ? (
                            <DeputyProfile className="deputy-profile" key={leftDeputyInfo.id.toString()} data={leftDeputyInfo} />
                        ) : null}
                    </Container>

                    <div className="compare-informations-label">
                        <p>
                            Name
                        </p>
                        <p>
                            Age
                        </p>
                        <p>
                            County
                        </p>
                        <p>
                            Previous Party
                        </p>
                        <p>
                            Current Party
                        </p>
                        <p>
                            Talks
                        </p>
                        <p>
                            Proposals
                        </p>
                    </div>

                    <Container fluid>
                        {rightDeputyInfo ? (
                            <DeputyProfile key={rightDeputyInfo.id} data={rightDeputyInfo} />
                        ) : null}
                    </Container>
                </Row>
            </Container>
        </>
    )
}

export default Compare;