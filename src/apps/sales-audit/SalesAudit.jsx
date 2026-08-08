import { useState } from 'react';

import DragAndDropFile from "../../components/fields/DragAndDropFile";
import "./_sales-audit.scss";

const SalesAudit = () => {
  const [monerisAmericanExpress, setMonerisAmericanExpress] = useState(-1);
  const [monerisVisa, setMonerisVisa] = useState(-1);
  const [monerisMasterCard, setMonerisMasterCard] = useState(-1);
  const [monerisInterac, setMonerisInterac] = useState(-1);

  const [bookerAmericanExpress, setBookerAmericanExpress] = useState(-1);
  const [bookerVisa, setBookerVisa] = useState(-1);
  const [bookerMasterCard, setBookerMasterCard] = useState(-1);
  const [bookerInterac, setBookerInterac] = useState(-1);

  const handleMonerisProcessed = (data, filename) => {
    console.log("Moneris File Processed:", filename, data);
    
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
      console.log("Visa Amount:", visaData[0]['Net Amount']);
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
    console.log("Booker File Processed:", filename, data);
    
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

  const formatNumber = (num) => {
    // 1. Remove all commas (becomes "1481.72")
    const cleanString = String(num).replace(/[$,]/g, '');

    // 2. Parse and format to 2 decimal places
    const formattedNumber = Number(parseFloat(cleanString).toFixed(2));

    return formattedNumber;
  }

  const compareResults = (monerisAmount, bookerAmount) => {
    if (monerisAmount === -1 || bookerAmount === -1) {
      return <td>N/A</td>;
    } else {
      if (monerisAmount === bookerAmount) {
        return (
          <td>&#9989;</td>
        );
      } else {
        return (
          <td>&#10060;</td>
        );
      }
    }
  }

  return (
    <div className="sales-audit-container">
      <h1>BFPL Sales Audit Tool</h1>
      <p>Used for daily comparision between Moneris and Booker files.</p>
      <div className="input-area">
        <div className='input-field moneris'>
          <h2>Moneris Data</h2>
          <DragAndDropFile onFileProcessed={handleMonerisProcessed} allowedFileTypes={['.csv']} />
        </div>
        <div className='input-field booker'>
          <h2>Booker Data</h2>
          <DragAndDropFile onFileProcessed={handleBookerProcessed} allowedFileTypes={['.csv']} />
        </div>
      </div>
      <div className="results-area">
        <h2>Results</h2>
        <table>
          <thead>
            <tr>
              <th>Card Type</th>
              <th>Moneris Amount</th>
              <th>Booker Amount</th>
              <th>Comparison</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>American Express</td>
              <td>{monerisAmericanExpress !== -1 ? `$${monerisAmericanExpress.toFixed(2)}` : 'N/A'}</td>
              <td>{bookerAmericanExpress !== -1 ? `$${bookerAmericanExpress.toFixed(2)}` : 'N/A'}</td>
              { compareResults(monerisAmericanExpress, bookerAmericanExpress) }
            </tr>
            <tr>
              <td>Visa</td>
              <td>{monerisVisa !== -1 ? `$${monerisVisa.toFixed(2)}` : 'N/A'}</td>
              <td>{bookerVisa !== -1 ? `$${bookerVisa.toFixed(2)}` : 'N/A'}</td>
              { compareResults(monerisVisa, bookerVisa) }
            </tr>
            <tr>
              <td>MasterCard</td>
              <td>{monerisMasterCard !== -1 ? `$${monerisMasterCard.toFixed(2)}` : 'N/A'}</td>
              <td>{bookerMasterCard !== -1 ? `$${bookerMasterCard.toFixed(2)}` : 'N/A'}</td>
              { compareResults(monerisMasterCard, bookerMasterCard) }
            </tr>
            <tr>
              <td>Interac</td>
              <td>{monerisInterac !== -1 ? `$${monerisInterac.toFixed(2)}` : 'N/A'}</td>
              <td>{bookerInterac !== -1 ? `$${bookerInterac.toFixed(2)}` : 'N/A'}</td>
              { compareResults(monerisInterac, bookerInterac) }
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalesAudit;