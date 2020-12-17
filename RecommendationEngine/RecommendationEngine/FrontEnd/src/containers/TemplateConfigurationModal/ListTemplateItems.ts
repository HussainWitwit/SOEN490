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
    description: string,
    inputList: string [],
    algorithName: string
};

var washOptimization: ListTemplateObject = {
    name: 'Yearly Wash Optimization',
    listItemIcon: FaSolarPanel,
    description: "This recommendation is used to suggest the optimal time to wash your solar panels. The algorithm takes in consideration:  dates  of soiling seasons, the rate of soiling, the energy price, predicated energy, cost of cleaning and more.",
    inputList: ["Center Point", "Span Increment", "Soiling Season Buffer", "Acccelerator"],
    algorithName:"Yearly Wash Optimization Algorithm"
};

var gearboxReplacement: ListTemplateObject = {
    name: 'Gear Replacement',
    listItemIcon: BsFillGearFill,
    description: "Description of GR Algorithm",
    inputList: ["Input 1", "Input 2", "Input 3", "Input 4"],
    algorithName:"GR Algorithm"

};

var panelAngle: ListTemplateObject = {
    name: 'Panel Angle',
    listItemIcon: BiShapeTriangle,
    description: "Description of PA Algorithm",
    inputList: ["Input 5", "Input 6", "Input 7", "Input 8"],
    algorithName:"PA Algorithm"

};

var fuseReplacement: ListTemplateObject = {
    name: 'Fuse Replacement',
    listItemIcon: GiBatteryPackAlt ,
    description: "Description of F Algorithm",
    inputList: ["Input 9", "Input 10", "Input 11", "Input 12"],
    algorithName:"F Algorithm"

};

var etc: ListTemplateObject = {
    name: 'ETC',
    listItemIcon: VscCircuitBoard,
    description: "Description of ETC Algorithm",
    inputList: ["Input 13", "Input 14", "Input 15", "Input 16"],
    algorithName:"GR Algorithm"

};

var other: ListTemplateObject = {
    name: 'Other',
    listItemIcon: MdPermDeviceInformation,
    description: "Description of Other Algorithm",
    inputList: ["Input 17", "Input 18", "Input 19", "Input 20"],
    algorithName:"GR Algorithm"
};

export const TemplateItems = [washOptimization, gearboxReplacement, fuseReplacement, panelAngle, etc, other]