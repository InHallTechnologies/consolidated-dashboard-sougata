import React from "react";
import AuthBox from "../../Components/AuthBox/AuthBox.component";
import './homePage.styles.css';
import logo from '../../assets/logo.svg';
import { FiSearch } from 'react-icons/fi';
import { Button } from "@chakra-ui/react";
import SonarCloudProjectList from "../../Components/SonarCloudProjectList/SonarCloudProjectList.component";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop.component";

const HomePage = () => {

    return(
        <AuthBox className="home-page-main-container main-pages-container">
            <div className="home-page-navigation-container">
                <img className="navigation-logo" alt="Consolidated Dashboard" src={logo} />
                <div className="search-bar-container">
                    <FiSearch size={20} color='#c3c3c3'/>
                    <input className="search-bar" placeholder="Search by project name" />
                </div>
            </div>
            <div className="home-page-tab-container">
                <Button padding={"10px 35px"} color='white' backgroundColor='teal' borderRadius={'100px'} className="tab-button active">SonarCloud</Button>
                <Button padding={"10px 35px"} backgroundColor='#FEE19D' borderRadius={'100px'} className="tab-button non-active">AzureDevbops</Button>
                <Button padding={"10px 35px"} backgroundColor='#FEE19D' borderRadius={'100px'} className="tab-button non-active">Qualys</Button>
            </div>

            <div>
                <SonarCloudProjectList />
            </div>

            <ScrollToTop />
        </AuthBox>
    )
}

export default HomePage;