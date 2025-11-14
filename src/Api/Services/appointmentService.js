import axios from "axios"

const ENDPOINT_URL = `${import.meta.env.VITE_BASE_URL}/appointments`


// ex: appointmentData {
// "doctor": "6912e39b9fc8a02b3ad18a78",
//     "patient": "6912e39b9fc8a02b3ad18a7b",
//         "startTime": "2025-11-11T10:30:00.000Z",
//             "endTime": "2025-11-11T11:30:00.000Z",
//                 "type": "Clinic Visit",
//                     "notes": null
// }
export const createAppointment = async (appointmentData) => {
    const pew = (await axios.post(ENDPOINT_URL, appointmentData)).data // Add headers later
    console.log(pew);
    return pew;
}

export const getAvailableSlots = async (doctorId, date) => {
    console.log(doctorId, date);
    const pew = (await axios.get(`${ENDPOINT_URL}/available-slots`, {
        params: {
            doctorId,
            date
        },
    })).data
    console.log(pew);
    return pew;
}