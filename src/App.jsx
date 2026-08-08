import { BrowserRouter, Routes, Route } from 'react-router';
import Menu from './components/Menu';
import SalesAudit from './apps/sales-audit/SalesAudit';

const App = () => {
  return (
    <>
    <BrowserRouter basename="/ONYX-Tools/">
      <Routes>
        <Route path='/' element={ <Menu /> }/>
        <Route path='/bfpl-sales-audit' element={ <SalesAudit /> }/>
        <Route path='/bac-qb-tips' element={ <SalesAudit /> }/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App