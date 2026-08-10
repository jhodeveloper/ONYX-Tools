import { useState } from 'react';

import HeadingSection from '../../components/HeadingSection';

import './_commission-reporting.scss';

const CommissionReporting = () => {
  // 0 = BFPL
  // 1 = BAC

  const [location, setLocation] = useState(0);
  return (
    <main className="main-container commission-reporting">
      <HeadingSection
        heading="Commission Reporting"
        body="The Commission & Payroll Reporting Tool is a specialized financial utility built to streamline payroll reconciliation for BAC and BFPL operations. Designed to eliminate manual spreadsheet math and reduce human error, this app transforms raw booking data into accurate, compliant, and easy-to-read compensation reports for your staff."
        includeBack={true}
      />
      <section className="content-container">
        <div className="container">

        </div>
      </section>
    </main>
  )
}
export default CommissionReporting;