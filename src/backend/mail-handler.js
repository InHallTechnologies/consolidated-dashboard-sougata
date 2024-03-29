import { async } from "@firebase/util";
import axios from "axios"

export const sendExceptionalRequestMail = async (request) => {
    try {
        const { projectId, reason, requestByUID, requestUID, requestTime } = request;
        await axios.get(`https://us-central1-thenewzkit.cloudfunctions.net/helloWorld/send-mail/send-exceptional-request?projectId=${projectId}&userId=${requestByUID}&time=${requestTime}&reason=${reason}&requestUID=${requestUID}`);
        return true
    }catch(err) {
        return false;
    } 
}

export const sendExceptionalRequestResponse = async (request, status, mailTo) => {
    try {
        const { projectId, reason, requestByUID, requestUID, requestTime } = request;
        await axios.get(`https://us-central1-thenewzkit.cloudfunctions.net/helloWorld/send-mail/send-exceptional-request-mail-response?projectId=${projectId}&userId=${requestByUID}&time=${requestTime}&reason=${reason}&requestUID=${requestUID}&status=${status}&mailTo=${mailTo}`);
        return true
    }catch(err) {
        return false;
    } 
}