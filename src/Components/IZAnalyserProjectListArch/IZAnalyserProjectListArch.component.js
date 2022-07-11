import React, { useEffect, useState } from "react";
import './IZAnalyserProjectListArch.styles.css';
import hashtag from '../../assets/hashtag.svg';
import ProjectInfoContainer from "../ProjectInfoContainer/ProjectInfoContainer.component";
import aroma from '../../assets/aroma.svg';
import copy from '../../assets/copy.svg';
import lock from '../../assets/lock.svg'
import bugs from '../../assets/bugs.svg';
import moment from "moment";
import { getProjectMetaData, gerProjectDetails } from "../../backend/iz-analyser-api";

const IZAnalyserProjectListArch = ({ project, index }) => {
    const [projectData, setProjectData] = useState({});
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
        fetchDetails();
    }, []);


    return (
        <div className="sonar-project-list-arch-container scale-up-center">
            <div className="project-top-info-container">
                <div>
                    <div className="project-title-container">
                        <img alt={"Project Name"} src={hashtag} />
                        <h2 className="project-name">{project.key}</h2>
                    </div>
                    <div className="project-meta-data-container">
                        <p className="meta-data">HTML, Javascript</p>
                        <p className="vertical-separator">|</p>
                        <p className="meta-data bold-data">{`</> ${projectData.ncloc} Lines of code`}</p>
                    </div>
                </div>
                <div className="project-status-container">
                    <p className="project-status-label">PASSED</p>
                </div> 
            </div>

            <div className="project-info-list-container">
                <ProjectInfoContainer loading={loading} title={"BUGS"} value={projectData.bugs} icon={<img src={bugs} height='20px' width={'20px'} />} />
                <ProjectInfoContainer loading={loading} title={"VULNERABILITIES"} value={projectData.vulnerabilities} icon={<img  src={lock} height='20px' width={'20px'} />} />
                <ProjectInfoContainer loading={loading} title={"CODE SMELLS"} value={projectData.codeSmells} icon={<img src={aroma} height='20px' width={'20px'} />} />
                <ProjectInfoContainer loading={loading} title={"DUPLICATIONS"} value={0} icon={<img src={copy} height='20px' width={'20px'} />} />
            </div>

            <p className="last-analysis-para">Last analysis: {moment(project.lastAnalysisDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
        </div> 
    )
}

export default IZAnalyserProjectListArch;