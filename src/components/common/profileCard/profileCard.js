const ProfileCard = props => {
    const { index, data, handleOnCardClick } = props;

    const uppercase = word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    return (
        <div className="four wide column">
            <div className="card" key={index.toString()} data-key={index.toString()} onClick={handleOnCardClick}>
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
    )
}

export default ProfileCard;
