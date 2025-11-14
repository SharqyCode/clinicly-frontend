import axios from "axios"

const ENDPOINT_URL = `${import.meta.env.VITE_BASE_URL}/patients`

export const getAllPatients = async () => {
    const pew = await axios.get(ENDPOINT_URL);
    const pewData = pew.data;
    console.log(pewData);
    return pewData;
}
