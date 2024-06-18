import { Routes, Route } from 'react-router-dom'

import GlobalStyle from './GlobalStyle'

import Costumers from './pages/Costumers'

export default function App() {
   return (
      <>
         <Routes>
            <Route path="/costumers" element={<Costumers />} />
         </Routes>
         <GlobalStyle />
      </>
   )
}
