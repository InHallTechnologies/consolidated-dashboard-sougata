import { CircularProgress } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getProjectList } from '../../backend/iz-analyser-api';
import CheckBox from '../CheckBox/CheckBox.component';
import IZAnalyserProjectListArch from '../IZAnalyserProjectListArch/IZAnalyserProjectListArch.component';
import './IZAnalyserProjectList.styles.css';

const IZAnalyserProjectList = () => {
    const [projectList, setProjectList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getList = async () => {
            const listResponse = await getProjectList();
            if (listResponse.components) {
                setProjectList([...listResponse.components]);
            }
            setLoading(false);
        }
        getList();
    }, [])

    return (
        <div className='sonar-cloud-project-list-container'>
            <div className='sonar-cloud-project-list-content'>
                <h1 className='sonar-cloud-project-headline'>IZ Analyser Project List</h1> 
                {
                    loading
                    ?
                    <div style={{width:"100%", display:'flex', justifyContent:'center', alignItems:'center', padding:'60px'}}>
                        <CircularProgress isIndeterminate  />
                    </div>
                    :
                    <div className='sonar-cloud-project-list'>
                        {
                            projectList.map((item, index) => <IZAnalyserProjectListArch project={item} key={item.key} index={index} />)
                        } 
                    </div>
                }
                
            </div>
            
            <div className='list-filter-separator' />

            <div className='sonar-cloud-project-list-filters'>
                <div>
                    <h1 className='sonar-cloud-project-headline'>Filters</h1> 
                    <div className='sonar-cloud-filter-list'>
                        <div className='sonar-cloud-filter'>
                            <h3 className='filter-title'>Quality Gate</h3>
                            <CheckBox title={"Passed"} />
                            <CheckBox title={"Failed"} />

                        </div>

                        <div className='sonar-cloud-filter'>
                            <h3 className='filter-title'>Bugs</h3>
                            <CheckBox title={"A"} />
                            <CheckBox title={"B"} />
                            <CheckBox title={"C"} />
                            <CheckBox title={"D"} />
                            <CheckBox title={"E"} />
                           
                        </div>

                        <div className='sonar-cloud-filter'>
                            <h3 className='filter-title'>Vulnerabilities</h3>
                            <CheckBox title={"A"} />
                            <CheckBox title={"B"} />
                            <CheckBox title={"C"} />
                            <CheckBox title={"D"} />
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default IZAnalyserProjectList;