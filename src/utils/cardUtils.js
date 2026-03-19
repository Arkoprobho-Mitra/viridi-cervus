export const getCardProvider = (number) => {
    const numStr = number.replace(/\D/g, '');
    if (!numStr) return 'Visa';
    
    if (numStr.startsWith('4')) return 'Visa';
    if (/^5[1-5]/.test(numStr) || /^2(22[1-9]|2[3-9][0-9]|[3-6][0-9]{2}|7[0-1][0-9]|720)/.test(numStr)) return 'Mastercard';
    if (/^3[47]/.test(numStr)) return 'Amex';
    if (/^6(?:011|5[0-9]{2})/.test(numStr)) return 'Discover';
    if (/^6(0|52|53)/.test(numStr) || /^8(1|2)/.test(numStr)) return 'RuPay';
    
    return 'Unknown';
};

export const validateCardNumber = (number) => {
    const numStr = number.replace(/\D/g, '');
    if (numStr.length < 13 || numStr.length > 19) return false;

    let sum = 0;
    let isEven = false;

    for (let i = numStr.length - 1; i >= 0; i--) {
        let digit = parseInt(numStr.charAt(i), 10);
        
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        isEven = !isEven;
    }

    return (sum % 10) === 0;
};
