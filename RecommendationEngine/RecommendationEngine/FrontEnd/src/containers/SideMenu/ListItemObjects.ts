import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import BuildRoundedIcon from '@material-ui/icons/BuildRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import TuneRoundedIcon from '@material-ui/icons/TuneRounded';

type ListemItemObject = {
  name: string,
  children: ListemItemObject[],
  listItemIcon: OverridableComponent<SvgIconTypeMap>,
  path?: string
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
  path: '/recommendations-manage'
}

var results: ListemItemObject = {
  name: 'Results',
  children: [],
  listItemIcon: CheckCircleOutlineRoundedIcon,
  path: '/recommendations-results'
}

var jobs: ListemItemObject = {
  name: 'Jobs',
  children: [],
  listItemIcon: TuneRoundedIcon,
  path: '/recommendations-jobs'
}

var recommendations: ListemItemObject = {
  name: 'Recommendations',
  children: [manage, jobs, results],
  listItemIcon: ListAltRoundedIcon,
}

export const SideMenuItems = [dashboard, recommendations];