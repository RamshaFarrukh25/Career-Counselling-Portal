/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { createTheme } from "@mui/material/styles";
// import Fade from "@mui/material/Fade";

// Material Dashboard 2 React base styles
import colors from "../theme/base/boxShadows";
import breakpoints from "../theme/base/breakpoints";
import typography from "../theme/base/typography";
import boxShadows from "../theme/base/boxShadows";
import borders from "../theme/base/borders";
import globals from "../theme/base/globals";

// Material Dashboard 2 React helper functions
import boxShadow from "../theme/functions/boxShadow";
import hexToRgb from "../theme/functions/hexToRgb";
import linearGradient from "../theme/functions/linearGradient";
import pxToRem from "../theme/functions/pxToRem";
import rgba from "../theme/functions/rgba";

// Material Dashboard 2 React components base styles for @mui material components
import sidenav from "../theme/components/sidenav";
import list from "../theme/components/list";
import listItem from "../theme/components/list/listItem";
import listItemText from "../theme/components/list/listItemText";
import card from "../theme/components/card";
import cardMedia from "../theme/components/card/cardMedia";
import cardContent from "../theme/components/card/cardContent";
import button from "../theme/components/button";
import iconButton from "../theme/components/iconButton";
import input from "../theme/components/form/input";
import inputLabel from "../theme/components/form/inputLabel";
import inputOutlined from "../theme/components/form/inputOutlined";
import textField from "../theme/components/form/textField";
import menu from "../theme/components/menu";
import menuItem from "../theme/components/menu/menuItem";
import switchButton from "../theme/components/form/switchButton";
import divider from "../theme/components/divider";
import tableContainer from "../theme/components/table/tableContainer";
import tableHead from "../theme/components/table/tableHead";
import tableCell from "../theme/components/table/tableCell";
import linearProgress from "../theme/components/linearProgress";
import breadcrumbs from "../theme/components/breadcrumbs";
import slider from "../theme/components/slider";
import avatar from "../theme/components/avatar";
import tooltip from "../theme/components/tooltip";
import appBar from "../theme/components/appBar";
import tabs from "../theme/components/tabs";
import tab from "../theme/components/tabs/tab";
import stepper from "../theme/components/stepper";
import step from "../theme/components/stepper/step";
import stepConnector from "../theme/components/stepper/stepConnector";
import stepLabel from "../theme/components/stepper/stepLabel";
import stepIcon from "../theme/components/stepper/stepIcon";
import select from "../theme/components/form/select";
import formControlLabel from "../theme/components/form/formControlLabel";
import formLabel from "../theme/components/form/formLabel";
import checkbox from "../theme/components/form/checkbox";
import radio from "../theme/components/form/radio";
import autocomplete from "../theme/components/form/autocomplete";
import container from "../theme/components/container";
import popover from "../theme/components/popover";
import buttonBase from "../theme/components/buttonBase";
import icon from "../theme/components/icon";
import svgIcon from "../theme/components/svgIcon";
import link from "../theme/components/link";
import dialog from "../theme/components/dialog";
import dialogTitle from "../theme/components/dialog/dialogTitle";
import dialogContent from "../theme/components/dialog/dialogContent";
import dialogContentText from "../theme/components/dialog/dialogContentText";
import dialogActions from "../theme/components/dialog/dialogActions";

export default createTheme({
  direction: "rtl",
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...container,
      },
    },
    MuiDrawer: { ...sidenav },
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiCard: { ...card },
    MuiCardMedia: { ...cardMedia },
    MuiCardContent: { ...cardContent },
    MuiButton: { ...button },
    MuiIconButton: { ...iconButton },
    MuiInput: { ...input },
    MuiInputLabel: { ...inputLabel },
    MuiOutlinedInput: { ...inputOutlined },
    MuiTextField: { ...textField },
    MuiMenu: { ...menu },
    MuiMenuItem: { ...menuItem },
    MuiSwitch: { ...switchButton },
    MuiDivider: { ...divider },
    MuiTableContainer: { ...tableContainer },
    MuiTableHead: { ...tableHead },
    MuiTableCell: { ...tableCell },
    MuiLinearProgress: { ...linearProgress },
    MuiBreadcrumbs: { ...breadcrumbs },
    MuiSlider: { ...slider },
    MuiAvatar: { ...avatar },
    MuiTooltip: { ...tooltip },
    MuiAppBar: { ...appBar },
    MuiTabs: { ...tabs },
    MuiTab: { ...tab },
    MuiStepper: { ...stepper },
    MuiStep: { ...step },
    MuiStepConnector: { ...stepConnector },
    MuiStepLabel: { ...stepLabel },
    MuiStepIcon: { ...stepIcon },
    MuiSelect: { ...select },
    MuiFormControlLabel: { ...formControlLabel },
    MuiFormLabel: { ...formLabel },
    MuiCheckbox: { ...checkbox },
    MuiRadio: { ...radio },
    MuiAutocomplete: { ...autocomplete },
    MuiPopover: { ...popover },
    MuiButtonBase: { ...buttonBase },
    MuiIcon: { ...icon },
    MuiSvgIcon: { ...svgIcon },
    MuiLink: { ...link },
    MuiDialog: { ...dialog },
    MuiDialogTitle: { ...dialogTitle },
    MuiDialogContent: { ...dialogContent },
    MuiDialogContentText: { ...dialogContentText },
    MuiDialogActions: { ...dialogActions },
  },
});
