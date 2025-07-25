import React from "react"
import AppRouter from "../navigation/AppRouter"
import { HelmetProvider } from 'react-helmet-async';

const App = () => {
  return (
 
      <HelmetProvider>
      <AppRouter />
    </HelmetProvider>
  )
}

export default App