import { Skeleton } from "@chakra-ui/react";
import React from "react";
import './DetailedPageValueArch.styles.css';

const DetailedPageValueArch = ({ item, loading }) => {

    if (loading) {
        return (
            <div className="detailed-page-card-arch-container">
                <Skeleton height='90px' width={'100%'} />
            </div>
        )
    }
    else {
        return (
        <div className="detailed-page-card-arch-container">
            <div className="detailed-page-card-arch-title-container">
                <div>
                    <img className="detailed-page-icon" src={item.icon} />
                </div>
                <p className="detailed-page-card-arch-metric">{item.name}</p>
            </div>
    
            <div className="detailed-page-card-arch-value-container">
                <h2 className="detailed-page-card-arch-value">{item.value? item.value: "0"}</h2>
                <p className="detailed-page-card-arch-value-subtext">{item.subText}</p>
            </div>
        </div>
        )
    }
    
   
}

export default DetailedPageValueArch;