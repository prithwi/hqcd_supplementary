'use strict';
/* TODO: fix */
/* global dc, d3, crossfilter, colorbrewer */
var brGammaSts = dc.compositeChart('#brGammaSts');
var brGammaKts = dc.compositeChart('#brGammaKts');

var numberFormat = d3.format(".2f");
var brSData = [];
var brKData = [];

var color_cycle = colorbrewer.Paired[12]

d3.csv('../data/protests/Brazil/Brazil_subtypes.csv', function(data){
    brSData = data
    brSData.forEach(function(d){
        d['Time'] = +d['Time'];
        d['S0'] = +d['S0'];
        d['S1'] = +d['S1'];
        d['S2'] = +d['S2'];
        d['S3'] = +d['S3'];
        d['S4'] = +d['S4'];
    });
    var ndx = crossfilter(brSData);
    var all = ndx.groupAll();

    var XDim = ndx.dimension(function(d){
        return d.Time;
    });


    var S0 = XDim.group().reduceSum(function(d){return d.S0;});
    var S1 = XDim.group().reduceSum(function(d){return d.S1;});
    var S2 = XDim.group().reduceSum(function(d){return d.S2;});
    var S3 = XDim.group().reduceSum(function(d){return d.S3;});
    var S4 = XDim.group().reduceSum(function(d){return d.S4;});

    var minX = XDim.bottom(1)[0].Time;
    var maxX = XDim.top(1)[0].Time;
    console.log('MinX:' + minX + 'MaxX:' + maxX);

    brGammaSts
        .width(450)
        .dimension(XDim)
        .valueAccessor(function (d) {
            return d.value;
        })
        .x(d3.scale.linear().domain([minX, maxX]))
        .xAxisLabel('Time points')
        .yAxisLabel('Numbers')
        .elasticY(true).elasticX(true)
        .legend(dc.legend().x(405).y(20).itemHeight(10))
        .compose([
            dc.lineChart(brGammaSts).dimension(XDim)
                .group(S0, "S0")
                .colors(color_cycle[0]),
               dc.lineChart(brGammaSts).dimension(XDim)
                .group(S1, "S1")
                .colors(color_cycle[1]),
            dc.lineChart(brGammaSts).dimension(XDim)
                .group(S2, "S2")
                .colors(color_cycle[2]),
            dc.lineChart(brGammaSts).dimension(XDim)
                .group(S3, "S3")
                .colors(color_cycle[3]),
            dc.lineChart(brGammaSts).dimension(XDim)
                .group(S4, "S4")
                .colors(color_cycle[4]),
        ]);
});

d3.csv('../data/synthetic/simulated_surrogates.csv', function(data){
    brKData = data
    brKData.forEach(function(d){
        d['Time'] = +d['Time'];
        d['K0'] = +d['K0'];
        d['K1'] = +d['K1'];
        d['K2'] = +d['K2'];
        d['K3'] = +d['K3'];
        d['K4'] = +d['K4'];
    });
    var ndx = crossfilter(brKData);
    var all = ndx.groupAll();

    var XDim = ndx.dimension(function(d){
        return d.Time;
    });

    var minX = XDim.bottom(1)[0].Time;
    var maxX = XDim.top(1)[0].Time;
    console.log('MinX:' + minX + 'MaxX:' + maxX);
    
    var K0 = XDim.group().reduceSum(function(d){return d.K0;});
    var K1 = XDim.group().reduceSum(function(d){return d.K1;});
    var K2 = XDim.group().reduceSum(function(d){return d.K2;});
    var K3 = XDim.group().reduceSum(function(d){return d.K3;});
    var K4 = XDim.group().reduceSum(function(d){return d.K4;});

    brGammaKts.dimension(XDim) 
        .width(450)
        .x(d3.scale.linear().domain([minX, maxX]))
        .legend(dc.legend().itemHeight(10))
        .elasticY(true).elasticX(true)
        .legend(dc.legend().x(405).y(20).itemHeight(10))
        .compose([
            dc.lineChart(brGammaKts).dimension(XDim)
                .group(K0, "K0")
                .colors(color_cycle[0]),
               dc.lineChart(brGammaKts).dimension(XDim)
                .group(K1, "K1")
                .colors(color_cycle[1]),
            dc.lineChart(brGammaKts).dimension(XDim)
                .group(K2, "K2")
                .colors(color_cycle[2]),
            dc.lineChart(brGammaKts).dimension(XDim)
                .group(K3, "K3")
                .colors(color_cycle[3]),
            dc.lineChart(brGammaKts).dimension(XDim)
                .group(K4, "K4")
                .colors(color_cycle[4]),
        ])
        .xAxisLabel('Time points')
        .yAxisLabel('Numbers');

    dc.renderAll();
});
