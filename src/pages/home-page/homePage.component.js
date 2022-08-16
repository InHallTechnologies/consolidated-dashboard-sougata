import React, { useContext, useEffect, useState } from "react";
import AuthBox from "../../Components/AuthBox/AuthBox.component";
import './homePage.styles.css';
import logo from '../../assets/logo.svg';
import { FiSearch } from 'react-icons/fi';
import { Button, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import SonarCloudProjectList from "../../Components/SonarCloudProjectList/SonarCloudProjectList.component";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop.component";
import IZAnalyserProjectList from "../../Components/IzAnalyserProjectList/IzAnalyserProjectList.component";
import { useSearchParams } from "react-router-dom";
import context from "../../context/app-context";
import menuIcon from "../../assets/dots.png"
import { firebaseAuth } from "../../backend/firebase-handler";
import MenuIcon from "../../Components/MenuIcon/menu-icon.component";

const HomePage = () => {
    const [currentTab, setCurrentTab] = useState("SonarCloud");
    const [searchParams, setSearchParams] = useSearchParams();
    const [userData, setUserData] = useContext(context)

    console.log(userData)

    useEffect(() => {
        if (!searchParams.get('viewport')) {
            setSearchParams({viewport: 'SonarCloud'});
        }
    }, []);

    useEffect(() => {
        if (searchParams.get('viewport')) {
            setCurrentTab(searchParams.get('viewport'))
        }
        
    }, [searchParams])

    const handleTabShift = tabType => {
        setSearchParams({viewport: tabType})
    }

    return(
        <AuthBox className="home-page-main-container main-pages-container">
            <div className="home-page-navigation-container">
                <img className="navigation-logo" alt="Consolidated Dashboard" src={logo} />
                <div className="search-menu-container">
                    <div className="search-bar-container">
                        <FiSearch size={20} color='#c3c3c3'/>
                        <input className="search-bar" placeholder="Search by project name" />
                    </div>
                    <Menu>
                        <MenuButton as={IconButton} aria-label='Options' icon={<MenuIcon/>} />
                        <MenuList>
                            <MenuItem onClick={()=>{firebaseAuth.signOut()}} >Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </div>
            <div className="home-page-tab-container">
                <Button padding={"10px 35px"} onClick={_ => handleTabShift("SonarCloud")} color={currentTab === "SonarCloud" ? "white": "#464646"} backgroundColor={currentTab === "SonarCloud" ? 'teal' : '#FEE19D'} borderRadius={'100px'} className={currentTab === "SonarCloud" ?"tab-button active": 'tab-button non-active'}>Sonar Cloud Scan</Button>
                <Button padding={"10px 35px"} onClick={_ => handleTabShift("IZAnalyser")} color={currentTab === "IZAnalyser" ? "white": "#464646"} backgroundColor={currentTab === "IZAnalyser" ? 'teal' : '#FEE19D'} borderRadius={'100px'} className={currentTab === "IZAnalyser" ?"tab-button active": 'tab-button non-active'}>IZ Analyser Scan</Button>
                <Button padding={"10px 35px"} backgroundColor='#FEE19D' borderRadius={'100px'} className="tab-button non-active">Fortify On Demand Scan</Button>
            </div>

            {
                currentTab === "SonarCloud"
                ?
                <div>
                    <SonarCloudProjectList />
                </div>
                :
                null
            }
           
            {
                currentTab === "IZAnalyser"
                ?
                <div>
                    <IZAnalyserProjectList />
                </div>
                :
                null
            }
            

            <ScrollToTop />
        </AuthBox>
    )
}

export default HomePage;


// demisto-snow-dfn-proxy