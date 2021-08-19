import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'times'
})
export class TimesPipe implements PipeTransform {

  transform(value: any): any {
    moment.locale('fr');
    console.log(value);
    const time = moment(value.toDate()).format('LLL');
    return time;

  }

}
