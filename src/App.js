import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppTheme from './AppTheme';
import AppContentsContainer from './components/AppContentsContainer';

const App = () => (
  <MuiThemeProvider muiTheme={AppTheme}>
    <AppContentsContainer />
  </MuiThemeProvider>
);

export default App;
