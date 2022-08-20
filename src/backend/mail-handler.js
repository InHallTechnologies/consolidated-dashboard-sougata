import { async } from "@firebase/util";
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

export const sendExceptionalRequestResponse = async (request, status, mailTo) => {
    try {
        const { projectId, reason, requestByUID, requestUID, requestTime } = request;
        await axios.get(`http://localhost:3001/send-mail/send-exceptional-request-mail-response?projectId=${projectId}&userId=${requestByUID}&time=${requestTime}&reason=${reason}&requestUID=${requestUID}&status=${status}&mailTo=${mailTo}`);
        return true
    }catch(err) {
        return false;
    } 
}