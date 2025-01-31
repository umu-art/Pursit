import {SitterDto} from '../api-core-ts';


export function shuffleArray(array: any[]) {
  let m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

export function parseTakes(sitter: SitterDto) {
  if (sitter.takesCats && sitter.takesDogs) {
    return 'котов и собак';
  }
  if (sitter.takesCats) {
    return 'котов'
  }
  if (sitter.takesDogs) {
    return 'собак'
  }
  return;
}
