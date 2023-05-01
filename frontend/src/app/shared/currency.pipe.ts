import { Pipe, PipeTransform } from '@angular/core';
import * as currencyFormatter from 'currency-formatter';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number, currencyCode: string): string {
    return currencyFormatter.format(value, { code: currencyCode });
  }
}


// @Pipe({ name: 'currencyConversion' })
// export class CurrencyConversionPipe implements PipeTransform {
//   transform(price: number, selectedCountry: string): number {
//     switch (selectedCountry) {
//       case 'USD':
//         return price * 1; // no conversion needed for USD
//       case 'EUR':
//         return price * 0.83; // convert to EUR
//       case 'JPY':
//         return price * 109.71; // convert to JPY
//       // add more cases as needed for other currencies
//       default:
//         return price; // return original price if no matching case found
//     }
//   }
// }
