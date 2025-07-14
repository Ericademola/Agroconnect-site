import { GiCornerFlag, GiWindmill, GiFamilyHouse, GiMountainCave, GiBarn, GiPalmTree } from 'react-icons/gi';
import { MdOutlineMapsHomeWork, MdCabin, MdSportsGolf, MdOutlineBedroomParent } from 'react-icons/md';
import { PiSwimmingPool, PiFire,PiCastleTurret, PiKeyLight } from 'react-icons/pi';
import { TbSailboat, TbChefHat, TbBeach, TbCamper } from 'react-icons/tb';
import { AiOutlineCoffee } from 'react-icons/ai';
import { IoIosSnow } from 'react-icons/io';
import { TbBuildingSkyscraper } from 'react-icons/tb';
import { Icon } from '@/components/Header/Header';

const productType: Icon[] = [
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

]

export default productType;