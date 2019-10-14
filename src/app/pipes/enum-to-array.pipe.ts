import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {

  transform
  : (val) => {index: string, name: string}[]
  = (value) => Object.keys(value).map((o) => ({index: '' + o, name: value[o]}))
}
