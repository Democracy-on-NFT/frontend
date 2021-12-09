import React from "react";
import { Grid } from "semantic-ui-react";

const ProfileCard = props => {
    const { data, handleOnCardClick } = props;

    return (
        <Grid.Column>

            <div className="card" key={data.id} data-key={data.id} onClick={handleOnCardClick}>
                <div className="card-body">
                    <div className="avatar">
                        <img
                            src={data.image_link}
                            className="card-img-top"
                            alt=""
                        />
                    </div>

                    <h5 className="card-title">
                        {data.name}
                    </h5>

                    <p className="card-text">
                        {data.email}
                        <br />
                    </p>
                </div>
            </div>
        </Grid.Column>
    )
}

export default ProfileCard;
