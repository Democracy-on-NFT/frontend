import axios from 'axios';

export const getProfile = async (per, page) => {
    const { data } = await axios.get(`https://randomuser.me/api/?nat=us&results=${per}&page=${page}`);
    return data;
}
