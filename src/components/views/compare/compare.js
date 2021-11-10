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

    const onCompareTypeChange = (type) => {
        if (type === 'deputies') {
            setIsNoticeTypeChecked(true);
            setIsWarningTypeChecked(false);
        } else {
            setIsNoticeTypeChecked(false);
            setIsWarningTypeChecked(true);
        }
    };

    const options = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 }
    ];

    const optionsChangeHandler = (
        option => {
            if (option) {
                alert(`Option "${option.label}" (${option.value}) was selected.`);
            }
        });

    return (
        <>
            <Container fluid>
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
                        <div className="left-compare-panel">
                            <Row>
                                <Col sm={6} className="d-flex justify-content-end">
                                    <Select
                                        options={options}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        onChange={optionsChangeHandler}
                                    />
                                </Col>
                            </Row>
                            <DeputyProfile name="Bobita" party="PNL" />
                        </div>
                        <div className="right-compare-panel">
                            <Row>
                                <Col sm={6} className="d-flex justify-content-end">
                                    <Select
                                        options={options}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        onChange={optionsChangeHandler}
                                    />
                                </Col>
                            </Row>
                            <DeputyProfile name="Geani" party="PSD" />
                        </div>
                    </div>
                </Row>
            </Container>
        </>
    )
}

export default Compare;