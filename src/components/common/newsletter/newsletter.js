import React, { useState } from "react";
import { Header, Modal, Select, Button } from "semantic-ui-react";
import { Icon } from 'semantic-ui-react'

import countiesName from '../../utils/countiesName.json';

const Newsletter = props => {
    const [openModal, setOpenModal] = useState(false);
    const [enabled, setEnabled] = useState(false);

    let data = [],
        countyId;

    const parsedCountiesName = JSON.parse(JSON.stringify(countiesName));

    Object.keys(parsedCountiesName).forEach((key) => {
        data.push({
            value: key,
            id: key,
            text: parsedCountiesName[key]
        })
    });

    const openNewsletterModal = () => {
        setOpenModal(true);
    }

    const onCountyChange = county => {
        countyId = county.target.id;
        setEnabled(true);
    }

    const sentNewsletter = data => {
        console.log(countyId)
    }

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
                            options={data}
                            placeholder="Alege județ"
                            onChange={onCountyChange}
                        />
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={() => setOpenModal(false)}>
                        <Icon name='remove' /> Închide
                    </Button>
                    <Button disabled={!enabled} color='green' onClick={sentNewsletter}>
                        <Icon name='checkmark' /> Abonează-te
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}

export default Newsletter;