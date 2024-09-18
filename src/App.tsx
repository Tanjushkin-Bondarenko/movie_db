import {createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Outlet} from 'react-router-dom';
import { AppHeader } from './Header/AppHeader';
import { Provider } from 'react';

const defaultTeme = createTheme({
  palette: {
    primary: {
      main: '#039be5',
    },
    secondary: {
      main: '#29b6f6',
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
})


function App() {

  return (
    <ThemeProvider theme={defaultTeme}>
      <CssBaseline/>
        <AppHeader />
        <main>
          <Outlet/>
        </main>
    </ThemeProvider>
  );
}

export default App;
