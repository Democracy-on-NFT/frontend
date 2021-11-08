import React, { useState, useEffect } from "react";

import * as profileApi from '../../../api/profile.api';

import './profiles.style.scss';

const UserCards = () => {

    const [usersState, setUserState] = useState({
        data: [],
        per: 9,
        page: 1,
        total_pages: null
    });

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
            per: 9
        });
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="container">
            <div className="clearfix">
                <div className="row">
                    {usersState.data ? usersState.data.map(data => (
                        <div className="col-md-4 animated fadeIn" key={data.id.value}>
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
                <button
                    className="btn btn-light btn-block mx-auto"
                    onClick={e => {
                        loadData();
                    }}
                >
                    Load More Users
                </button>
            </div>
        </div>
    );
}

export default UserCards;
