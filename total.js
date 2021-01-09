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
        array[i].payment.total_amount = total_amount;   
    }
    // return the array with the total_amounts added
    return array
}

// we will use this function to display the kendo charts
function displayCharts(json){
    $("#chart").kendoChart({
        title: {
            text: "Kendo Chart Example"
        },
        series: [
            { name: "Example Series", data: [200, 450, 300, 125] }
        ],
        categoryAxis:{
            categories: [ 2000, 2001, 2002, 2003 ]
        }
    });
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
