import React from 'react';
import './CheckBox.styles.css';

const CheckBox = ({title, onChange, value}) => {
    
    return (
        <div className='check-box-container'>
            <p>{title}</p>
            <input type={'checkbox'} />
        </div>
    )
}

export default CheckBox;