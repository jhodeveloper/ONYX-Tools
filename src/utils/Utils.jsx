/**
 * Cleans parsed values from the CSV file to a number
 * 
 * @param {*} num the parsed value from the CSV
 * @returns 
 */
export function formatNumber (num) {
  // 1. Remove all commas (becomes "1481.72")
  const cleanString = String(num).replace(/[$,]/g, '');

  // 2. Parse and format to 2 decimal places
  const formattedNumber = Number(parseFloat(cleanString).toFixed(2));

  return formattedNumber;
}