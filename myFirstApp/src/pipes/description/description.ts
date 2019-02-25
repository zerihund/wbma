import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from '../../providers/media/media';
import { Pic } from '../../interfaces/Pic';

/**
 * Generated class for the DescriptionPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'description',
})
export class DescriptionPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  constructor(private mediaProvider: MediaProvider) {

  }

  transform(value: string) {

    const pattern = '\\[d\\](.*?)\\[\\/d\\]';
    const re = new RegExp(pattern);
    // console.log(re.exec(value));
    try {
      return re.exec(value)[1];
    } catch (e) {
      return value;
    }
  }
}
