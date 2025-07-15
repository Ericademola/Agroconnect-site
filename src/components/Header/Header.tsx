import './Nav.css';
import { useEffect, useRef, useState } from 'react';
// import { NavLink } from 'react-router-dom';

import { ReactElement } from "react";
import productType from '../../../productType';
import Link from 'next/link';
import { BackIcon, ForwardIcon, FilterIcon } from '@/Icons';
import { Button } from '../ui/button';
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
 } from '../ui/dropdown-menu';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

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

    // const nav = {
    //     height: '72px',
    //     display: 'flex',
    //     overflow: 'hidden',
    //     width: '100%',
    // }

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
        <div className='px-4'>

            <nav className='nav_top'>
                
                <div 
                className='flex items-center pjx-4'
                // style={nav} 
                ref={navWrapper}>

                    {/* { leftArrow && */}
                        {/* <div className='left_arrowh'>

                            <span 
                            className='button' 
                            onClick={() => {
                            sideScroll(navWrapper.current, 25, 300, -40);
                            }}>
                                <MdKeyboardArrowLeft/>
                            </span>

                        </div> */}
                    {/* } */}

                    <div className="mt-[10px] absolute left-0 py-[14.1px] pb-[10px] pl-[40px] bg-white shadow-[25px_0_10px_rgb(255,255,255)]">
                        <Button variant="secondary" className='rounded-full w-10 h-10 hover:shadow-[0_0_10px_#dddddd]'>
                            <BackIcon className="w-6 h-6" strokeWidth={3.5} />
                        </Button>
                    </div>

{/* <button
  class="mt-[30px] px-[5px] py-[2px] rounded-[66px] border border-[#ddd] text-[20px] cursor-pointer bg-white/90 hover:text-[21px] hover:shadow-[0_0_10px_#dddddd]"
>
  Click Me
</button> */}



                    {/* {displayedTrends && displayedTrends.map((trend:Icon) => <div key={trend.id}>

                        <Link href={`/Trendings/${trend.label}`} >

                            <div className="h-[60px] w-auto text-center items-end text-[#717171] hover:text-[#15803d] border-b-2 border-white hover:border-[#15803d] mx-[15px] pb-[8px]">

                                <div className='pt-[8px] text-[24px] w-fit m-auto'>
                                    {trend.icon}
                                </div>  

                                <span className=''>{trend.label}</span>


                            </div>

                        </Link>

                    </div>)} */}








{/* import * as React from "react"

import { Card, CardContent } from "@/components/ui/card" */}


{/* export function CarouselSpacing() {          
  return ( */}
    <Carousel className="">
        {/* w-full max-w-sm */}
      <CarouselContent className="">
        {/* -ml-1 */}
        {displayedTrends && displayedTrends.map((trend:Icon,) => (
          <CarouselItem key={trend.id} className="">
             {/* pl-1 md:basis-1/2 lg:basis-1/3 */}

            {/* <div className="p-1">
              <div>
                <div className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </div>
              </div>
            </div> */}

                        <Link href={`/Trendings/${trend.label}`} >

                            <div 
                            className="h-[60px] w-fit text-center items-end text-[#717171] hover:text-[#15803d] border-b-2 border-white hover:border-[#15803d] mx-[15px] pb-[8px]"
                            >

                                <div className='pt-[8px] text-[24px] w-fit m-auto'>
                                    {trend.icon}
                                </div>  

                                <span className=''>{trend.label}</span>


                            </div>

                        </Link>

          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>











                        
                    {/* <div className='right_arrow'> */}
                    <div className="absolute right-0 top-0 flex py-[6px] pb-[5px] items-center">

                        {/* {rightArrow &&  */}
                            {/* <span className='button_base'>
                                <span 
                                className='button'
                                id='rightButton'
                                onClick={() => {
                                sideScroll(navWrapper.current, 25, 300, +40);
                                }}>
                                    <MdKeyboardArrowRight/>
                                </span>
                            </span> */}
                        {/* } */}
                        
                        <Button variant="secondary" className='rounded-full w-10 h-10 hover:shadow-[0_0_10px_#dddddd]'>
                            <ForwardIcon className="w-6 h-6" />
                        </Button>


                        <DropdownMenu>
                            <DropdownMenuTrigger className='flex items-center justify-center gap-2 rounded-md border border-[#ddd] text-[20px] cursor-pointer bg-white/90 hover:text-[21px] hover:shadow-[0_0_10px_#dddddd] p-2'>
                                <FilterIcon className='w-4 h-4 text-[#717171]' /> Fliter
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Team</DropdownMenuItem>
                                <DropdownMenuItem>Subscription</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    
                    </div>
                        
                </div>

            </nav>

            <div id='lineNav'></div>

        </div>
    )
}
export default Header