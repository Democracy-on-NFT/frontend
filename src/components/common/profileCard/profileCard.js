const ProfileCard = props => {
    const { data, handleOnCardClick } = props;

    return (
        <div className="four wide column">
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
        </div>
    )
}

export default ProfileCard;
