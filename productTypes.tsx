import { GiCornerFlag, GiWindmill, GiFamilyHouse, GiBarn, GiPalmTree } from 'react-icons/gi';
import { MdOutlineMapsHomeWork, MdCabin, MdSportsGolf, MdOutlineBedroomParent } from 'react-icons/md';
import { PiSwimmingPool, PiFire,PiCastleTurret, PiKeyLight } from 'react-icons/pi';
import { TbSailboat, TbChefHat, TbBeach, TbCamper } from 'react-icons/tb';
import { AiOutlineCoffee } from 'react-icons/ai';
import { IoIosSnow } from 'react-icons/io';
import { TbBuildingSkyscraper } from 'react-icons/tb';

export interface IProductTypeItem {
    id?: number;
    icon?: React.ReactNode;
    label?:  string;
}

const productTypes: IProductTypeItem[] = [
    {
        id: 1,
        icon: <MdOutlineBedroomParent />,
        label: "Pepper"
    },
    {
        id:2,
        icon: <GiPalmTree />,
        label: "Tomatoes"
    },
    {
        id: 3,
        icon: <GiBarn />,
        label: "Yam"
    },
    {
        id: 4,
        icon: <PiKeyLight />,
        label: "Plantain"
    },
    {
        id: 5,
        icon: <TbBuildingSkyscraper />,
        label: "Banana"
    },
    {
        id: 6,
        icon: <GiFamilyHouse />,
        label: "cassava"
    },
    {
        id: 7,
        icon: <PiFire />,
        label: "Garri"
    },
    {
        id: 8,
        icon: <PiCastleTurret />,
        label: "Beans"
    },
    {
        id: 9,
        icon: <TbBeach />,
        label: "Palm oil"
    },
    {
        id: 10,
        icon: <MdCabin />,
        label: "Palm Tree Fruit"
    },
    {
        id: 11,
        icon: <TbChefHat />,
        label: "Cucumber"
    },
    {
        id: 12,
        icon: <AiOutlineCoffee />,
        label: "Vegetable"
    },
    {
        id: 13,
        icon: <MdOutlineMapsHomeWork />,
        label: "Spices"
    },
    {
        id: 14,
        icon: <PiSwimmingPool />,
        label: "Flour"
    },
    {
        id: 15,
        icon: <GiCornerFlag />,
        label: "Beef"
    },
    {
        id: 16,
        icon: <TbCamper />,
        label: "Chicken"
    },
    {
        id: 17,
        icon: <TbSailboat />,
        label: "Pork"
    },
    {
        id: 18,
        icon: <IoIosSnow />,
        label: "Chickpeas"
    },
    {
        id: 19,
        icon: <GiWindmill />,
        label: "Lentils"
    },
    {
        id: 20,
        icon: <MdSportsGolf />,
        label: "Rice"
    },
    {
        id: 21,
        icon: <MdSportsGolf />,
        label: "Rice"
    },
    {
        id: 22,
        icon: <MdSportsGolf />,
        label: "Rice"
    },
    {
        id: 23,
        icon: <MdSportsGolf />,
        label: "Rice"
    },
    {
        id: 24,
        icon: <MdSportsGolf />,
        label: "Rice"
    },
    {
        id: 25,
        icon: <MdSportsGolf />,
        label: "Rice"
    },
    {
        id: 26,
        icon: <MdSportsGolf />,
        label: "Rice"
    },
    {
        id: 27,
        icon: <MdSportsGolf />,
        label: "Rice"
    },
    {
        id: 28,
        icon: <MdSportsGolf />,
        label: "Rice"
    },
    {
        id: 29,
        icon: <MdSportsGolf />,
        label: "Rice"
    },
    {
        id: 30,
        icon: <GiPalmTree />,
        label: "Tomatoes"
    },
]

export default productTypes;