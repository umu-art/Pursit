import {Injectable} from '@angular/core';
import init, {ApmBase} from '@elastic/apm-rum'
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ApmService {

  private apm: ApmBase;

  constructor() {
    this.apm = init({
      serviceName: 'pursit',
      serverUrl: 'https://apm.pursit.ru',
      serviceVersion: '0.0.1'
    })

    if (!localStorage.getItem('userId')) {
      localStorage.setItem('userId', uuid.v4());
    }
    let userId = localStorage.getItem('userId')!;

    this.apm.setUserContext({
      id: userId.toString(),
    });
  }

  public logError(error: Error) {
    this.apm.captureError(error);
  }

  public logGoto(name: string, attr: string) {
    const transaction = this.apm.startTransaction(name, 'custom', {managed: true});
    if (!transaction) {
      console.error('Failed to start transaction');
      return;
    }

    if (attr) {
      transaction.addLabels({attr: attr});
    }

    const span = transaction.startSpan('async-task', 'app', {blocking: true});
    if (!span) {
      console.error('Failed to start span');
      return;
    }

    setTimeout(() => {
      span.end();
      transaction.end();
    }, 10);
  }
}
