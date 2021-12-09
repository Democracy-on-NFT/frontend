import React, { useState, useEffect } from "react";
import { Select, Button, Grid, Icon, Pagination } from "semantic-ui-react";

import ProfileCard from "../../common/profileCard/profileCard";
import ModalCard from "../../common/modalCard/modalCard";

import * as service from '../../../api/service.api';

const Senators = () => {
    const senatorsPerPage = 10;
    let pageNumber = 1

    const [senators, setSenators] = useState();
    const [filteredSenators, setFilteredSenators] = useState();
    const [filterByParty, setFilterByParty] = useState();
    const [filterByCounty, setFilterByCounty] = useState();
    const [partyFilter, setPartyFilter] = useState([{}]);
    const [countyFilter, setCountyFilter] = useState([{}]);
    const [selectedParty, setSelectedParty] = useState();
    const [selectedCounty, setSelectedCounty] = useState();
    const [totalPages, setTotalPages] = useState(1)
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState();

    const onChangePartyHandler = (e, { value }) => {
        setFilterByParty(e.target.textContent);
        setSelectedParty(value);

        filterUsers('', 1, e.target.textContent, filterByCounty);
    }

    const onChangeCountyHandler = (e, { value }) => {
        setFilterByCounty(e.target.textContent);
        setSelectedCounty(value);

        filterUsers('', 1, filterByParty, e.target.textContent);
    }

    const handleOnCardClick = async (e) => {
        const card = e.target.closest('.card');
        const user = senators.filter(senator => {
            return senator.id == card.getAttribute('data-key');
        });
        const senator = await service.getDeputiesById(9, user[0].id);

        setModalData(senator);
        setOpenModal(true);
    }

    const handleResetClick = type => {
        switch (type) {
            case 'party':
                setFilterByParty();
                setSelectedParty(null);
                filterUsers('', 1, null, filterByCounty);
                break;
            case 'county':
                setFilterByCounty();
                setSelectedCounty(null);
                filterUsers('', 1, filterByParty, null);
                break;
            default:
                break;
        }

        // filterUsers();
    }

    const handlePageChange = (e, { activePage }) => {
        pageNumber = activePage;
        filterUsers('', activePage, filterByParty, filterByCounty);
    }

    const filterUsers = (users, page, filterByParty, filterByCounty) => {
        let filteredUsers = senators || users;

        if (!filteredUsers)
            return;

        if (filterByParty) {
            filteredUsers = filteredUsers.filter(user => {
                return filterByParty === user.party.abbreviation
            })
        }

        if (filterByCounty) {
            filteredUsers = filteredUsers.filter(user => {
                return filterByCounty === user.circumscription.county_name
            })
        }
        if (filteredUsers.length > senatorsPerPage) {
            setTotalPages(Math.ceil(filteredUsers.length / senatorsPerPage));
            filteredUsers = filteredUsers.slice(((page || pageNumber) - 1) * senatorsPerPage, ((page || pageNumber) - 1) * senatorsPerPage + senatorsPerPage);
        } else {
            setTotalPages(1);
        }

        setFilteredSenators(filteredUsers);
    }

    const loadData = async () => {
        const members = await service.getDeputies();
        const parties = await service.getParties();
        const counties = await service.getCounties();

        const senators = members.filter(member => {
            return member.room == 'senator';
        })

        parties.map(party => {
            party.text = party.abbreviation;
            party.value = party.id;
        });
        counties.map(county => {
            county.text = county.county_name;
            county.value = county.id;
        });

        setSenators(senators);
        setPartyFilter(parties);
        setCountyFilter(counties);
        setTotalPages(Math.ceil(senators.length / senatorsPerPage));

        filterUsers(senators, 1, null, null);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <div className="profiles-container">
                <p>Filtru</p>
                <div className="ui equal grid">
                    <div>
                        <Select
                            selection
                            search
                            options={partyFilter}
                            placeholder="După partid"
                            onChange={onChangePartyHandler}
                            value={selectedParty}
                        />
                        <Button onClick={() => handleResetClick('party')} icon>
                            <Icon name='undo alternate' />
                        </Button>
                    </div>

                    <div>
                        <Select
                            selection
                            search
                            options={countyFilter}
                            placeholder="După județ"
                            onChange={onChangeCountyHandler}
                            value={selectedCounty}
                        />
                        <Button onClick={() => handleResetClick('county')} icon>
                            <Icon name='undo alternate' />
                        </Button>
                    </div>
                </div>

                <Grid>
                    <Grid.Row columns={5}>
                        {filteredSenators ? filteredSenators.map((user) => (
                            <ProfileCard key={user.id} id={user.id} data={user} handleOnCardClick={handleOnCardClick} />
                        )) : null}
                    </Grid.Row>
                </Grid>

                <Pagination
                    siblingRange={2}
                    onPageChange={handlePageChange}
                    defaultActivePage={1}
                    totalPages={totalPages} />

                <ModalCard
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    modalData={modalData} />
            </div>
        </>
    );
}

export default Senators;
