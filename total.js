function addTotal(array) {
    // run this function on an array of payments (in json format, with any number of invoices per payment) to add a series of invoice totals for each payment

    // loop through each payment
    for (var i = 0; i<array.length; i++) {
        // console.log(i)
        // save the payment to a variable
        var remittances = array[i].payment.remittance;

        var total_amount = 0
        // loop through remittances
        if (remittances.length) {

            for (var j = 0; j<remittances.length; j++) {
                var amount = remittances[j].amount;
                
                total_amount += amount
                
                // console.log(total_amount)
            }
        } else {
            total_amount = remittances.amount
            // console.log(total_amount)
        }

        array[i].payment.total_amount = total_amount;
        // console.log(array)
    }

    return array
}


//load the json file:
fetch("./invoices.json")
    .then(response => {
       return response.json();
    })
    // .then(data => addTotal(data));
    .then(data => console.log(addTotal(data)))

// var newjson = fetch("./invoices.json")
//     .then(response => {
//        return response.json();
//     })
//     // .then(data => addTotal(data));
//     .then(data => addTotal(data))

// console.log(newjson)