import axios from "axios";

export const getProjectList = async () => {
    const response = await axios.get('http://localhost:3001/get-list');
    return await response.data
}

export const gerProjectDetails = async (key) => {
    const response = await axios.get(`http://localhost:3001/measures?projectKey=${key}`);
    return await response.data
}

export const getProjectMetaData = async (key) => {
    const response = await axios.get(`http://localhost:3001/project-meta-data?projectKey=${key}`);
    return await response.data
}