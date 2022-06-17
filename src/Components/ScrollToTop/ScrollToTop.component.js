import React, { useEffect, useState } from 'react';
import arrow from '../../assets/up-arrow.png';
import './ScrollToTop.styles.css';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleScroll = () => {
        if (window.scrollY > 200) {
            setIsVisible(true);
        }else {
            setIsVisible(false);
        }
    }
    const handleMoveToTop = () => {
        window.scrollTo(0, 0)
    }

    if (!isVisible) {
        return null 
    }else {
        return (
            <div className='scroll-to-top-container slide-left' onClick={handleMoveToTop}>
                <img className='move-arrow' src={arrow} />
            </div>
        )
    }
    
}

export default ScrollToTop;