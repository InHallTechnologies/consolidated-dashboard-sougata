import axios from "axios";
import bugs from '../assets/bugs.svg';
import aroma from '../assets/aroma.svg';
import duplications from '../assets/copy.svg';
import lock from '../assets/lock.svg';
import complexity from '../assets/complexity.png';
import flag from '../assets/voilations.png';

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
    const vulnerabilities = await VulnerabilityResponse.data.total
    const codeSmells = await CodeSmellResponse.data.total
    
    
    return {
        bugs,
        vulnerabilities,
        codeSmells
    }
}

export const getQualityGate = async (key) => {
    const response = await axios.get(`http://localhost:3001/izanalyser/quality-gate?projectKey=${key}`)
    return await response.data;
}

const getSingleProjectDetail = async (key) => {
    const response = await axios.get(`http://localhost:3001/izanalyser/get-single-project-detail?projectKey=${key}`)
    return await response.data;
}

export const getProjectFullData = (key) => {
    const detailsPromise = new Promise(async(resolve, reject) => {
        let temp = {}
        const projectDetails = await gerProjectDetails(key);
        const projectMetada = await getProjectMetaData(key);
        const singleData = await getSingleProjectDetail(key);
        projectDetails.component.measures.forEach(item => {
            temp[item.metric] = item.value
        });
        
    
        const details = [
            {
                name: 'Reliability',
                icon: bugs,
                value: projectMetada.bugs,
                subText: 'Bugs'
            },
            {
                name: 'Maintainability',
                icon: aroma,
                value: projectMetada.codeSmells,
                subText: 'Code Smells'
            },
            {
                name: 'Security',
                icon: lock,
                value: projectMetada.vulnerabilities,
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
        resolve({details, linesOfCode: temp.ncloc, name:singleData.components[0].name, visibility:singleData.components[0].visibility  });
    });
    return detailsPromise;
   
}