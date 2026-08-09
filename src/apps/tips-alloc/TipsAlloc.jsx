import { useState } from 'react';

import { formatNumber } from '../../utils/Utils';

import DragAndDropFile from "../../components/fields/DragAndDropFile";
import HeadingSection from "../../components/HeadingSection";

import './_tips-alloc.scss';

const TipsAlloc = () => {
  const shortcutList = [
    {
      label: 'Vagaro Tips',
      value: 'Vagaro tip'
    },
  ];

  const [filterInputValue, setFilterInputValue] = useState('');
  const [csvData, setCsvData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredSum, setFilteredSum] = useState(0);

  const handleProcessed = (data) => {
    setCsvData(data);
  }

  const handleFilterChange = (e) => {
    const value = e.currentTarget.value;

    setFilterInputValue(value);
  }

  const handleFilterSubmit = () => {
    // Quickbooks export is setup strangely
    // _1 = Transaction Type
    // _2 = #
    // _3 = Name
    // _4 = Description
    // _5 = Account name
    // _6 = Item split account
    // _7 = Amount
    // _8 = Balance

    // Search and filter the data by the description column
    const results = csvData.filter( row => String(row['_4']).toLowerCase() === filterInputValue.toLowerCase());

    setFilteredData(results);

    let sum = 0;

    // Calculate the sum using the data found in the Amount column
    results.forEach( (value) => {
      const amount = formatNumber(value['_7']);
      sum += amount;
    });

    setFilteredSum(sum.toFixed(2));
  }

  const handleShortcutClick = (e) => {
    const data = e.currentTarget.dataset.value;
    
    setFilterInputValue(data);
  }

  return (
    <main className="main-container tips-alloc">
      <HeadingSection
        heading='BAC QuickBooks Tips Re-Allocation Tool'
        body={['Re-allocate BAC QuickBook tips.', 'Upload a file and specify the rows to quickly calculate totals.']}
      />
      <section className="content-container">
        <div className="container">
          <div className='row'>
            <div className="input-area col-12 col-md-6">
              <div className="input-field quickbooks col-12">
                <DragAndDropFile
                  title='QuickBooks CSV'
                  description={'Drag & drop a CSV here, or click to select'}
                  buttonLabel={'Select File'}
                  onFileProcessed={handleProcessed}
                  allowedFileTypes={['.csv']}
                />
              </div>
            </div>
            <div className='content-area col-12 col-md-6'>
              <div className='content-area-wrapper'>
                <div className="filter-input-area">
                  <div className="filter-input-container">
                    <h2 className="subheading">Description to Sum</h2>
                    <div className="filter-input-field-container">
                      <input
                        className="filter-input-field body col-12 col-md-12 col-lg-6" 
                        type="text"
                        placeholder="e.g., Vagaro tip"
                        onChange={handleFilterChange}
                        value={filterInputValue}
                      >
                      </input>
                      <button
                        className="filter-submit"
                        onClick={handleFilterSubmit}
                      >
                          Calculate Total
                      </button>
                    </div>
                    <div className="filter-shortcuts-container">
                      <p className="body">Common Shortcuts</p>

                      <div className="filter-shortcuts">
                        {
                          shortcutList.map( (value, index) => {
                            return (
                              <button
                                className={'filter-shortcut-button'}
                                key={index}
                                data-value={value.value}
                                onClick={handleShortcutClick}
                              >
                                  {value.label}
                              </button>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="results-area">
                  <div className="results-container">
                    <h2 className="subheading">Calculated Sum</h2>
                    <p className='results-value'>${filteredSum}</p>
                    <p className='body'>From <strong>{filteredData.length}</strong> entries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default TipsAlloc;