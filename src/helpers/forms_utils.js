import {MONEY} from './regex_constants';

export const parseNumTel = (num) => {
    let tel_string = '';
    for (let x = 0; x < num.length; x++ ) {
        switch (x) {
            case 0: tel_string += '(' + num[x]; break;
            case 2: tel_string += num[x] + ')'; break;
            case 5: (num.length > 6) ? tel_string += num[x] + '-' : tel_string += num[x] + ''; break;
            case 7: (num.length > 8) ? tel_string += num[x] + '-' : tel_string += num[x] + ''; break;
            default: tel_string += num[x];
        }
    }
    return tel_string;
}

export const validateNumTel = (target) => {
    let numbers = "";
    for (let x = 0; x < target.value.length; x++ ) {
        if (!isNaN(target.value[x]))
            numbers += target.value[x];
    }
    if (numbers.length <= 10)
        return {valid: true, value: numbers};
    return {valid: false, value: ''};
}

export const parseMoneyInput = (money) => {
    return (money.length > 0 && !isNaN(money)) ? `$${money}` : ``;
}