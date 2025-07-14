import './Nav.css';
import { IoMdSwitch } from 'react-icons/io';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
// import { NavLink } from 'react-router-dom';

import { ReactElement } from "react";
import productType from '../../../productType';
import Link from 'next/link';

export interface Icon {
    id?: number;
    icon?: ReactElement<string, string>;
    label?:  string;
}

const Header = ({getPicDisplay}:any) => {  
    
    //function to show left button

    const [leftArrow, setLeftArrow] = useState<boolean>(false);



    // const rightButton = document.getElementById('rightButton');

    // const showLeftArror = () => {
    //     setLeftArrow(true);
    // }

    // rightButton?.addEventListener('click', showLeftArror);


    //function to show left button

    const [rightArrow, setRightArrow] = useState<boolean>(true);

    // const showRightArror = () => {
    //     setRightArrow(false);
    // }

    // useEffect(() => {
    //     const showRightArror = () => {
    //         setRightArrow(false);
    //     }
    //     showRightArror()
    // }, [rightArrow])


    // function to dispay current hot trand first

    const [displayedTrends, setDisplayedTrends] = useState<Icon[]>();
    const [firstTrends, setFirstTrends] = useState<string>();

    const currentOne = () => {

        const navList:Icon[] = productType.slice();
        let pickedNav:Icon = {};
        const index:number = Math.round(new Date().getMinutes() / 4);
        pickedNav = navList[index]
        navList.splice(index, 1);
        setFirstTrends(pickedNav.label);
        navList.unshift(pickedNav); 
        setDisplayedTrends(navList);

    }

    useEffect(() => {
        currentOne();
    }, []);


    // function to displayPic

    const setPicDisplay = () => {
        if (getPicDisplay) {
            getPicDisplay(firstTrends)
        }
    }

    useEffect(() => {
        setPicDisplay()
    }, [firstTrends])

    
    //function to add bottom border to nav

    // window.addEventListener('scroll', (e:any) => {
    //     const line = document.getElementById('lineNav')
    //     if(window.scrollY > 0) {
    //         line?.classList.add('horizontal_lineNav');
    //     } else { line?.classList.remove('horizontal_lineNav'); }
    // });

    //function to slider nav

    const navWrapper = useRef<HTMLDivElement>(null!);

    const nav = {
        height: '72px',
        display: 'flex',
        overflow: 'hidden',
        width: '100%',
    }

    const sideScroll = (
        element: HTMLDivElement,
        speed: number,
        distance: number,
        step: number
        ) => {
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
          element.scrollLeft += step;
          scrollAmount += Math.abs(step);
          if (scrollAmount >= distance) {
            clearInterval(slideTimer);
          }
        }, speed);
    };


    return (
        <div>

            <nav className='nav_top'>
                
                <div 
                className='nav'
                style={nav} 
                ref={navWrapper}>

                    {/* { leftArrow && */}
                        <div className='left_arrowh'>

                            <span 
                            className='button' 
                            onClick={() => {
                            sideScroll(navWrapper.current, 25, 300, -40);
                            }}>
                                <MdKeyboardArrowLeft/>
                            </span>

                        </div>
                    {/* } */}

                    {displayedTrends && displayedTrends.map((trend:Icon) => <div key={trend.id}>

                        <Link href={`/Trendings/${trend.label}`} >

                            <div className='trend_nav'>

                                <div className='trend_icon'>
                                    {trend.icon}
                                </div>  

                                <span className='text'>{trend.label}</span>

                                <div className='horizontal_lineIcon'></div>

                            </div>

                        </Link>

                    </div>)}
                        
                    <div className='right_arrow'>

                        {/* {rightArrow &&  */}
                            <span className='button_base'>
                                <span 
                                className='button'
                                id='rightButton'
                                onClick={() => {
                                sideScroll(navWrapper.current, 25, 300, +40);
                                }}>
                                    <MdKeyboardArrowRight/>
                                </span>
                            </span>
                        {/* } */}

                        <span className='filter'><IoMdSwitch /> fliter</span>
                    
                    </div>
                        
                </div>

            </nav>

            <div id='lineNav'></div>

        </div>
    )
}
export default Header