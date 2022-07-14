import React, { useEffect, useState } from "react";
import AuthBox from "../../Components/AuthBox/AuthBox.component";
import './detailedResultPage.styles.css';
import logo from '../../assets/logo.svg'
import { Button } from "@chakra-ui/react";
import DetailedPageValueArch from "../../Components/DetailedPageValueArch/DetailedPageValueArch.component";
import { getProjectDetails, getProjectFullData, getProjectMetaData } from "../../backend/sonar-cloud-api";
import { useParams } from "react-router-dom";
import moment from "moment";

const DetailedResultPage = () => {

    const params = useParams();
    const [details, setDetails] = useState([{}, {}, {}, {}, {}, {},]);
    const [metaData, setMetaData] = useState({});
    const [ncloc, setNcloc] = useState(0);
    const [loading, setLoading] = useState(true);
    
    
    useEffect(() => {
        const fetchDate = async () => {
            const metadata = await getProjectDetails(params.projectId);
            const metaDataForQualityGate = await getProjectMetaData(params.projectId)
            setMetaData({...metadata, qualityGate:metaDataForQualityGate.branches[0].status.qualityGateStatus });
        }
        getProjectFullData(params.projectId).then((result) => {
            setDetails(result.details);
            setNcloc(result.linesOfCode);
            setLoading(false);
        });
        fetchDate();

        
    }, []);

    return (
        <AuthBox className="home-page-main-container main-pages-container">
            <div className="home-page-navigation-container">
                <img className="navigation-logo" alt="Consolidated Dashboard" src={logo} />
                <div className="">
                    <Button>View in SonarCloud</Button>
                </div>
            </div>

            <div className="detailed-page-main-content">
                <div className="detailed-page-meta-detail-container">
                    <div className="project-name-container">
                        <h1 className="project-name">{metaData.name}</h1>
                        <p className="project-organization-name">{metaData.organization}</p>
                    </div>

                    <div>
                        <h1 className="quality-gate-status">{metaData.qualityGate}</h1>
                        <p className="quality-gate-label">Quality Gate</p>
                    </div>
                </div>

                <div className="detailed-page-cards-container">
                     {
                        details.map(item => <DetailedPageValueArch loading={loading} key={item.name} item={item} />)
                     }
                </div>

                <div className="detailed-page-meta-data-container">
                    <div className="detailed-page-meta-data">
                        <h3 className="detailed-page-meta-data-label">Repo Visibility</h3>
                        <p className="detailed-page-meta-data-value">{metaData.visibility?metaData.visibility.toUpperCase(): ""}</p>
                    </div>
                    
                    <div className="detailed-page-meta-data">
                        <h3 className="detailed-page-meta-data-label">Lines of Code</h3>
                        <p className="detailed-page-meta-data-value">{ncloc} Lines</p>
                    </div>

                    <div className="detailed-page-meta-data">
                        <h3 className="detailed-page-meta-data-label">Last Analysis</h3>
                        <p className="detailed-page-meta-data-value">{moment(metaData.lastAnalysisDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    </div>
                </div>
            </div>
        </AuthBox>
    )
}

export default DetailedResultPage