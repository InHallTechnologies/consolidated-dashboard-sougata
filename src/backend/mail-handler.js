import axios from "axios"

export const sendExceptionalRequestMail = async (request) => {
    try {
        const { projectId, reason, requestByUID, requestUID, requestTime } = request;
        await axios.get(`http://localhost:3001/send-mail/send-exceptional-request?projectId=${projectId}&userId=${requestByUID}&time=${requestTime}&reason=${reason}&requestUID=${requestUID}`);
        return true
    }catch(err) {
        return false;
    } 
}