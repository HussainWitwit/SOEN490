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


type ListTemplateObject = {
    name: string,
    listItemIcon: OverridableComponent<SvgIconTypeMap>,
};

type Separator = {
    name: string;
}

var washOptimization: ListTemplateObject = {
    name: 'Wash Optimization',
    listItemIcon: DashboardRoundedIcon,
}

var gearboxReplacement: ListTemplateObject = {
    name: 'Gear Replacement',
    listItemIcon: BuildRoundedIcon,
}

var panelAngle: ListTemplateObject = {
    name: 'Panel Angle',
    listItemIcon: WorkOutlineRoundedIcon,
};


var fuseReplacement: ListTemplateObject = {
    name: 'Fuse Replacement',
    listItemIcon: CheckCircleOutlineRoundedIcon,
}

var etc: ListTemplateObject = {
    name: 'ETC',
    listItemIcon: SettingsRoundedIcon,
}

var other: ListTemplateObject = {
    name: 'Other',
    listItemIcon: EventRoundedIcon,
}



export const TemplateItems = [washOptimization, gearboxReplacement, fuseReplacement, panelAngle, etc, other]