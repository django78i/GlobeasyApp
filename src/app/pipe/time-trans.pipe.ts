import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({
  name: 'timeTrans'
})
export class TimeTransPipe implements PipeTransform {

  transform(value: any): any {
    moment.locale('fr');
    console.log(value);
    const time = moment(value.toDate()).fromNow();
    return time;
  }

}
