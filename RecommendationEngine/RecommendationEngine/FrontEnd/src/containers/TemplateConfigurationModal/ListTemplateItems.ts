import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { FaSolarPanel } from 'react-icons/fa';
import { BsFillGearFill } from 'react-icons/bs';
import {GiBatteryPackAlt } from 'react-icons/gi';
import { BiShapeTriangle } from 'react-icons/bi';
import {  VscCircuitBoard } from 'react-icons/vsc';
import { MdPermDeviceInformation } from 'react-icons/md';

type ListTemplateObject = {
    name: string,
    listItemIcon: OverridableComponent<SvgIconTypeMap>,
};

var washOptimization: ListTemplateObject = {
    name: 'Yearly Wash Optimization',
    listItemIcon: FaSolarPanel,
};

var gearboxReplacement: ListTemplateObject = {
    name: 'Gear Replacement',
    listItemIcon: BsFillGearFill,
};

var panelAngle: ListTemplateObject = {
    name: 'Panel Angle',
    listItemIcon: BiShapeTriangle,
};

var fuseReplacement: ListTemplateObject = {
    name: 'Fuse Replacement',
    listItemIcon: GiBatteryPackAlt ,
};

var etc: ListTemplateObject = {
    name: 'ETC',
    listItemIcon: VscCircuitBoard,
};

var other: ListTemplateObject = {
    name: 'Other',
    listItemIcon: MdPermDeviceInformation,
};

export const TemplateItems = [washOptimization, gearboxReplacement, fuseReplacement, panelAngle, etc, other]