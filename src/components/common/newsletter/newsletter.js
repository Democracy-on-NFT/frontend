import React, { useState, useEffect } from "react";
import { Header, Modal, Select, Button, Input } from "semantic-ui-react";
import { Icon } from 'semantic-ui-react'

import sendEmail from '../../../assets/email_sent.gif';

import * as service from '../../../api/service.api';

const Newsletter = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedCounty, setSelectedCounty] = useState();
    const [response, setResponse] = useState(false);
    const [error, setError] = useState(false);
    const [email, setEmail] = useState('');
    const [counties, setCounties] = useState();
    const [enabled, setEnabled] = useState(false);

    const openNewsletterModal = () => {
        setOpenModal(true);
    }

    const onCountyChange = e => {
        const county = counties.filter(county => {
            return county.county_name == e.target.textContent;
        });

        setSelectedCounty(county[0]);
        setEnabled(true);
    }

    const sentNewsletter = async () => {
        if (email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setError(false);
            const result = await service.postNotifications({
                email: email,
                electoral_circumscription_id: selectedCounty.id
            });

            if (result.status > 199 && result.status < 300) {
                setResponse(true);
                setTimeout(() => {
                    setResponse(false);
                }, 3000);
            }
        } else {
            setError(true);
        }
    }

    const onInputChange = (e) => {
        if (e.target.value)
            setEmail(e.target.value);
    }

    const loadData = async () => {
        const counties = await service.getCounties();

        counties.map(county => {
            county.text = county.county_name;
            county.value = county.id;
        });

        setCounties(counties);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <p onClick={openNewsletterModal}>Abonează-te la newsletter <Icon name="envelope outline" /></p>
            <Modal
                className="newsletter-modal"
                closeIcon
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
            >
                <Modal.Header>Abonează-te la newsletter</Modal.Header>
                <Modal.Content image>
                    <Icon name="envelope outline" size='massive' />
                    <Modal.Description>
                        <Header>Primește lunar informații legate de reprezentanții județului tău</Header>
                        <Select
                            search
                            options={counties}
                            placeholder="Alege județ"
                            onChange={onCountyChange}
                        />
                        <Input error={error} onChange={onInputChange} placeholder='Introduceți email-ul' />
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={() => setOpenModal(false)}>
                        <Icon name='remove' /> Închide
                    </Button>
                    {!response ?
                        <Button disabled={!enabled} color='green' onClick={sentNewsletter}>
                            <Icon name='checkmark' /> Abonează-te
                        </Button>
                        : <span><img src={sendEmail} /></span>}
                </Modal.Actions>
            </Modal>
        </>
    )
}

export default Newsletter;