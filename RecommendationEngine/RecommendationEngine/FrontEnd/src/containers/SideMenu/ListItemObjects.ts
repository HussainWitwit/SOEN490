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

type ListemItemObject = {
    name: string,
    children: ListemItemObject[],
    listItemIcon: OverridableComponent<SvgIconTypeMap>,
    path: string
};

type Separator = {
    name: string;
}

var dashboard: ListemItemObject = {
    name: 'Dashboard',
    children: [],
    listItemIcon: DashboardRoundedIcon,
    path: '/'
}

var manage: ListemItemObject = {
    name: 'Manage',
    children: [],
    listItemIcon: BuildRoundedIcon,
    path: '/recommendations/manage'
}

var results: ListemItemObject = {
    name: 'Results',
    children: [],
    listItemIcon: CheckCircleOutlineRoundedIcon,
    path: '/recommendations/results'
}

var jobs: ListemItemObject = {
    name: 'Jobs',
    children: [],
    listItemIcon: TuneRoundedIcon,
    path: '/recommendations/jobs'
}

var recommendations: ListemItemObject = {
    name: 'Recommendations',
    children: [manage, jobs, results],
    listItemIcon: ListAltRoundedIcon,
    path: '/recommendations/manage'
}

var workOrders: ListemItemObject = {
    name: 'Work Orders',
    children: [],
    listItemIcon: WorkOutlineRoundedIcon,
    path: '/work-orders'

};

var settings: Separator = {
    name: 'Settings'
}

var mainSettings: ListemItemObject = {
    name: 'Main Settings',
    children: [],
    listItemIcon: SettingsRoundedIcon,
    path: '/settings'

};

var notifications: ListemItemObject = {
    name: 'Notifications',
    children: [],
    listItemIcon: NotificationsRoundedIcon,
    path: '/notifications'
};


export const SideMenuItems = [dashboard, recommendations, workOrders, settings, mainSettings, notifications];