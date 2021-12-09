import React from "react";
import { Grid } from "semantic-ui-react";

const PartyCard = props => {
    const { data } = props;

    return (
        <Grid.Column>

            <div className="card" key={data.id} data-key={data.id} >
                <div className="card-body">
                    <div className="avatar">
                        <img
                            src={data.logo}
                            className="card-img-top"
                            alt=""
                        />
                    </div>

                    <h1 className="card-title">
                        {data.abbreviation}
                    </h1>

                    <h5 className="card-title">
                        {data.name}
                    </h5>

                    <p className="card-text">
                        <a href={data.link} target="_blank">{data.link}</a>
                    </p>
                </div>
            </div>
        </Grid.Column>
    )
}

export default PartyCard;
