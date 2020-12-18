import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { FaSolarPanel } from 'react-icons/fa';
import { BsFillGearFill } from 'react-icons/bs';
import {GiBatteryPackAlt } from 'react-icons/gi';
import { BiShapeTriangle } from 'react-icons/bi';
import {  VscCircuitBoard } from 'react-icons/vsc';
import { GoCalendar } from 'react-icons/go';
// import { MdSchedule } from 'react-icons/md';

type ListTemplateObject = {
    name: string,
    listItemIcon: OverridableComponent<SvgIconTypeMap>,
};

var washOptimization: ListTemplateObject = {
    name: 'Yearly Wash Optimization',
    listItemIcon: FaSolarPanel,
};

var adjustedWashOptimization: ListTemplateObject = {
    name: 'Ajusted Wash Optimization',
    listItemIcon: GoCalendar,
};

var gearboxReplacement: ListTemplateObject = {
    name: 'Gearbox Replacement',
    listItemIcon: BsFillGearFill,
};

var fuseReplacement: ListTemplateObject = {
    name: 'Fuse Replacement',
    listItemIcon: GiBatteryPackAlt ,
};

var panelAngle: ListTemplateObject = {
    name: 'Panel Angle',
    listItemIcon: BiShapeTriangle,
};

var other: ListTemplateObject = {
    name: 'Other',
    listItemIcon: VscCircuitBoard,
};

export const TemplateItems = [washOptimization, adjustedWashOptimization, gearboxReplacement, fuseReplacement, panelAngle, other]