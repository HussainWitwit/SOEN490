import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import WorkOutlineRoundedIcon from '@material-ui/icons/WorkOutlineRounded';
import BuildRoundedIcon from '@material-ui/icons/BuildRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import TuneRoundedIcon from '@material-ui/icons/TuneRounded';
import EventRoundedIcon from '@material-ui/icons/EventRounded';
import { FaSolarPanel } from 'react-icons/fa';
// import { GiSolarPower } from 'react-icons/fa';
// import { GiGears } from 'react-icons/gi';
import { BsFillGearFill } from 'react-icons/bs';
import {GiBatteryPackAlt } from 'react-icons/gi';
// import { FiBatteryCharging } from 'react-icons/fi';
import {TiBatteryCharge } from 'react-icons/ti';
// import { BsFillGearFill } from 'react-icons/fa';
import { BiShapeTriangle } from 'react-icons/bi';
import {  VscCircuitBoard } from 'react-icons/vsc';
import { MdPermDeviceInformation } from 'react-icons/md';


type ListTemplateObject = {
    name: string,
    listItemIcon: OverridableComponent<SvgIconTypeMap>,
};

type Separator = {
    name: string;
}

var washOptimization: ListTemplateObject = {
    name: 'Wash Optimization',
    listItemIcon: FaSolarPanel,
}

var gearboxReplacement: ListTemplateObject = {
    name: 'Gear Replacement',
    listItemIcon: BsFillGearFill,
}

var panelAngle: ListTemplateObject = {
    name: 'Panel Angle',
    listItemIcon: BiShapeTriangle,
};


var fuseReplacement: ListTemplateObject = {
    name: 'Fuse Replacement',
    listItemIcon: GiBatteryPackAlt ,
}

var etc: ListTemplateObject = {
    name: 'ETC',
    listItemIcon: VscCircuitBoard,
}

var other: ListTemplateObject = {
    name: 'Other',
    listItemIcon: MdPermDeviceInformation,
}



export const TemplateItems = [washOptimization, gearboxReplacement, fuseReplacement, panelAngle, etc, other]