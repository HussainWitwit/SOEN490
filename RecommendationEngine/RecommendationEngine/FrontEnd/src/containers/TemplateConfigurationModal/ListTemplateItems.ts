import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { FaSolarPanel } from 'react-icons/fa';
import { BsFillGearFill } from 'react-icons/bs';
import {GiBatteryPackAlt } from 'react-icons/gi';
import { BiShapeTriangle } from 'react-icons/bi';
import {  VscCircuitBoard } from 'react-icons/vsc';
import { GoCalendar } from 'react-icons/go';

type ListTemplateObject = {
    name: string,
    listItemIcon: OverridableComponent<SvgIconTypeMap>,
    description: string,
    inputList: string [],
    algorithmName: string, 
};

var washOptimization: ListTemplateObject = {
    name: 'Yearly Wash Optimization',
    listItemIcon: FaSolarPanel,
    description: "This recommendation is used to suggest the optimal time to wash your solar panels. The algorithm takes in consideration:  dates  of soiling seasons, the rate of soiling, the energy price, predicated energy, cost of cleaning and more.",
    inputList:  ["Span Increment", "Center Point Increment", "Accelerator", "Soiling Season Buffer"],
    algorithmName: "Yearly Wash Optimization"
};

var adjustedWashOptimization: ListTemplateObject = {
    name: 'Ajusted Wash Optimization',
    listItemIcon: GoCalendar,
    description: "",
    inputList: [],
    algorithmName:""
};

var gearboxReplacement: ListTemplateObject = {
    name: 'Gearbox Replacement',
    listItemIcon: BsFillGearFill,
    description: "",
    inputList: [],
    algorithmName:""
};

var fuseReplacement: ListTemplateObject = {
    name: 'Fuse Replacement',
    listItemIcon: GiBatteryPackAlt ,
    description: "",
    inputList: [],
    algorithmName:""
};

var panelAngle: ListTemplateObject = {
    name: 'Panel Angle',
    listItemIcon: BiShapeTriangle,
    description: "",
    inputList: [],
    algorithmName:""
};

var other: ListTemplateObject = {
    name: 'Other',
    listItemIcon: VscCircuitBoard,
    description: "",
    inputList: [],
    algorithmName:""
};

export const TemplateItems = [washOptimization, adjustedWashOptimization, gearboxReplacement, fuseReplacement, panelAngle, other]