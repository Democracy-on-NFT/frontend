import { Header, Image, Modal } from "semantic-ui-react";
import Icon from '@mdi/react';
import { mdiMapMarkerRadius, mdiEmail } from '@mdi/js';

const ModalCard = props => {
    const { modalData, openModal, setOpenModal } = props;

    if (!modalData)
        return null;

    const uppercase = word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    return (
        <Modal
            className="modal-profile"
            closeIcon
            onClose={() => setOpenModal(false)}
            onOpen={() => setOpenModal(true)}
            open={openModal}
        >
            <Modal.Header>{uppercase(modalData.room ? modalData.room : 'Parlamentar')}</Modal.Header>
            <Modal.Content image>
                <Image className="profile-pic" size='medium' src={modalData.image_link} wrapped />
                <Modal.Description>
                    <Header>{modalData.name}</Header>
                    <p>Data nașterii: {modalData.date_of_birth}</p>
                    <p>
                        <Icon path={mdiMapMarkerRadius}
                            size={1} />
                        <span>
                            Circumscripția: {modalData.activities ? modalData.activities[0].electoral_circumscription.county_name : ''}
                        </span>
                    </p>
                    <p>
                        <Icon path={mdiEmail}
                            size={1} />
                        {modalData.email ? modalData.email : ' -'}
                    </p>
                    <p className="party-logo">
                        <img src={modalData.parties ? modalData.parties[0].party.logo : ''} />
                        <a href={modalData.parties ? modalData.parties[0].party.link : ''} target="_blank">{modalData.parties ? modalData.parties[0].party.name : ''}</a>
                    </p>
                    <p className="offices">
                        <Icon path={mdiMapMarkerRadius}
                            size={1} />
                        <span>
                            {modalData.offices && modalData.offices.length ? modalData.offices.map(office => {
                                return (<>{office.address}<br /></>)
                            }) : '-'}
                        </span>
                    </p>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default ModalCard;
