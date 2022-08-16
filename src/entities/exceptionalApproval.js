import moment from "moment";

const exceptionalApproval = {
    projectId: "",
    requestTime: moment().format('MMMM Do YYYY, h:mm:ss a'),
    reason:'',
    requestByUID: '',
    requestUID:'',
    status: "PENDING"
}


export const EXCEPTIONAL_APPROVAL_STATUS_PENDING = "PENDING";
export const EXCEPTIONAL_APPROVAL_STATUS_ACCEPTED= "ACCEPTED";
export const EXCEPTIONAL_APPROVAL_STATUS_REJECTED= "REJECTED";

export default exceptionalApproval;