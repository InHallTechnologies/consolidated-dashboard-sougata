import moment from "moment";

const exceptionalApproval = {
    projectId: "",
    requestTime: moment().format('MMMM Do YYYY, h:mm:ss a'),
    reason:'',
    requestByUID: '',
    requestUID:''
}

export default exceptionalApproval;