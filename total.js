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
    // need an array of names and an array of total amounts
    // names and amounts are 1 unique per payment
    // should we add descriptions for tool tips?

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
        
        var remAmount = []
        var rem = json[i].payment.remittance
        if(rem.length){
            for(var h = 0; h<rem.length; h++){
                remAmount.push(rem[h].amount)
            }
        } else {
            remAmount.push(rem.amount)
        }
        
        amounts.push(remAmount)
    }
    

    var stackedBarData = []
    for(var j = 0; j<index.length; j++){
        
        stackedBarData.push({
            // i need one array for each invoice number 
            'name': names[j],
            'data': amounts[j],
            'color': colors[j],
        })
    }

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

    // $("#chart").kendoChart({
    //     title: {
    //         text: "Number of invoices"
    //     },
    //     legend: {
    //         visible: false
    //     },
    //     seriesDefaults: {
    //         type: "column",
    //         stack: true
    //     },
    //     series: stackedBarData,
    //     valueAxis: {
    //         // max: Math.max(totals) + 1000,
    //         max: 18000,
    //         line: {
    //             visible: false
    //         },
    //         minorGridLines: {
    //             visible: true
    //         }
    //     },
    //     categoryAxis: {
    //         categories: ['Invoice 1','Invoice 2','Invoice 3','Invoice 4'],
    //         majorGridLines: {
    //             visible: false
    //         }
    //     },
    //     tooltip: {
    //         visible: true,
    //         template: "#= series.name #: #= value #"
    //     }
    // });

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
                template: "#= category #: \n #= value#"
            }
        },
        series: [{
            type: "pie",
            startAngle: 150,
            data: pieData
        }],
        tooltip: {
            visible: true,
            format: "{0}"
        }
    });   

    // pie chart generator
    for(var k = 0; k<json.length; k++){
        var smallPieData = []
        var rem = json[k].payment.remittance
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
console.log(smallPieData)
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
                    visible: false,
                    background: "transparent",
                    template: "#= category #: \n #= value#"
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
                template: "#= category #: \n #= value#"
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
