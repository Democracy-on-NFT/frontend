import { useHistory } from 'react-router-dom';

import countiesPath from '../../utils/countiesPath.json';
import * as profileApi from '../../../api/profile.api';

import '../../../style/components/mapChart.scss';
import { useState, useEffect } from 'react';

const MapChart = () => {
    const highlightCountyColor = '#C0E6FF';
    const defaultColor = '#FAFDFF';

    const history = useHistory();


    const onHandleClick = (data) => {
        let id;
        if (data.target.id && data.target.id.includes('iso_'))
            id = data.target.id.replace('iso_', '');
        else
            id = data.target.id;

        if (!id)
            return;

        const element = data.target;
        console.log(document.getElementById(id));



        history.push(`/judet/${id}`);
    }

    const handleMouseEnter = (data) => {
        let id;
        if (data.target.id && data.target.id.includes('iso_'))
            id = data.target.id.replace('iso_', '');
        else
            id = data.target.id;

        if (!id)
            return;

        const element = document.getElementById(id);
        const rect = document.getElementById('info-rect');
        const text = document.getElementById('info-text');

        text.textContent = `Deputati: ${document.getElementById(`iso_${id}`).textContent}`;

        rect.style.display = "block";
        text.style.display = "block";

        const position = element.getBoundingClientRect();
        const x = position.left / 2, y = position.top / 2;

        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        text.setAttribute('x', x + 10);
        text.setAttribute('y', y + 20);

        element.style.fill = highlightCountyColor;
    }

    const handleMouseLeave = (data) => {
        let id;
        if (data.target.id && data.target.id.includes('iso_'))
            id = data.target.id.replace('iso_', '');
        else
            id = data.target.id;

        if (!id)
            return;

        const element = document.getElementById(id);

        const rect = document.getElementById('info-rect');
        const text = document.getElementById('info-text');

        rect.style.display = "none";
        text.style.display = "none";

        element.style.fill = defaultColor;
    }

    const loadData = async () => {
        const result = await profileApi.getCounties();

        console.log(result);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <div onClick={onHandleClick} className="map-container">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 500" xmlSpace="preserve">
                    <g>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_1" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_1']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_2" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_2']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_3" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_3']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_4" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_4']} cursor="poiner"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_5" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_5']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_6" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_6']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_7" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_7']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_8" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_8']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_9" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_9']} cursor="pointer" ></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_10" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_10']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_11" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_11']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_12" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_12']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_13" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_13']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_14" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_14']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_15" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_15']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_16" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_16']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_17" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_17']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_18" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_18']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_19" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_19']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_20" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_20']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_21" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_21']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_22" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_22']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_23" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_23']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_24" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_24']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_25" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_25']} cursor="pointer" ></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_26" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_26']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_27" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_27']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_28" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_28']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_29" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_29']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_30" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_30']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_31" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_31']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_32" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_32']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_33" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_33']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_34" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_34']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_35" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_35']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_36" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_36']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_37" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_37']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_38" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_38']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_39" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_39']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_40" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_40']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_41" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_41']} cursor="pointer"></path>
                        <path onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="land" id="ro_42" fill="#FAFDFF" stroke="#BCC5CC" d={countiesPath['ro_42']} cursor="pointer"></path>
                    </g>

                    <g id="text-abb" fill="#5286BC">
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_1" transform="matrix(1 0 0 1 236 226)" fontSize="15" cursor="pointer">Alba</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_2" transform="matrix(1 0 0 1 106 214)" fontSize="15" cursor="pointer">Arad</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_3" transform="matrix(1 0 0 1 332 317)" fontSize="14" cursor="pointer">Argeș</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_4" transform="matrix(1 0 0 1 474 202)" fontSize="14" cursor="pointer">Bacău</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_5" transform="matrix(1 0 0 1 136 145)" fontSize="15" cursor="pointer">Bihor</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_6" transform="matrix(1 0 0 1 285 110)" fontSize="13" cursor="pointer">Bistrița-Năsăud</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_7" transform="matrix(1 0 0 1 467 51)" fontSize="13" cursor="pointer">Botoșani</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_8" transform="matrix(1 0 0 1 357 267)" fontSize="13" cursor="pointer">Brașov</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_9" transform="matrix(1 0 0 1 541 343)" fontSize="14" cursor="pointer">Brăila</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_10" transform="matrix(1 0 0 1 469 320)" fontSize="14" cursor="pointer">Buzău</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_11" transform="matrix(1 0 0 1 100 327)" fontSize="13" cursor="pointer">Caraș-Severin</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_12" transform="matrix(1 0 0 1 485 422)" fontSize="13" cursor="pointer">Călărași</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_13" transform="matrix(1 0 0 1 244 163)" fontSize="14" cursor="pointer">Cluj</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_14" transform="matrix(1 0 0 1 569 444)" fontSize="13" cursor="pointer">Constanța</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_15" transform="matrix(1 0 0 1 409 253)" fontSize="13" cursor="pointer">Covasna</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_16" transform="matrix(1 0 0 1 366 361)" fontSize="12" cursor="pointer">Dâmbovița</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_17" transform="matrix(1 0 0 1 245 438)" fontSize="15" cursor="pointer">Dolj</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_18" transform="matrix(1 0 0 1 546 269)" fontSize="13" cursor="pointer">Galați</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_19" transform="matrix(1 0 0 1 414 441)" fontSize="12" cursor="pointer">Giurgiu</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_20" transform="matrix(1 0 0 1 225 350)" fontSize="15" cursor="pointer">Gorj</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_21" transform="matrix(1 0 0 1 373 198)" fontSize="14" cursor="pointer">Harghita</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_22" transform="matrix(1 0 0 1 170 253)" fontSize="13" cursor="pointer">Hunedoara</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_23" transform="matrix(1 0 0 1 502 388)" fontSize="13" cursor="pointer">Ialomița</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_24" transform="matrix(1 0 0 1 519 117)" fontSize="14" cursor="pointer">Iași</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_25" transform="matrix(1 0 0 1 432 387)" fontSize="13" cursor="pointer">Ilfov</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_26" transform="matrix(1 0 0 1 257 68)" fontSize="13" cursor="pointer">Maramureș</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_27" transform="matrix(1 0 0 1 157 397)" fontSize="14" cursor="pointer">Mehedinți</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_28" transform="matrix(1 0 0 1 317 179)" fontSize="14" cursor="pointer">Mureș</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_29" transform="matrix(1 0 0 1 436 142)" fontSize="14" cursor="pointer">Neamț</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_30" transform="matrix(1 0 0 1 311 425)" fontSize="15" cursor="pointer">Olt</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_31" transform="matrix(1 0 0 1 414 341)" fontSize="13" cursor="pointer">Prahova</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_32" transform="matrix(1 0 0 1 167 70)" fontSize="13" cursor="pointer">Satu Mare</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_33" transform="matrix(1 0 0 1 208 123)" fontSize="14" cursor="pointer">Sălaj</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_34" transform="matrix(1 0 0 1 293 256)" fontSize="14" cursor="pointer">Sibiu</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_35" transform="matrix(1 0 0 1 391 79)" fontSize="14" cursor="pointer">Suceava</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_36" transform="matrix(1 0 0 1 342 455)" fontSize="12" cursor="pointer">Teleorman</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_37" transform="matrix(1 0 0 1 69 273)" fontSize="15" cursor="pointer">Timiș</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_38" transform="matrix(1 0 0 1 611 344)" fontSize="14" cursor="pointer">Tulcea</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_39" transform="matrix(1 0 0 1 548 192)" fontSize="14" cursor="pointer">Vaslui</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_40" transform="matrix(1 0 0 1 280 333)" fontSize="13" cursor="pointer">Vâlcea</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_41" transform="matrix(1 0 0 1 477 265)" fontSize="13" cursor="pointer">Vrancea</text>
                        <text onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="iso_ro_42" transform="matrix(1 0 0 1 368 401)" fontSize="14" cursor="pointer">București</text>
                    </g>

                    <g>
                        <rect id="info-rect" rx="10" ry="10" width="120" height="50" />
                        <text id="info-text" />
                    </g>
                </svg>
            </div>
        </>
    )
}

export default MapChart;


