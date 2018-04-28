import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  blue500, blue700, grey400
  , grey100, grey500
  , cyan500, white,
} from 'material-ui/styles/colors';

const AppTheme = getMuiTheme({
  palette: {
    primary1Color: blue500,
    primary2Color: blue700,
    primary3Color: grey400,
    accent1Color: cyan500,
    accent2Color: grey100,
    accent3Color: grey500,
    alternateTextColor: white,
  },
});

export default AppTheme;

