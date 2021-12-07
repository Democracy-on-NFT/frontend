const ProfileCard = props => {
    const { index, data, handleOnCardClick } = props;

    return (
        <div className="four wide column">
            <div className="card" key={index.toString()} data-key={index.toString()} onClick={handleOnCardClick}>
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
        </div>
    )
}

export default ProfileCard;
