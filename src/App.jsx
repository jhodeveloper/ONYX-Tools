import { BrowserRouter, Routes, Route } from 'react-router';
import Menu from './components/Menu';
import SalesAudit from './apps/sales-audit/SalesAudit';
import TipsAlloc from './apps/tips-alloc/TipsAlloc';
import CommissionReporting from './apps/commission-reporting/CommissionReporting';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Menu /> }/>
        <Route path='/bfpl-sales-audit' element={ <SalesAudit /> }/>
        <Route path='/bac-qb-tips' element={ <TipsAlloc /> }/>
        <Route path='/commission-reporting' element={ <CommissionReporting /> }/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App