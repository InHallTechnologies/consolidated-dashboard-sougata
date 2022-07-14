import axios from "axios";
import bugs from '../assets/bugs.svg';
import aroma from '../assets/aroma.svg';
import duplications from '../assets/copy.svg';
import lock from '../assets/lock.svg';
import complexity from '../assets/complexity.png';
import flag from '../assets/voilations.png';

export const getProjectList = async () => {
    const response = await axios.get('http://localhost:3001/get-list');
    return await response.data
}

export const getProjectDetails = async (key) => {
    const response = await axios.get(`http://localhost:3001/project-last-analysis?projectKey=${key}`);
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

export const getProjectFullData = (key) => {
    const detailsPromise = new Promise(async(resolve, reject) => {
        let temp = {}
        const projectDetails = await gerProjectDetails(key);
        const projectMetada = await getProjectMetaData(key);
        console.log(projectDetails)
        projectDetails.component.measures.forEach(item => {
            temp[item.metric] = item.value
        });
        Object.keys(projectMetada.branches[0].status).forEach(item => {
            temp[item] = projectMetada.branches[0].status[item]
        });
    
        const details = [
            {
                name: 'Reliability',
                icon: bugs,
                value: temp.bugs,
                subText: 'Bugs'
            },
            {
                name: 'Maintainability',
                icon: aroma,
                value: temp.codeSmells,
                subText: 'Code Smells'
            },
            {
                name: 'Security',
                icon: lock,
                value: temp.vulnerabilities,
                subText: 'Vulnerabilities'
            },
            {
                name: 'Complexity',
                icon: complexity,
                value: temp.complexity,
                subText: ''
            },
            {
                name: 'Violations',
                icon: flag,
                value: temp.violations,
                subText: ''
            },
            {
                name: 'Duplications',
                icon: duplications,
                value: '0',
                subText: '%'
            }
        ]
        resolve({details, linesOfCode: temp.ncloc});
    });
    return detailsPromise;
   
}