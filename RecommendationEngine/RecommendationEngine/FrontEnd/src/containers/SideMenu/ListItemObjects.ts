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


type ListemItemObject = {
    name: string,
    children: ListemItemObject[],
    listItemIcon: OverridableComponent<SvgIconTypeMap>,
};

type Separator = {
    name: string;
}

var dashboard: ListemItemObject = {
    name: 'Dashboard',
    children: [],
    listItemIcon: DashboardRoundedIcon,
}

var manage: ListemItemObject = {
    name: 'Manage',
    children: [],
    listItemIcon: BuildRoundedIcon,
}

var results: ListemItemObject = {
    name: 'Results',
    children: [],
    listItemIcon: CheckCircleOutlineRoundedIcon,
}

var jobs: ListemItemObject = {
    name: 'Jobs',
    children: [],
    listItemIcon: TuneRoundedIcon,
}

var actions: ListemItemObject = {
    name: 'Actions',
    children: [],
    listItemIcon: EventRoundedIcon,
}

var recommendations: ListemItemObject = {
    name: 'Recommendations',
    children: [manage, jobs, results, actions],
    listItemIcon: ListAltRoundedIcon,
}

var workOrders: ListemItemObject = {
    name: 'Work Orders',
    children: [],
    listItemIcon: WorkOutlineRoundedIcon,
};

var settings: Separator = {
    name: 'Settings'
}

var mainSettings: ListemItemObject = {
    name: 'Main Settings',
    children: [],
    listItemIcon: SettingsRoundedIcon,
};

var notifications: ListemItemObject = {
    name: 'Notifications',
    children: [],
    listItemIcon: NotificationsRoundedIcon,
};


export const SideMenuItems = [dashboard, recommendations, workOrders, settings, mainSettings, notifications];