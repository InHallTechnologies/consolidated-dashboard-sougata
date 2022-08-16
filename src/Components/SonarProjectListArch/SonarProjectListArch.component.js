import React, { useContext, useEffect, useState } from "react";
import './SonarProjectListArch.styles.css';
import hashtag from '../../assets/hashtag.svg';
import ProjectInfoContainer from "../ProjectInfoContainer/ProjectInfoContainer.component";
import aroma from '../../assets/aroma.svg';
import copy from '../../assets/copy.svg';
import lock from '../../assets/lock.svg'
import bugs from '../../assets/bugs.svg';
import moment from "moment";
import { gerProjectDetails, getProjectMetaData } from "../../backend/sonar-cloud-api";
import { Link } from "react-router-dom";
import { Link as ChakraLink } from '@chakra-ui/react'
import context from "../../context/app-context";

const SonarProjectListArch = ({ project, index }) => {
    const [projectData, setProjectData] = useState({});
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useContext(context)    

    useEffect(() => {
        const fetchDetails = async () => {
            let temp = {};
            const response = await gerProjectDetails(project.key);
            const metaResponse = await getProjectMetaData(project.key);
            response.component.measures.forEach(item => {
                temp[item.metric] = item.value;
            })

            temp = {...temp, ...metaResponse.branches[0].status}

            setProjectData({...temp, qualityGateStatus: temp.qualityGateStatus === "OK"? "PASSED":"FAILED"});
            setLoading(false);

        }
        fetchDetails();
    }, []);

    
    return (
        <div className="sonar-project-list-arch-container scale-up-center" >
            <Link to={`/sonar-cloud/${project.key}`}>
                <div className="project-top-info-container">
                <div>
                    <div className="project-title-container">
                        <img alt={"Project Name"} src={hashtag} />
                        <h2 className="project-name">{project.key}</h2>
                    </div>
                    <div className="project-meta-data-container">
                        <p className="meta-data">{project.visibility?project.visibility.toUpperCase(): ""}</p>
                        <p className="vertical-separator">|</p>
                        <p className="meta-data bold-data">{`</> ${projectData.ncloc?projectData.ncloc:0} Lines of code`}</p>
                    </div>
                </div>
                <div className="project-status-container" style={{backgroundColor: projectData.qualityGateStatus === "PASSED"?"#43A047":'red'}}>
                    <p className="project-status-label">{projectData.qualityGateStatus}</p>
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
                    {
                        userData.accessType !== "DEVELOPER" 
                        &&
                        <div>
                            <ChakraLink>
                                <p className="bug-action-button">Raise a Bug</p>
                            </ChakraLink>
                            <div style={{width:'2px', height:"20px", backgroundColor:'#ccc', marginLeft:'10px', marginRight:'10px'}}  /> 
                        </div>
                    }
                    <ChakraLink>
                        <p className="bug-action-button">Request Exceptional Approval</p>
                    </ChakraLink>
                </div>
                <p className="last-analysis-para">Last analysis: {moment(project.lastAnalysisDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
            </div>
            
        </div> 
    )
}

export default SonarProjectListArch;