import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import Header from './components/Header/Header';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header text={"Analytics Dashboard"}/>
        <br/>
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;
