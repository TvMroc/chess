import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light' 
  },
});

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <App />
    <CssBaseline />
  </ThemeProvider>
)
