import { useState } from 'react';

import { formatNumber } from '../../utils/Utils';

import HeadingSection from '../../components/HeadingSection';
import DragAndDropFile from '../../components/fields/DragAndDropFile';
import './_sales-audit.scss';

const SalesAudit = () => {
  const [monerisAmericanExpress, setMonerisAmericanExpress] = useState(-1);
  const [monerisVisa, setMonerisVisa] = useState(-1);
  const [monerisMasterCard, setMonerisMasterCard] = useState(-1);
  const [monerisInterac, setMonerisInterac] = useState(-1);

  const [bookerAmericanExpress, setBookerAmericanExpress] = useState(-1);
  const [bookerVisa, setBookerVisa] = useState(-1);
  const [bookerMasterCard, setBookerMasterCard] = useState(-1);
  const [bookerInterac, setBookerInterac] = useState(-1);

  const colSizes = [
    'col-2',
    'col-2',
    'col-2',
    'col-2',
    'col-2'
  ]

  const handleMonerisProcessed = (data, filename) => {
    const amexData = data.filter(row => row['Card Type'] === 'American Express');
    const visaData = data.filter(row => row['Card Type'] === 'Visa');
    const masterCardData = data.filter(row => row['Card Type'] === 'Mastercard');
    const interacData = data.filter(row => row['Card Type'] === 'Interac');

    if (amexData.length > 0) {
      const amount = formatNumber(amexData[0]['Net Amount']);
      setMonerisAmericanExpress(amount);
    }
    if (visaData.length > 0) {
      const amount = formatNumber(visaData[0]['Net Amount']);
      setMonerisVisa(amount);
    }
    if (masterCardData.length > 0) {
      const amount = formatNumber(masterCardData[0]['Net Amount']);
      setMonerisMasterCard(amount);
    }
    if (interacData.length > 0) {
      const amount = formatNumber(interacData[0]['Net Amount']);
      setMonerisInterac(amount);
    }
  }

  const handleBookerProcessed = (data, filename) => {
    const marketingData = data.filter(row => row['textbox28'] === 'Marketing');

    if (marketingData.length > 0) {
      marketingData.forEach(row => {
        const parsed = row['__parsed_extra'];
        let amount;

        if (parsed[0] === 'American Express') {
          amount = formatNumber(parsed[1]);
          setBookerAmericanExpress(amount);
        } else if (parsed[0] === 'Visa') {
          amount = formatNumber(parsed[1]);
          setBookerVisa(amount);
        } else if (parsed[0] === 'Mastercard') {
          amount = formatNumber(parsed[1]);
          setBookerMasterCard(amount);
        } else if (parsed[0] === 'Debit/Interact') {
          amount = formatNumber(parsed[1]);
          setBookerInterac(amount);
        }
      });
    }
  }

  const compareResults = (monerisAmount, bookerAmount) => {
    if (monerisAmount === -1 || bookerAmount === -1) {
      return <span className={colSizes[3]}>N/A</span>;
    } else {
      if (monerisAmount === bookerAmount) {
        return (
          <span className={colSizes[3]}>&#9989;</span>
        );
      } else {
        return (
          <span className={colSizes[3]}>&#10060;</span>
        );
      }
    }
  }

  const onClearData = () => {
    window.location.reload();
    // setMonerisAmericanExpress(-1);
    // setMonerisVisa(-1);
    // setMonerisMasterCard(-1);
    // setMonerisInterac(-1);

    // setBookerAmericanExpress(-1);
    // setBookerVisa(-1);
    // setBookerMasterCard(-1);
    // setBookerInterac(-1);
  }

  const compareErrors = (monerisAmount, bookerAmount) => {
    if (monerisAmount === bookerAmount) {
      return <span className={colSizes[4]}>N/A</span>;
    } else {
      if (monerisAmount > bookerAmount) {
        const diff = (monerisAmount - bookerAmount).toFixed(2);

        return (
          <span className={colSizes[4]}>Moneris is higher by ${diff}</span>
        );
      } else if (monerisAmount < bookerAmount) {
        const diff = (bookerAmount - monerisAmount).toFixed(2);

        return (
          <span className={colSizes[4]}>Booker is higher by ${diff}</span>
        );
      }
    }
  }

  return (
    <main className='main-container sales-audit'>
      <HeadingSection
        heading='BFPL Sales Audit Tool'
        body={['Used for daily comparision between Moneris and Booker files.', 'Upload two CSV files to identify discrepancies instantly.']}
        includeBack={true}
      />
      <section className='content-container'>
        <div className='container'>
          <div className='input-area row'>
            <div className='input-field moneris col-12 col-md-6'>
              <DragAndDropFile
                title='Moneris CSV'
                description={'Drag & drop a CSV here, or click to select'}
                buttonLabel={'Select File'}
                onFileProcessed={handleMonerisProcessed} 
                allowedFileTypes={['.csv']} />
            </div>
            <div className='input-field booker col-12 col-md-6'>
              <DragAndDropFile
                title='Booker CSV'
                description={'Drag & drop a CSV here, or click to select'}
                buttonLabel={'Select File'}
                onFileProcessed={handleBookerProcessed} 
                allowedFileTypes={['.csv']} />
            </div>
          </div>
          <div className='results-area row'>
            <div className='results-wrapper col-12'>
              <div className='results-container'>
                <div className='results-heading'>
                  <h2 className='heading'>Results</h2>
                  <button
                    className='results-clear'
                    onClick={onClearData}
                  >
                    Clear Data
                  </button>
                </div>
                <div className='results-table'>
                  <div className='results-row headings row'>
                    <h3 className={colSizes[0]}>Card Type</h3>
                    <h3 className={colSizes[1]}>Moneris Amount</h3>
                    <h3 className={colSizes[2]}>Booker Amount</h3>
                    <h3 className={colSizes[3]}>Results</h3>
                    <h3 className={colSizes[4]}>Error</h3>
                  </div>

                  <div className='results-row row'>
                    <span className={colSizes[0]}>American Express</span>
                    <span className={colSizes[1]}>{monerisAmericanExpress !== -1 ? `$${monerisAmericanExpress.toFixed(2)}` : 'N/A'}</span>
                    <span className={colSizes[2]}>{bookerAmericanExpress !== -1 ? `$${bookerAmericanExpress.toFixed(2)}` : 'N/A'}</span>
                    { compareResults(monerisAmericanExpress, bookerAmericanExpress) }
                    {
                      compareErrors(monerisAmericanExpress, bookerAmericanExpress)
                    }
                  </div>

                  <div className='results-row row'>
                    <span className={colSizes[0]}>Visa</span>
                    <span className={colSizes[1]}>{monerisVisa !== -1 ? `$${monerisVisa.toFixed(2)}` : 'N/A'}</span>
                    <span className={colSizes[2]}>{bookerVisa !== -1 ? `$${bookerVisa.toFixed(2)}` : 'N/A'}</span>
                    { compareResults(monerisVisa, bookerVisa) }
                    {
                      compareErrors(monerisVisa, bookerVisa)
                    }
                  </div>

                  <div className='results-row row'>
                    <span className={colSizes[0]}>MasterCard</span>
                    <span className={colSizes[1]}>{monerisMasterCard !== -1 ? `$${monerisMasterCard.toFixed(2)}` : 'N/A'}</span>
                    <span className={colSizes[2]}>{bookerMasterCard !== -1 ? `$${bookerMasterCard.toFixed(2)}` : 'N/A'}</span>
                    { compareResults(monerisMasterCard, bookerMasterCard) }
                    {
                      compareErrors(monerisMasterCard, bookerMasterCard)
                    }
                  </div>
                  <div className='results-row row'>
                    <span className={colSizes[0]}>Interac</span>
                    <span className={colSizes[1]}>{monerisInterac !== -1 ? `$${monerisInterac.toFixed(2)}` : 'N/A'}</span>
                    <span className={colSizes[2]}>{bookerInterac !== -1 ? `$${bookerInterac.toFixed(2)}` : 'N/A'}</span>
                    { compareResults(monerisInterac, bookerInterac) }
                    {
                      compareErrors(monerisInterac, bookerInterac)
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SalesAudit;