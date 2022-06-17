import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import React from "react";
import './ProjectInfoContainer.styles.css';

const ProjectInfoContainer = ({ icon, title, value, loading }) => {

    if (loading) {
       return(
        <div className="project-info-container">
            <div className="project-title">
                <SkeletonCircle size='5' />
                <Skeleton height='10px' width={'100px'} style={{marginLeft:'10px'}} />
            </div>
            <div className="project-info-value" style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                <Skeleton height='30px' width={'30px'} style={{marginLeft:'10px'}} />
            </div>
        </div>
       )
    }else {
        return (
            <div className="project-info-container">
                <div className="project-title">
                    {icon}
                    <p className="project-title-label">{title}</p>
                </div>
    
                <div className="project-info-value">
                    {value}
                </div>
                
            </div>
        )
    }

    
}

export default ProjectInfoContainer