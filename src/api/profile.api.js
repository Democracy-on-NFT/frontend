import axios from 'axios';

const host = 'http://localhost:3001/api/v1';

export const getProfile = async (per, page) => {
    const { data } = await axios.get(`https://randomuser.me/api/?nat=us&results=${per}&page=${page}`);
    return data;
}

export const getCounties = async () => {
    const { data } = await axios.get(`${host}/electoral_circumscriptions`);
    return data;
}

export const getParties = async (id) => {
    const { data } = await axios.get(`${host}/parties`);
    return data;
}

export const getDeputies = async (per_page, page) => {
    const { data } = await axios.get(`${host}/deputies`, {
        params: {
            page,
            per_page
        }
    });
    return data;
}

export const getDeputiesById = async (legislature_id, id) => {
    const { data } = await axios.get(`${host}/deputies/${id}`, {
        params: {
            legislature_id,
            id
        }
    });
    return data;
}

export const getDeputiesByCounty = async (legislature_id) => {
    const { data } = await axios.get(`${host}/deputies_by_county`, {
        params: {
            legislature_id
        }
    });
    return data;
}
