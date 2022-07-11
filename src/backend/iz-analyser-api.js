import axios from "axios";

export const getProjectList = async () => {
    const response = await axios.get('http://localhost:3001/izanalyser/get-projects');
    return await response.data
}

export const gerProjectDetails = async (key) => {
    const response = await axios.get(`http://localhost:3001/izanalyser/measures?projectKey=${key}`);
    
    return await response.data
}

export const getProjectMetaData = async (key) => {
    const BugResponse = await axios.get(`http://localhost:3001/izanalyser/project-meta-data?projectKey=${key}&type=BUG`);
    const CodeSmellResponse = await axios.get(`http://localhost:3001/izanalyser/project-meta-data?projectKey=${key}&type=CODE_SMELL`);
    const VulnerabilityResponse = await axios.get(`http://localhost:3001/izanalyser/project-meta-data?projectKey=${key}&type=VULNERABILITY`);
   
    const bugs = await BugResponse.data.total;
    console.log(BugResponse.data)
    const vulnerabilities = await VulnerabilityResponse.data.total
    const codeSmells = await CodeSmellResponse.data.total
    
    
    return {
        bugs,
        vulnerabilities,
        codeSmells
    }
}