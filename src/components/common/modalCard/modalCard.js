import { Header, Image, Modal } from "semantic-ui-react";
import Icon from '@mdi/react';
import { mdiMapMarkerRadius, mdiEmail } from '@mdi/js';

const ModalCard = props => {
    const { modalData, openModal, setOpenModal } = props;

    return (
        <Modal
            closeIcon
            onClose={() => setOpenModal(false)}
            onOpen={() => setOpenModal(true)}
            open={openModal}
        >
            <Modal.Header>Parlamentar</Modal.Header>
            <Modal.Content image>
                <Image size='medium' src={modalData.picture.large} wrapped />
                <Modal.Description>
                    <Header>{modalData.name.first} {modalData.name.last} </Header>
                    <p>
                        <Icon path={mdiEmail}
                            size={1} />
                        {modalData.email}
                    </p>
                    <p>{modalData.nat}</p>
                    <p>{modalData.dob.age}</p>
                    <p>
                        <Icon path={mdiMapMarkerRadius}
                            size={1} />
                        {modalData.location.city}, {modalData.location.state}
                    </p>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default ModalCard;
