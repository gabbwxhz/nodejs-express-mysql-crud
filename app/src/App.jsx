import { Routes, Route } from 'react-router-dom'

import GlobalStyle from './GlobalStyle'

import Customers from './pages/Customers'
import Employees from './pages/Employees'

export default function App() {
   return (
      <>
         <Routes>
            <Route path="/customers" element={<Customers />} />
            <Route path="/employees" element={<Employees />} />
         </Routes>
         <GlobalStyle />
      </>
   )
}
