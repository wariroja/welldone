import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import './App.css';
import { Main } from './components/Main/Main';
import { extendTheme } from '@chakra-ui/react';
const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
})

function App() {
  return (
    <ChakraProvider theme={theme}>
    <div className="App">
      <Main />
    </div>
    </ChakraProvider>
  );
}

export default App;
