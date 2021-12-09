import axios from 'axios';

const host = 'http://51.116.232.61:3001/api/v1';

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

export const getDeputiesByCommunity = async (legislature_id) => {
    const { data } = await axios.get(`${host}/deputies_by_community`, {
        params: {
            legislature_id
        }
    });
    return data;
}

export const postNotifications = async (data) => {
    const response = await axios.post(`${host}/notifications`, {
        "notification": data
    });
    return response;
}

export const getPartiesPerCounty = async (legislature_id, deputies) => {
    const data = {
        legislature_id,
        'deputies_ids[]': 1,
        'deputies_ids[]': 2
    }
    const { result } = await axios.get(`${host}/parties_percentage/activity`, {
        params: data
    });

    console.log(result);
    return result;
}