import  {expect} from 'chai'


// Import the totalPhoneBill function
import { totalPhoneBill } from '../totalPhoneBill.js';

describe('totalPhoneBill', function() {

    it('should return the correct total for a string input', function() {
        const result = totalPhoneBill('call, sms, call, sms, sms', 0.65, 2.75);
        expect(result).to.equal('R7.45');
    });

    it('should return the correct total for an array input', function() {
        const result = totalPhoneBill(['call', 'sms', 'call', 'sms', 'sms'], 0.65, 2.75);
        expect(result).to.equal('R7.45');
    });

    it('should return the correct total for an object input', function() {
        const result = totalPhoneBill({ first: 'call', second: 'sms', third: 'call', fourth: 'sms', fifth: 'sms' }, 0.65, 2.75);
        expect(result).to.equal('R7.45');
    });

    it('should throw an error for unsupported data types', function() {
        expect(() => totalPhoneBill(12345, 0.65, 2.75)).to.throw("Unsupported data type for 'bill'");
    });

    it('should return the correct total for different prices', function() {
        const result = totalPhoneBill('call, sms, call', 1.00, 3.00);
        expect(result).to.equal('R7.00');
    });

});
