import { useState } from 'react';

import HeadingSection from '../../components/HeadingSection';
import DragAndDropFile from '../../components/fields/DragAndDropFile';

import './_commission-reporting.scss';

const CommissionReporting = () => {
  // 0 = BFPL
  // 1 = BAC

  const [platform, setPlatform] = useState(0);

  const handleTabSelect = (e) => {
    const data = e.currentTarget.dataset;
    console.log(data.platform);

    setPlatform(data.platform);
  }

  const handleProcessed = () => {

  }

  return (
    <main className="main-container commission-reporting">
      <HeadingSection
        heading="Commission Reporting"
        body="The Commission & Payroll Reporting Tool is a specialized financial utility built to streamline payroll reconciliation for BAC and BFPL operations. Designed to eliminate manual spreadsheet math and reduce human error, this app transforms raw booking data into accurate, compliant, and easy-to-read compensation reports for your staff."
        includeBack={true}
      />
      <section className="content-container">
        <div className="container">
          <div className="row">
            <div className="platform-area">
              <h2 className="subheading">Select Platform</h2>
              <div className="platform-tabs">
                <button
                  className={['tab-button', 'selected'].join(' ')}
                  onClick={handleTabSelect}
                  data-platform="booker"
                >
                    Booker
                </button>
                <button
                  className="tab-button"
                  onClick={handleTabSelect}
                  data-platform="vagaro"
                >
                    Vagaro
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="file-area col-12 col-md-6">
              <div className="file-field col-12">
                <DragAndDropFile
                  title="Commission CSV"
                  description={'Drag & drop a CSV here, or click to select'}
                  buttonLabel={'Select File'}
                  onFileProcessed={handleProcessed}
                  allowedFileTypes={['.csv']}
                />
              </div>
            </div>
            <div className="input-area col-12 col-md-6">
              <h3 className="label">Work hours</h3>
              <input className="hours-input" type="number" />
            </div>
          </div>
          <div className="row">
            <div className="results-area">
              <h2 className="subheading">Summary</h2>
              <p>Pretax commission</p>
              <p>Tips</p>
              <p>Totals</p>
              <p>Calculated hours</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
export default CommissionReporting;