
// Global variables (used across functions below)
var compareYear1 = 2006;
var compareYear2 = 2021;

var dataCSV; // Hold CSV data
var dataPct; // Subset of CSV with just percentage data for energy sources
var dataRenewables; // Subset of CSV with raw data for renewable energy sources only
var dataYears; // Subset of CSV with array of years

var dataPctYear1; // filter percentage data to only year 1
var dataPctOnlyYear1; // filter to only percentage data, parse as float values
var dataPie1; // convert from objects above to just an array of float values for charting

var dataPctYear2; // filter percentage data to only year 2
var dataPctOnlyYear2; // filter to only percentage data, parse as float values
var dataPie2; // convert from objects above to just an array of float values for charting

var dataRenewablesYear1; // filter percentage data to only year 1
var dataRenewablesOnlyYear1; // filter to only percentage data, parse as float values
var dataBar1; // convert from objects above to just an array of float values for charting

var dataRenewablesYear2; // filter percentage data to only year 2
var dataRenewablesOnlyYear2; // filter to only percentage data, parse as float values
var dataBar2; // convert from objects above to just an array of float values for charting

var allEnergySources = ['Coal','Natural Gas', 'Nuclear', 'Renewable Energy', 'Other including Petroleum and Wood'];
var color = ['gray','orange','#7cfc00','green','black'];

var renewableEnergySources = ['Wind','Solar','Hydroelectric','Biomass','Geothermal'];
var renewableColors = ['MediumPurple','OrangeRed','DodgerBlue','RosyBrown','Maroon'];

function loadPieChartData()
{
    // Build out data for first pie chart displayed
    dataPctYear1 = dataPct.filter(function (d) {
        return d['Year'] == compareYear1
    });
    // console.log(dataPctYear1);

    dataPctOnlyYear1 = dataPctYear1.map(function(d) {
        return {
            Pct_Coal: parseFloat(d.Pct_Coal),
            Pct_NaturalGas: parseFloat(d.Pct_NaturalGas),
            Pct_Nuclear: parseFloat(d.Pct_Nuclear),
            Pct_Renewables: parseFloat(d.Pct_Renewables),
            Pct_Other: parseFloat(d.Pct_Other)
        }
    });
    dataPctOnlyYear1 = dataPctOnlyYear1[0];
    // console.log(dataPctOnlyYear1);

    dataPie1 = Object.values(dataPctOnlyYear1);
    // console.log(dataPie1);

    // Build out data for second pie chart displayed
    dataPctYear2 = dataPct.filter(function (d) {
        return d['Year'] == compareYear2
    });
    // console.log(dataPctYear2);

    dataPctOnlyYear2 = dataPctYear2.map(function(d) {
        return {
            Pct_Coal: parseFloat(d.Pct_Coal),
            Pct_NaturalGas: parseFloat(d.Pct_NaturalGas),
            Pct_Nuclear: parseFloat(d.Pct_Nuclear),
            Pct_Renewables: parseFloat(d.Pct_Renewables),
            Pct_Other: parseFloat(d.Pct_Other)
        }
    });
    dataPctOnlyYear2 = dataPctOnlyYear2[0];
    // console.log(dataPctOnlyYear2);

    dataPie2 = Object.values(dataPctOnlyYear2);
    // console.log(dataPie2);
}

function loadBarChartData()
{
    dataRenewablesYear1 = dataRenewables.filter(function (d) {
        return d['Year'] == compareYear1
    });
    console.log(dataRenewablesYear1);

    dataRenewablesOnlyYear1 = dataRenewablesYear1.map(function(d) {
        return {
            Wind: parseFloat(d.Wind),
            Solar: parseFloat(d.Solar),
            Hydroelectric: parseFloat(d.Hydroelectric),
            Biomass: parseFloat(d.Biomass),
            Geothermal: parseFloat(d.Geothermal)
        }
    });
    dataRenewablesOnlyYear1 = dataRenewablesOnlyYear1[0];
    console.log(dataRenewablesOnlyYear1);

    dataBar1 = Object.values(dataRenewablesOnlyYear1);
    console.log(dataBar1);

    dataRenewablesYear2 = dataRenewables.filter(function (d) {
        return d['Year'] == compareYear2
    });
    console.log(dataRenewablesYear2);

    dataRenewablesOnlyYear2 = dataRenewablesYear2.map(function(d) {
        return {
            Wind: parseFloat(d.Wind),
            Solar: parseFloat(d.Solar),
            Hydroelectric: parseFloat(d.Hydroelectric),
            Biomass: parseFloat(d.Biomass),
            Geothermal: parseFloat(d.Geothermal)
        }
    });
    dataRenewablesOnlyYear2 = dataRenewablesOnlyYear2[0];
    console.log(dataRenewablesOnlyYear2);

    dataBar2 = Object.values(dataRenewablesOnlyYear2);
    console.log(dataBar2);
}

async function loadCSVData()
{
    dataCSV = await d3.csv('/data.csv');
    //console.log(dataCSV[0]);
    //console.log(dataCSV[1])
    //console.log(dataCSV.columns);
    //console.log(dataCSV[0].Year);

    // Extract Percentages of all sources to draw pie charts
    dataPct = dataCSV.map(function(d) {
        return {
            Year: d.Year,
            Pct_Coal: d.Pct_Coal,
            Pct_NaturalGas: d.Pct_NaturalGas,
            Pct_Nuclear: d.Pct_Nuclear,
            Pct_Renewables: d.Pct_Renewables,
            Pct_Other: d.Pct_Other
        }
    });
    //console.log(dataPct);

    // Extract data on renewables to draw bar charts
    dataRenewables = dataCSV.map(function(d) {
        return {
            Year: d.Year,
            Wind: d.Wind,
            Solar: d.Solar,
            Hydroelectric: d.Hydroelectric,
            Biomass: d.Biomass,
            Geothermal: d.Geothermal
        }
    });
    //console.log(dataRenewables)

    // Extract years column for drop downs
    dataYears = dataCSV.map(function(d) {
        return  parseInt(d.Year);
    });
    //console.log(dataYears);

    // loadPieChartData();
    // loadBarChartData();
}

function drawPieCharts()
{
    loadPieChartData();

    var pie = d3.pie();
    var arc = d3.arc().innerRadius(0).outerRadius(100);

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    console.log(pie(dataPie1));
    // Draw text for years
    d3.select("svg")
        .append("g")
        //.attr("transform","translate(150,100)")
        .append("text")
        .attr("id","year1")
        .attr("x", 710)
        .attr("y", 70)
        //.style("fill", "red")
        .text(compareYear2)
        .style("opacity", 100)
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .style("font-size", "175%");

    d3.select("svg")
        .append("g")
        //.attr("transform","translate(150,100)")
        .append("text")
        .attr("id","year2")
        .attr("x", 110)
        .attr("y", 70)
        //.style("fill", "red")
        .text(compareYear1)
        .style("opacity", 100)
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .style("font-size", "175%");

    // Draw first pie chart
    d3.select("svg")
        .append("g")
        .attr("transform","translate(150,200)")
        .selectAll("path")
        .data(pie(dataPie1)).enter().append("path")
        .attr("d",arc)
        .attr("fill", function(d,i) {return color[i];})
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '.75');

            div.transition()
                .duration(50)
                .style("opacity", 1);

            div.html(d.value + "%  " + dataCSV.columns[i+3])
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 15) + "px");
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '1');

            div.transition()
                .duration('50')
                .style("opacity", 0);
        });

    // Draw second pie chart
    d3.select("svg")
        .append("g")
        .attr("transform","translate(750,200)")
        .selectAll("path")
        .data(pie(dataPie2)).enter().append("path")
        .attr("d",arc)
        .attr("fill", function(d,i) {return color[i];})
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '.75');

            div.transition()
                .duration(50)
                .style("opacity", 1);

            div.html(d.value + "%  " + dataCSV.columns[i+3])
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 15) + "px");
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '1');

            div.transition()
                .duration('50')
                .style("opacity", 0);
        });
}

function drawBarCharts()
{
    loadBarChartData();

    var data = [4,8,15,16,23];

    var x = d3.scaleBand().domain(['Wind','Solar','Hydro','Bio','Geothermal']).range([0,300]);
    var y = d3.scaleLinear().domain([0,400000]).range([300,0]);

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Draw bars for Bar chart 1
    d3.select("svg")
        .append("g")
        .attr("transform","translate(75,400)")
        .selectAll("rect")
        .data(dataBar1).enter().append("rect")
        .attr("x", function(d,i) {return i*x.bandwidth()+x.bandwidth()/4;})
        .attr("y", function(d) {return y(d);})
        .attr("width", function(d) {return x.bandwidth()/2;})
        .attr("height",function(d) {return 300-y(d);})
        .attr("fill", function (d, i) {return renewableColors[i];})
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '.75');

            div.transition()
                .duration(50)
                .style("opacity", 1);

            div.html(d + " GWh  " + renewableEnergySources[i])
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 15) + "px");
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '1');

            div.transition()
                .duration('50')
                .style("opacity", 0);
        }
        );

    // Create margins for y-axis and draw y-axis
    d3.select("svg")
        .append("g")
        .attr("transform","translate(75,400)")
        .attr("fill","none")
        .attr("font-size", 10)
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "end")
        .call(d3.axisLeft(y));

    // Create margins for x-axis and draw x-axis
    d3.select("svg")
        .append("g")
        .attr("transform","translate(75,700)")
        .attr("fill","none")
        .attr("font-size", 10)
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "end")
        .call(d3.axisBottom(x)
        //.attr("transform", "rotate(-45)")
        );

    // Draw bars for Bar chart 2
    d3.select("svg")
        .append("g")
        .attr("transform","translate(675,400)")
        .selectAll("rect")
        .data(dataBar2).enter().append("rect")
        .attr("x", function(d,i) {return i*x.bandwidth()+x.bandwidth()/4;})
        .attr("y", function(d) {return y(d);})
        .attr("width", function(d) {return x.bandwidth()/2;})
        .attr("height",function(d) {return 300-y(d);})
        .attr("fill", function (d, i) {return renewableColors[i];})
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '.75');

            div.transition()
                .duration(50)
                .style("opacity", 1);

            div.html(d + " GWh  " + renewableEnergySources[i])
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 15) + "px");
        })
        .on('mouseout', function (d, i) {
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '1');

                div.transition()
                    .duration('50')
                    .style("opacity", 0);
            }
        );

    // Create margins for y-axis and draw y-axis
    d3.select("svg")
        .append("g")
        .attr("transform","translate(675,400)")
        .attr("fill","none")
        .attr("font-size", 10)
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "end")
        .call(d3.axisLeft(y));

    // Create margins for x-axis and draw x-axis
    d3.select("svg")
        .append("g")
        .attr("transform","translate(675,700)")
        .attr("fill","none")
        .attr("font-size", 10)
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "end")
        .call(d3.axisBottom(x)
            //.attr("transform", "rotate(-45)")
        );

}

function drawLegendBarChart()
{
    var size = 20
    d3.select("svg").selectAll("legend")
        .data(renewableEnergySources)
        .enter()
        .append("rect")
        .attr("x", 1000)
        .attr("y", function(d,i){ return 320 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", size)
        .style("fill", function(d,i){ return renewableColors[i]});

    d3.select("svg").selectAll("legend_text")
        .data(renewableEnergySources)
        .enter()
        .append("text")
        .attr("x", 1000 + size*1.2)
        .attr("y", function(d,i){ return 320 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d,i){ return renewableColors[i]})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle");
}

function drawLegendPieChart()
{
    var size = 20
    d3.select("svg").selectAll("legend")
        .data(allEnergySources)
        .enter()
        .append("rect")
        .attr("x", 1000)
        .attr("y", function(d,i){ return 70 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", size)
        .style("fill", function(d,i){ return color[i]});

    d3.select("svg").selectAll("legend_text")
        .data(allEnergySources)
        .enter()
        .append("text")
        .attr("x", 1000 + size*1.2)
        .attr("y", function(d,i){ return 70 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d,i){ return color[i]})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle");
}

function drawAnnotationsPage3()
{
    const annotations = [
        {
            note: {
                label: "Choose any two years to see the relevant data",
                title: "Select years above",
                wrap: 200,
                align: "left"
            },
            color: ['#E8336D'],
            x: 350,
            y: 50,
            dy: 0,
            dx: 0
        },{
            note: {
                label: "Take a look at 1960-1992 (rise of nuclear power plants), 2000-2021 (growth of wind farms), 2011-2021 (growth of solar electricity generation)",
                title: "Interesting Years",
                wrap: 200,
                align: "left"
            },

            color: ['#E8336D'],
            x: 350,
            y: 150,
            dy: 0,
            dx: 0
        }].map(function(d){ return d});

    const makeAnnotations = d3.annotation()
        .type(d3.annotationLabel)
        .annotations(annotations);

    d3.select("svg")
        .append("g")
        .attr("class", "annotation-group")
        .call(makeAnnotations);

    d3.select("svg").selectAll(".connector")
        .attr('stroke', "#E8336D")

    d3.select("svg").selectAll(".connector-end")
        .attr('stroke', "#E8336D")
        .attr('fill', "#E8336D")
}

function drawAnnotationsPage2()
{
    const annotations = [
        {
            note: {
                label: "Wind and solar were the primary contributors to the growth in renewable energy in the last 15 years.",
                title: "Growth in renewable energy",
                wrap: 200,
                align: "left"
            },
            color: ['#E8336D'],
            x: 350,
            y: 50,
            dy: 0,
            dx: 0
        },{
            note: {
                label: "Wind-based electricity generation started in 1989 and was substantial in 2006",
                title: "Wind in 2006",
                wrap: 200,
                align: "left"
            },
            connector: {
                end: "arrow" // 'dot' also available
            },
            color: [renewableColors[0]],
            x: 106.25,
            y: 675,
            dy: -250,
            dx: 50
        },{
            note: {
                label: "Wind was the largest source of renewable electricity in 2021, overtaking hydroelectric in 2019",
                title: "Wind in 2021",
                wrap: 200,
                align: "left"
            },
            connector: {
                end: "arrow", // 'dot' also available
            },
            color: [renewableColors[0]],
            x: 700,
            y: 412.5,
            dy: -50,
            dx: -250
        },{
            note: {
                label: "Solar-based electricity generation also started in 1989, but was still a fledgling technology in 2006",
                title: "Solar in 2006",
                wrap: 200,
                align: "left"
            },
            connector: {
                end: "arrow" // 'dot' also available
            },
            color: [renewableColors[1]],
            x: 162.5,
            y: 700,
            dy: -75,
            dx: 150
        },{
            note: {
                label: "Solar as a source of electricity has exploded in the last few years, up 3x in just the last 5 years",
                title: "Solar in 2021",
                wrap: 200,
                align: "left"
            },
            connector: {
                end: "arrow" // 'dot' also available
            },
            color: [renewableColors[1]],
            x: 765,
            y: 615,
            dy: -15,
            dx: 100
        }].map(function(d){ return d});

    const makeAnnotations = d3.annotation()
        .type(d3.annotationLabel)
        .annotations(annotations);

    d3.select("svg")
        .append("g")
        .attr("class", "annotation-group")
        .call(makeAnnotations);

    d3.select("svg").selectAll(".connector")
        .attr('stroke', "#E8336D")

    d3.select("svg").selectAll(".connector-end")
        .attr('stroke', "#E8336D")
        .attr('fill', "#E8336D")
}
function drawAnnotationsIndex()
{
    const annotations = [
        {
            note: {
                label: "As recently as 2006, Coal was responsible for ~50% of US electricity generation, a number that was fairly constant since the 1950s",
                title: "Coal in 2006",
                wrap: 200,
                align: "left"
            },
            connector: {
                end: "arrow" // 'dot' also available
            },
            color: ['gray'],
            x: 200,
            y: 175,
            dy: -20,
            dx: 50
        },{
            note: {
                label: "Today, coal is the source of only ~22% of the nation's electricity",
                title: "Coal in 2021",
                wrap: 200,
                align: "left"
            },
            connector: {
                end: "arrow", // 'dot' also available
            },
            color: ['gray'],
            x: 750,
            y: 230,
            dy: -70,
            dx: -275
        },{
            note: {
                label: "A significant reason for the drop in coal generated share of electricity is the huge growth in renewables between 2006 and 2021",
                title: "Growth of renewables",
                wrap: 200,
                align: "left"
            },
            connector: {
                end: "arrow" // 'dot' also available
            },
            color: ['green'],
            x: 700,
            y: 230,
            dy: 0,
            dx: -250
        },{
            note: {
                label: "Natural gas based generation also grew a lot, but natural gas produces less than half the CO2 emissions of coal",
                title: "Natural gas growth",
                wrap: 200,
                align: "left"
            },
            connector: {
                end: "arrow" // 'dot' also available
            },
            color: ['orange'],
            x: 800,
            y: 260,
            dy: 175,
            dx: -250
        }].map(function(d){ return d});

    const makeAnnotations = d3.annotation()
        .type(d3.annotationLabel)
        .annotations(annotations);

    d3.select("svg")
        .append("g")
        .attr("class", "annotation-group")
        .call(makeAnnotations);

    d3.select("svg").selectAll(".connector")
        .attr('stroke', "#E8336D")

    d3.select("svg").selectAll(".connector-end")
        .attr('stroke', "#E8336D")
        .attr('fill', "#E8336D")
}

async function initIndex()
{
    // var data = [4,8,15,16,23,42];
    // console.log(data);

    await loadCSVData();
    drawPieCharts();
    drawLegendPieChart();
    drawAnnotationsIndex();
//    var color = ['pink','lightyellow','lightgreen','lightcyan','lightblue','violet'];

}

async function initPage2()
{
    //var data = [4,8,15,16,23,42];
    //console.log(data);

    await loadCSVData();
    drawPieCharts();
    drawBarCharts();
    drawLegendPieChart();
    drawLegendBarChart();
    drawAnnotationsPage2();
//    var color = ['pink','lightyellow','lightgreen','lightcyan','lightblue','violet'];

}

async function initPage3()
{
    await loadCSVData();

    var year1 = document.getElementById("year1")
    var year2 = document.getElementById("year2")

    for (var i = dataYears.length - 1; i >= 0; i--) {
        var year = dataYears[i];
        var element1 = document.createElement("option");
        element1.textContent = year;
        element1.value = year;

        if (year == 2006) {
            element1.selected = true;
        }

        var element2 = document.createElement("option");
        element2.textContent = year;
        element2.value = year;
        if (year == 2021) {
            element2.selected = true;
        }

        year1.appendChild(element1);
        year2.appendChild(element2);
    }

    drawPieCharts();
    drawBarCharts();
    drawLegendPieChart();
    drawLegendBarChart();
    drawAnnotationsPage3();
}

function changeYear()
{
    // console.log("year1 before: " + compareYear1);
    // console.log("year2 before: " + compareYear2);

    var year1 = document.getElementById("year1");
    var year2 = document.getElementById("year2");

    compareYear1 = parseInt(year1.value);
    compareYear2 = parseInt(year2.value);

    // clear SVG and redraw when the selected year changes
    d3.select("svg").selectAll('*').remove();
    drawPieCharts();
    drawBarCharts();
    drawLegendPieChart();
    drawLegendBarChart();
    drawAnnotationsPage3();

    // console.log("year1 after: " + compareYear1);
    // console.log("year2 after: " + compareYear2);
}