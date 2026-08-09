import { BrowserRouter, Routes, Route } from 'react-router';
import Menu from './components/Menu';
import SalesAudit from './apps/sales-audit/SalesAudit';
import TipsAlloc from './apps/tips-alloc/TipsAlloc';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Menu /> }/>
        <Route path='/bfpl-sales-audit' element={ <SalesAudit /> }/>
        <Route path='/bac-qb-tips' element={ <TipsAlloc /> }/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App