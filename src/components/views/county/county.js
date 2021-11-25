import React from 'react';
import { useParams } from 'react-router-dom'

import PieChart from '../../common/pieChart/pieChart';
import countiesPath from '../../utils/countiesPath.json';

const County = props => {

    // const [searchParams, setSearchParams] = useSearchParams();

    // console.log(searchParams);
    // const query = new URLSearchParams(window.location);
    const { id } = useParams();

    // console.log('id: ', params);

    return (
        <>
            <div className="county-container">
                {/* <svg width="500" height="500">
                    <g>
                        <path className="land" id="ro_1" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath[id]}></path>
                    </g>
                </svg> */}
                <PieChart />
            </div>
        </>
    );
}

export default County;