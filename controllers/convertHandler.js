function ConvertHandler() {
  conversionTypes = [
    {
      type: 'gal',
      fullName: 'gallons',
      oppositeType: 'L'
    },
    {
      type: 'L',
      fullName: 'liters',
      oppositeType: 'gal'
    },
    {
      type: 'lbs',
      fullName: 'pounds',
      oppositeType: 'kg'
    },
    {
      type: 'kg',
      fullName: 'kilograms',
      oppositeType: 'lbs'
    },
    {
      type: 'mi',
      fullName: 'miles',
      oppositeType: 'km'
    },
    {
      type: 'km',
      fullName: 'kilometers',
      oppositeType: 'mi'
    }
  ];
  
  this.getNum = function(input) {
    let result;

    if(input && input.length > 0)
    {
      try {
        let lastIndex = 0;
        let pattern = /\d/g;
        while(pattern.test(input) == true) {
          lastIndex = pattern.lastIndex;
        }
        let numString = input.substring(0, lastIndex);
        
        if(!numString || numString.length === 0) {
          result = 1;
        } else {
          result = eval(numString);
        }
      } catch {
        result = undefined;
      }
    } else {
      result = undefined;
    }

    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    
    if(input && input.length > 0)
    {
      try {
        let lastIndex = 0;
        let pattern = /\d/g;
        while(pattern.test(input) == true) {
          lastIndex = pattern.lastIndex;
        }
        let unitString = input.substring(lastIndex);
        
        if(!unitString || unitString.length === 0) {
          result = undefined;
        } else {
          let existing = conversionTypes.find(d => d.type.toLowerCase() === unitString.toLowerCase());
          if(existing) {
            result = existing.type;
          }
        }
      } catch {
        result = undefined;
      }
    } else {
      result = undefined;
    }

    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;

    let existing = conversionTypes.find(d => d.type.toLowerCase() === initUnit.toLowerCase());
    if(existing) {
      result = existing.oppositeType;
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    let existing = conversionTypes.find(d => d.type === unit);
    if(existing)
      result = existing.fullName;

    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch(initUnit) {
      case 'gal':
        result = parseFloat((initNum * galToL).toFixed(5));
        break;
      case 'L':
        result = parseFloat((initNum / galToL).toFixed(5));
        break;
      case 'lbs':
        result = parseFloat((initNum * lbsToKg).toFixed(5));
        break;
      case 'kg':
        result = parseFloat((initNum / lbsToKg).toFixed(5));
        break;
      case 'mi':
        result = parseFloat((initNum * miToKm).toFixed(5));
        break;
      case 'km':
        result = parseFloat((initNum / miToKm).toFixed(5));
        break;
      default:
        result = '';
        break;
    }
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    let initUnitFull = this.spellOutUnit(initUnit);
    let returnUnitFull = this.spellOutUnit(returnUnit);
    
    result = `${initNum} ${initUnitFull} converts to ${returnNum} ${returnUnitFull}`;

    return result;
  };
  
}

module.exports = ConvertHandler;
