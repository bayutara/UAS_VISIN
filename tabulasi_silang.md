#### Dharu Aulia Rahman_2100016086
# Tabulasi Silang Data Penyebab Kematian di Indonesia

## Instruksi A
1. Buka data berikut: [Data Kematian di Indonesia](https://www.kaggle.com/datasets/hendratno/cause-of-death-in-indonesia) menggunakan Google Spreadsheet
2. Pada Menu Bar pilih Ekstensi kemudian pilih App Script
3. Masukkan Kode Script berikut kedalam App Script:

```
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Custom Menu')
    .addItem('Generate Crosstab', 'generateCrosstab')
    .addToUi();
}

function generateCrosstab() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();

  var crosstabData = {}; // Object to store the crosstab data
  var years = []; // Array to store unique years
  var types = []; // Array to store unique types

  // Loop through the data and calculate total deaths for each cause, type, and year
  for (var i = 1; i < data.length; i++) {
    var cause = data[i][0];
    var type = data[i][1];
    var year = data[i][2];
    var totalDeaths = data[i][4];

    if (!crosstabData[cause]) {
      crosstabData[cause] = {};
    }

    if (!crosstabData[cause][type]) {
      crosstabData[cause][type] = {};
    }

    if (!crosstabData[cause][type][year]) {
      crosstabData[cause][type][year] = 0;
    }

    crosstabData[cause][type][year] += totalDeaths;

    // Add the year and type to the respective arrays if they're not already there
    if (!years.includes(year)) {
      years.push(year);
    }

    if (!types.includes(type)) {
      types.push(type);
    }
  }

  // Sort the years and types in ascending order
  years.sort();
  types.sort();

  // Create a new sheet for crosstab data
  var newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
  newSheet.setName('Crosstab Data');

  // Write column headers in the new sheet
  var headerRow = ['Cause', 'Type'].concat(years);
  newSheet.getRange(1, 1, 1, headerRow.length).setValues([headerRow]);

  // Write crosstab data in the new sheet
  var outputData = [];
  for (var cause in crosstabData) {
    for (var type in crosstabData[cause]) {
      var rowData = [cause, type];
      for (var i = 0; i < years.length; i++) {
        var year = years[i];
        var totalDeaths = crosstabData[cause][type][year] || 0;
        rowData.push(totalDeaths);
      }
      outputData.push(rowData);
    }
  }
  newSheet.getRange(2, 1, outputData.length, headerRow.length).setValues(outputData);

  // Auto-resize columns to fit the content
  newSheet.autoResizeColumns(1, headerRow.length);
}
```

4. Klik Jalankan kemudian tunggu hingga Proses selesai
5. Lakukan pengecekan hasil Tabulasi Silang pada Google Spreadsheet
6. Hasil Tabulasi Silang akan Berada di Sheet baru

Dalam langkah ini, proses yang dilakukan adalah sebagai berikut:

1. Mendapatkan akses ke lembar kerja (spreadsheet) aktif dengan menggunakan SpreadsheetApp.getActiveSpreadsheet().
2. Mengambil lembar kerja dengan nama 'Penyebab Kematian di Indonesia yang Dilaporkan - Clean' menggunakan ss.getSheetByName().
3. Mendapatkan jumlah baris dan kolom dari lembar kerja tersebut dengan getLastRow() dan getLastColumn().
4. Mengambil data dari lembar kerja, mengabaikan baris header, dan menyimpannya dalam bentuk array dua dimensi data menggunakan getRange().getValues(). Data ini berisi informasi tentang penyebab kematian, tahun, dan lain-lain.
5. Mendapatkan daftar penyebab unik dan daftar tahun unik dari data, dan menyimpannya dalam array causes dan years.
6. Mengurutkan tahun-tahun dalam array years secara berurutan dari kecil ke besar.
7. Membuat lembar kerja baru dengan nama 'Penyebab Kematian di Indonesia' menggunakan ss.insertSheet(). Lembar kerja baru ini akan digunakan untuk menampilkan data yang telah diproses.
8. Menempatkan label "Cause" pada sel 'A1' di lembar kerja baru menggunakan newSheet.getRange('A1').setValue('Cause').
9. Memasukkan tahun-tahun unik ke dalam baris pertama lembar kerja baru menggunakan loop for.
10. Menghitung jumlah total kematian untuk setiap penyebab pada setiap tahun dan memasukkan hasilnya ke dalam sel-sel yang sesuai di lembar kerja baru.

## Instruksi B

1. Buka data berikut: [Data Kematian di Indonesia](https://www.kaggle.com/datasets/hendratno/cause-of-death-in-indonesia) menggunakan Google Spreadsheet
2. Pada Menu Bar pilih Ekstensi kemudian pilih App Script
3. Masukkan Kode Script berikut kedalam App Script:

```
function myFunction() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();

  var headers = data.shift(); // Remove the header row

  var typeIndex = headers.indexOf('Type');
  var yearIndex = headers.indexOf('Year');
  var deathsIndex = headers.indexOf('Total Deaths');

  var crossTabData = {};
  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var type = row[typeIndex];
    var year = row[yearIndex];
    var deaths = row[deathsIndex];

    if (!crossTabData[type]) {
      crossTabData[type] = {};
    }

    if (!crossTabData[type][year]) {
      crossTabData[type][year] = 0;
    }

    crossTabData[type][year] += deaths;
  }

  // Output the cross-tabulation to a new sheet
  var outputSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
  var outputData = [['Type', 'Year', 'Total Deaths']];
  for (var type in crossTabData) {
    for (var year in crossTabData[type]) {
      outputData.push([type, parseInt(year), crossTabData[type][year]]);
    }
  }

  outputSheet.getRange(1, 1, outputData.length, outputData[0].length).setValues(outputData);
  outputSheet.activate();
}
```

4. Klik Jalankan kemudian tunggu hingga Proses selesai
5. Lakukan pengecekan hasil Tabulasi Silang pada Google Spreadsheet
6. Hasil Tabulasi Silang akan Berada di Sheet baru

Dalam langkah ini, proses yang dilakukan serupa dengan bagian a, namun kali ini data diolah berdasarkan tipe kematian dan tahun.

### Table B

| Type                          | Year | Total Deaths |
| ----------------------------- | ---- | ------------ |
| Bencana Alam                  | 2015 | 215          |
| Bencana Alam                  | 2016 | 442          |
| Bencana Alam                  | 2017 | 169          |
| Bencana Alam                  | 2018 | 3739         |
| Bencana Alam                  | 2019 | 352          |
| Bencana Alam                  | 2020 | 236          |
| Bencana Alam                  | 2021 | 583          |
| Bencana Non Alam dan Penyakit | 2015 | 3160         |
| Bencana Non Alam dan Penyakit | 2016 | 2754         |
| Bencana Non Alam dan Penyakit | 2017 | 1454         |
| Bencana Non Alam dan Penyakit | 2018 | 1730         |
| Bencana Non Alam dan Penyakit | 2019 | 14582        |
| Bencana Non Alam dan Penyakit | 2020 | 37929        |
| Bencana Non Alam dan Penyakit | 2021 | 139404       |
| Bencana Sosial                | 2015 | 45           |
| Bencana Sosial                | 2016 | 26           |
| Bencana Sosial                | 2017 | 0            |
| Bencana Sosial                | 2018 | 25           |
| Bencana Sosial                | 2019 | 7            |
| Bencana Sosial                | 2020 | 4            |
| Bencana Sosial                | 2021 | 4            |

Table diatas sudah mengalami penyesuaian karena jika menggunakan semua data, terdapat data yang hilang
