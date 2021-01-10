function addTotal(array) {
    // run this function on an array of payments (in json format, with any number of invoices per payment) to add a series of invoice totals for each payment

    // loop through each payment
    for (var i = 0; i<array.length; i++) {
        
        // save the payment to a variable
        var remittances = array[i].payment.remittance;

        var total_amount = 0
        
        // ensure the remittance is formatted as an array that can be looped through
        if (remittances.length) {
            
            // loop through remittances.  Calculate and save the total under total_amount
            for (var j = 0; j<remittances.length; j++) {
                var amount = remittances[j].amount;

                total_amount += amount
            }
        // if formatted as a single value and not an array, a loop is not needed and will break.  We do this instead.
        } else {
            total_amount = remittances.amount
        }

        // save the resulting total_amount to the json array
        array[i].payment.total_amount = Math.round(total_amount * 100) / 100;   
    }
    // return the array with the total_amounts added
    return array
}

// we will use this function to display the kendo charts
function displayCharts(json){

    // save the json data into these arrays for ease of use.  Each chart formats data a little differently so this semmed to be the easiest way
    var index = []
    var names = []
    var totals = []
    var amounts = []
    var colors = ['#a6bddb','#74a9cf','#3690c0','#0570b0','#045a8d','#023858']

    // save variables to simple arrays for simple chart
    for(var i = 0; i<json.length; i++){
        index.push(i)
        names.push(json[i].payment.vendor.name)
        totals.push(json[i].payment.total_amount)
    }

    // basic bar chart for a high level view.  I explored a lot of barcharts with stacked data but I couldn't find a way that would let me stack by vendor with an unlimited number of invoices.
    $("#chart").kendoChart({
        title: {
            text: "Total Payments by Payment"
        },
        series: [
            { name: "Total Payment Amount", data: totals }
        ],
        categoryAxis:{
            categories: names
        }
    });

    // get total accross all values for pie chart
    grandTotal = totals.reduce((a,b) => a+b,0)

    // format data for pie chart
    var pieData = []
    for(var j = 0; j<index.length; j++){
        pieData.push({
            'category': names[j],
            'percent': (totals[j]/grandTotal) * 100,
            'color': colors[j],
            'value': totals[j]
        })
    }

    // large pie chart
    $("#piechart").kendoChart({
        title: {
            position: "bottom",
            text: "Share of Vendor Payments"
        },
        legend: {
            visible: false
        },
        chartArea: {
            background: ""
        },
        seriesDefaults: {
            labels: {
                visible: true,
                background: "transparent",
                // I would like to learn more about these template strings.  The tooltips we have could be much better but for whatever reason I couldn't figure out how to add variables here.
                template: "#= category #: \n $#= value#"
            }
        },
        series: [{
            type: "pie",
            startAngle: 150,
            data: pieData
        }],
        tooltip: {
            visible: true,
            format: "${0}"
        }
    });   

    // pie chart generator.  After building the larger pie chart I built this loop to generate mini piecharts expanding on each slice of the larger piechart
    for(var k = 0; k<json.length; k++){
        var smallPieData = []
        var rem = json[k].payment.remittance
        // Here again we have a work around for payments with one payment not structured as an array.  It doesn't really make sense to have a pie chart with one payment, however, looking just at the larger pie chart without additional information there is no way to see how many invoices are represented in each slice.
        // Leaving out some pie charts because there is only one invoice might make it feel that data is missing, because the viewer will not know that the missing pie charts only have one invoice.
        // This issue would be solved with better tooltips. If I were to work on this longer that would be a priority.
        if(rem.length){
            for(var l = 0; l<rem.length; l++){
                smallPieData.push({
                    'category': rem[l].description,
                    'color': colors[l],
                    'value': rem[l].amount
                })
            }
        } else {
            smallPieData.push({
                'category': rem.description,
                'color': colors[1],
                'value': rem.amount
            })
        }
        $("#piechart"+k).kendoChart({
            title: {
                position: "bottom",
                text: names[k]
            },
            legend: {
                visible: false
            },
            chartArea: {
                background: ""
            },
            seriesDefaults: {
                labels: {
                    visible: true,
                    background: "transparent",
                    // these lables are sometimes cut off reguardless of chart size.  With more time I would investigate this further.
                    template: "#= category #: \n $#= value#"
                }
            },
            series: [{
                type: "pie",
                startAngle: 150,
                data: smallPieData
            }],
            tooltip: {
                visible: true,
                format: "{0}",
                template: "#= category #: \n $#= value#"
            }
        });
    }
}


//load the json file:
fetch("./invoices.json")
    .then(response => {
       return response.json();
    })
    // .then(data => addTotal(data));
    .then(data => addTotal(data))
    // add in the kendo charts here for question 2
    .then(res => {
        displayCharts(res)
    })  
