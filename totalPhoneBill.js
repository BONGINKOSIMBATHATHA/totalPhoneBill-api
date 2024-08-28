export var totalPhoneBill = function (bill, smsPrice, callPrice) {
    if (Array.isArray(bill)) {
        bill = bill.join(', ');
    } else if (typeof bill === 'object' && bill !== null) {
        bill = Object.values(bill).join(', ');
    } else if (typeof bill !== 'string') {
        throw new Error("Unsupported data type for 'bill'");
    }

    var phoneBill = bill.split(', ');
    var calls = [];
    var sms = [];
    for (var i = 0; i < phoneBill.length; i++) {
        if (phoneBill[i].startsWith('c')) {
            calls.push(phoneBill[i]);
        }
        else if (phoneBill[i].startsWith('s')) {
            sms.push(phoneBill[i]);
        }
    }
    var call = callPrice * calls.length;
    var smss = smsPrice * sms.length;
    var total = call + smss;

    return 'R' + total.toFixed(2);
}




































// function totalPhoneBill(data) {
//     const calls = data.split(',').filter(item => item.trim() === 'call').length;
//     const sms = data.split(',').filter(item => item.trim() === 'sms').length;
    
//     const callCost = calls * 2.75;
//     const smsCost = sms * 0.65;
    
//     const totalCost = callCost + smsCost;
    
//     return 'R' + totalCost.toFixed(2);
// }

// // Example usage:
// const data = 'call, sms, call, sms, sms';
// console.log(totalPhoneBill(data)); // Output: R7.45