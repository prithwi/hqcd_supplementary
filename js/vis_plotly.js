// ref: https://plot.ly/javascript/ajax-call/

// definining default bg color
var bg_color = 'rgb(220,220,220)'

var target_names = ['Employment', 'Housing', 'Energy and Resources',
    'Other Economic', 'Other Government', 'Other'];
var target_divs = ['br_emp_ts', 'br_house_ts', 'br_energy_ts', 
    'br_econ_ts', 'br_govt_ts', 'br_otr_ts'];
var all_algos = ['BOCPD', 'GLRT', 'W-GLRT', 'RuLSIF', 'HQCD'];

var total_name = 'All';
var cluster_names = Array.apply(null, Array(30)).map(function(_, i){
  return 'cluster-' + i;});

// Defining the target variables
var target_ts, target_cpd, surrogate_ts, surrogate_cpd;


function brazil_ts(url) {
  var dFile = url + "demo/Brazil/ts.json";
  console.log(dFile);
  Plotly.d3.json(dFile, function(data){
    target_ts = data['target']['data'];
    target_cpd = data['target']['cpd'];

    surrogate_ts = data['surrogate']['data'];
    surrogate_cpd = data['surrogate']['cpd'];

    var width = $('#br_ts').width() * 0.98;
    // All
    makeCPDts(target_ts['date'], target_ts['All'], target_cpd['All'],
      width, 'Total Protests', 'protests', 'br_ts');
    
    // Sub protests
    for (var i=0; i < target_names.length; i++){
      var _name = target_names[i];
      var _div = target_divs[i];

      makeCPDts(target_ts['date'], target_ts[_name], target_cpd[_name],
        width, _name, 'protests', _div);
    };
  });
};


function makeCPDts(x, y, cpds, width, name, metric, divName){
  // x: date, y: time plots

  var max_y = Math.max(...y); //spread operator

  var data = []
  // time series
  var ts = {
    x: x,
    y: y,
    type: 'scatter',
    mode: 'lines+markers',
    fill: 'tozeroy',
    showlegend: false,
    name: name,
  };
  data.push(ts);

  // cpd traces
  for (var i=0; i < all_algos.length; i++){
    algo = all_algos[i];
    if(cpds.hasOwnProperty(algo)){
      // creating trace for a key
      var trace = {
        x: [cpds[algo], cpds[algo]],
        y: [0, max_y],
        type: 'scatter',
        mode: 'line',
        name: algo
      };
      data.push(trace);
    };
  }; // all traces pushed  

  var layout = {
    title: 'Changepoint in ' + name,
    // height: 300,
    width: width,
    autosize: false,
    xaxis: {title: 'Time'},
    yaxis: {title: 'Number of ' + metric},
    hovermode: 'closest'
    // backgroundcolor: bg_color,
  };

  console.log(name + ' '+ divName + ' ' + width);

  Plotly.newPlot(divName, data, layout);
};

// Defining the heatmap
var target_heat, surrogate_heat;
var heat_divs = ['target_heat', 'surrogate_heat'];

function brazil_heat(url) {
  var dFile = url + "demo/Brazil/amatrix.json";
  console.log(dFile);
  Plotly.d3.json(dFile, function(data){
    target_heat = data['target'];
    surrogate_heat = data['surrogate'];

    makeHeat(target_heat, 'Protests', heat_divs[0]);
    makeHeat(surrogate_heat, 'Twitter', heat_divs[1]);
  });
};

function makeHeat(d, name, divName){
  var _width = $('#' + divName).width();
  console.log(d['y']);

  var heat = {
    z: d['z'],
    x: d['x'],
    y: d['y'],
    type: 'heatmap',
    colorscale: 'Reds'
  };

  var layout = {
    width: _width,
    autosize: false,
    title: 'Changepoint through ' + name,
  };

  var data = [heat];
  Plotly.newPlot(divName, data, layout);
};
