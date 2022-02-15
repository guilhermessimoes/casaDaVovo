import IMask from 'imask';

let inputElement = document.getElementsById('currency-mask');
var currencyMask = {
  mask: '$num'
}
var mask = Imask(inputElement, currencyMask)