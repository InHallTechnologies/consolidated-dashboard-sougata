import React, { useEffect, useState } from "react";
import './IZAnalyserProjectListArch.styles.css';
import hashtag from '../../assets/hashtag.svg';
import ProjectInfoContainer from "../ProjectInfoContainer/ProjectInfoContainer.component";
import aroma from '../../assets/aroma.svg';
import copy from '../../assets/copy.svg';
import lock from '../../assets/lock.svg'
import bugs from '../../assets/bugs.svg';
import moment from "moment";
import { getProjectMetaData, gerProjectDetails, getQualityGate } from "../../backend/iz-analyser-api";
import { Link } from "react-router-dom";
import { Link as ChakraLink } from '@chakra-ui/react';
import RaiseExceptionalBugAlert from '../RaiseExceptionalBugAlert/RaiseExceptionalBugAlert.component';

const IZAnalyserProjectListArch = ({ project, index }) => {
    const [projectData, setProjectData] = useState({});
    const [qualityGate, setQualityGate] = useState("");
    const [loading, setLoading] = useState(true);
   
    useEffect(() => {
        const fetchDetails = async () => {
            let temp = {};
            const metaResponse = await getProjectMetaData(project.key);
            const response = await gerProjectDetails(project.key);
            response.component.measures.forEach(item => {
                temp[item.metric] = item.value;
            })
            temp = {...temp, ...metaResponse};
            setProjectData(temp);
            setLoading(false)
        }

        const fetchQualityGate = async (key) => {
            const response = await getQualityGate(key);
            setQualityGate(
                response.branches[0].status.qualityGateStatus === "ERROR"
                ?
                "FAILED"
                :
                response.branches[0].status.qualityGateStatus === "OK"
                ?
                "PASSED"
                :
                "NA"
            );
        }

        fetchDetails();
        fetchQualityGate(project.key);
    }, []);


    return (
        <div className="sonar-project-list-arch-container scale-up-center">
            <Link to={`/iz-analyser/${project.key}`}>

                <div className="project-top-info-container">
                <div>
                    <div className="project-title-container">
                        <img alt={"Project Name"} src={hashtag} />
                        <h2 className="project-name">{project.key}</h2>
                    </div>
                    <div className="project-meta-data-container">
                        <p className="meta-data">{project.visibility?project.visibility.toUpperCase():""}</p>
                        <p className="vertical-separator">|</p>
                        <p className="meta-data bold-data">{`</> ${projectData.ncloc} Lines of code`}</p>
                    </div>
                </div>
                <div className="project-status-container" style={{backgroundColor: qualityGate === "FAILED"? 'red':'43A047'}} >
                    <p className="project-status-label">{qualityGate}</p>
                </div> 
                </div>

                <div className="project-info-list-container">
                <ProjectInfoContainer loading={loading} title={"BUGS"} value={projectData.bugs} icon={<img src={bugs} height='20px' width={'20px'} />} />
                <ProjectInfoContainer loading={loading} title={"VULNERABILITIES"} value={projectData.vulnerabilities} icon={<img  src={lock} height='20px' width={'20px'} />} />
                <ProjectInfoContainer loading={loading} title={"CODE SMELLS"} value={projectData.codeSmells} icon={<img src={aroma} height='20px' width={'20px'} />} />
                <ProjectInfoContainer loading={loading} title={"DUPLICATIONS"} value={0} icon={<img src={copy} height='20px' width={'20px'} />} />
                </div>
            </Link>

            <div className="bug-action-container">
                <div className="bug-action-buttons-container" style={{ visibility: projectData.qualityGateStatus !== 'PASSED'? 'visible':'hidden'  }}>
                    <ChakraLink>
                        <p className="bug-action-button">Raise a Bug</p>
                    </ChakraLink>
                    <div style={{width:'2px', height:"20px", backgroundColor:'#ccc', marginLeft:'10px', marginRight:'10px'}}  />
                    <RaiseExceptionalBugAlert projectId={project.key} />
                </div>
                <p className="last-analysis-para">Last analysis: {moment(project.lastAnalysisDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
            </div>
        </div> 
    )
}

export default IZAnalyserProjectListArch;