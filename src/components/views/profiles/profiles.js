import React, { useState, useEffect } from "react";
import { Select } from "semantic-ui-react";

import * as profileApi from '../../../api/profile.api';

import '../../../style/components/profiles.scss';

const UserCards = () => {

    const [usersState, setUserState] = useState({
        data: [],
        per: 8,
        page: 1,
        total_pages: null
    });

    const [partyFilter, setPartyFilter] = useState({});
    const [deputyFilter, setDeputyFilter] = useState({});

    const uppercase = word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    const loadData = async () => {
        const { per, page, data } = usersState;
        const result = await profileApi.getProfile(per, page);

        setUserState({
            data: [...data, ...result.results],
            scrolling: false,
            total_pages: result.info.results,
            page: result.info.page + 1,
            per: 8
        });
    };

    const dummyParties = [{
        text: 'Partidul National Liberal',
        value: 'pnl',
        key: 'pnl'
    },
    {
        text: 'Partidul Social Democrat',
        value: 'psd',
        key: 'psd'
    }];

    const dummyDeputies = [{
        text: 'Ion Popescu',
        value: 1,
        key: 1
    },
    {
        text: 'Dorel Andrei',
        value: 2,
        key: 2
    }];

    const onChangePartyHandler = (e) => {
        const party = dummyParties.filter(party => {
            return party.text === e.target.innerHTML;
        })

        setPartyFilter(party[0]);
    }

    const onChangeDeputyHandler = (e) => {
        const deputy = dummyDeputies.filter(deputy => {
            return deputy.text === e.target.innerHTML;
        })

        setDeputyFilter(deputy[0]);
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <div className="container">
                <p>Filter</p>
                <div className="ui equal grid">
                    <div>
                        <Select
                            options={dummyParties}
                            placeholder="Select party"
                            onChange={e => onChangePartyHandler(e)}
                        // value={partyFilter.value}
                        />
                    </div>

                    <div>
                        <Select
                            options={dummyDeputies}
                            placeholder="Select deputy"
                            onChange={onChangeDeputyHandler}
                        // value={deputyFilter}
                        />
                    </div>
                </div>

                <div className="ui equal grid">
                    {usersState.data ? usersState.data.map(data => (
                        <div className="four wide column" key={data.id.text}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="avatar">
                                        <img
                                            src={data.picture.large}
                                            className="card-img-top"
                                            alt=""
                                        />
                                    </div>

                                    <h5 className="card-title">
                                        {uppercase(data.name.first) +
                                            " " +
                                            uppercase(data.name.last)}
                                    </h5>

                                    <p className="card-text">
                                        {data.location.city +
                                            ", " +
                                            uppercase(data.location.state)}
                                        <br />
                                        <span className="phone">{data.phone}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )) : null}
                </div>
                {/* <button
                className="btn btn-light btn-block mx-auto"
                onClick={e => {
                    loadData();
                }}
            >
                Load More Users
            </button> */}
            </div>
        </>
    );
}

export default UserCards;
