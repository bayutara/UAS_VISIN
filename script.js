google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(getSpreadsheetData);

function getSpreadsheetData() {
  var spreadsheetId = "1fPcHs6qyiDrRslvP3tOzW9a4AZy4EV2IqC9KYrFWR10";
  var range = "hasil_tabulasi!A1:C22";

  var query = new google.visualization.Query(
    "https://docs.google.com/spreadsheets/d/" +
      spreadsheetId +
      "/gviz/tq?gid=1928106169&range=" +
      range
  );
  query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
  if (response.isError()) {
    console.error("Error: " + response.getMessage());
    return;
  }

  var data = response.getDataTable();
  var groupedData = groupByYearAndType(data);
  drawCharts(groupedData); // Panggil fungsi untuk menggambar grafik, misalnya drawCharts(data)
  drawTable(groupedData); // Panggil fungsi untuk menggambar tabel, misalnya drawTable(data)
}

function groupByYearAndType(data) {
  var groupedData = {};
  for (var i = 0; i < data.getNumberOfRows(); i++) {
    var year = data.getValue(i, 1).toString();
    var type = data.getValue(i, 0).toString();
    var totalDeaths = data.getValue(i, 2);

    if (!groupedData[year]) {
      groupedData[year] = {};
    }

    groupedData[year][type] = totalDeaths;
  }

  return groupedData;
}

function drawCharts(data) {
  var options_bar = {
    title: "Grafik Total Kematian Berdasarkan Type per Tahun",
    width: 860,
    height: 500,
    legend: { position: "bottom" },
    bar: { groupWidth: "85%" },
    vAxis: { scaleType: "log", format: "short" },
  };
  var options_line = {
    title: "Grafik Total Kematian Berdasarkan Type per Tahun",
    width: 600,
    height: 400,
    legend: { position: "right" },
    vAxis: { scaleType: "log", format: "short" },
  };

  var dataTable = new google.visualization.DataTable();
  dataTable.addColumn("string", "Year");
  for (var type in data[Object.keys(data)[0]]) {
    dataTable.addColumn("number", type);
  }

  for (var year in data) {
    var row = [year];
    for (var type in data[year]) {
      row.push(data[year][type]);
    }
    dataTable.addRow(row);
  }

  var chart = new google.visualization.ColumnChart(
    document.getElementById("chart1")
  );
  chart.draw(dataTable, options_bar);

  var chart = new google.visualization.LineChart(
    document.getElementById("chart2")
  );
  chart.draw(dataTable, options_line);
}

function drawTable(data) {
  var table = new google.visualization.Table(document.getElementById("table"));
  table.draw(data, { showRowNumber: true, width: "100%", height: "10%" });
}
