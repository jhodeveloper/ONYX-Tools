import { useState, useRef } from 'react';
import Papa from 'papaparse';

import './_drag-and-drop.scss';

export default function DragAndDropFile({
  title,
  description,
  buttonLabel,
  onFileProcessed,
  allowedFileTypes
} ) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState([]); // Store the JSON array
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const processFile = (selectedFile) => {
    setError(null);

    // Validate file type
    const isCsvType = selectedFile.type === 'text/csv' || selectedFile.type === 'application/vnd.ms-excel';
    const isCsvExt = selectedFile.name.toLowerCase().endsWith('.csv');

    if (!isCsvType && !isCsvExt) {
      setError('Invalid file type. Please upload a .csv file.');
      return;
    }

    setFile(selectedFile);

    // Parse the file directly with Papa Parse
    Papa.parse(selectedFile, {
      header: true,          // Converts rows into JSON objects using the first row as keys
      skipEmptyLines: true,  // Ignores trailing empty lines at the bottom of the file
      dynamicTyping: true,   // Automatically converts numbers and booleans from strings
      complete: (results) => {
        // results.data contains the parsed array of objects
        // console.log("Parsed Data:", results.data); 
        setParsedData(results.data);

        if (onFileProcessed) {
          // You can pass just the data, or include the filename as well
          onFileProcessed(results.data, selectedFile.name);
        }
      },
      error: (err) => {
        setError(`Failed to parse CSV: ${err.message}`);
      }
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };

  return (
    <div className='uploader-container'>
      <div 
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        {
          title &&
          <h3 className='tile-label'>{title}</h3>
        }
        { 
          description && 
          <p className='body'>{description}</p>
        }
        {
          buttonLabel &&
          <button>{buttonLabel}</button>
        }
        <input 
          type="file" 
          accept={ allowedFileTypes ? allowedFileTypes.join(',') : '' }
          ref={fileInputRef} 
          onChange={handleFileChange} 
          style={{ display: 'none' }} 
        />
      </div>

      {error && (
        <div style={{ color: '#d9534f', marginTop: '1rem', fontWeight: 'bold' }}>
          {error}
        </div>
      )}

      {/* Show a quick preview of the parsed JSON data */}
      {parsedData.length > 0 && (
        <div className='parsed-data'>
          <h4 className='label'><span>Filename:</span> {file?.name}</h4>
          <p className='body'>Successfully loaded {parsedData.length} rows.</p>
        </div>
      )}
    </div>
  );
}