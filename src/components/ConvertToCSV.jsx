
const ObjecToCsv = (dataa) => {

  console.log('GLOBAL TARGETS: DownloadCSV: \n', dataa);

  const csvRows = [];
  const headers = Object.keys(dataa[0]);

  console.log('GLOBAL TARGETS: DownloadCSV: headers: \n', headers);
  csvRows.push(headers.join(','));


  for (const row of dataa) {

    const values = headers.map(header => {
      return row[header];
    });

    console.log('GLOBAL TARGETS: DownloadCSV: values: \n', values);

    csvRows.push(values.join(','))

  }
  const f = csvRows.join('\n');


  console.log('GLOBAL TARGETS: DownloadCSV: f: \n', f);
  console.log('ALL FINE');
  /** 
  const json=data
  const datos=response.map(row =>({
    Pasture: row.CalcPasture,
    Cropland:row.CalcCropland,

  }) 
    
    )
    */
  const blob = new Blob([f], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', 'chartData.csv');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

}

export default ObjecToCsv