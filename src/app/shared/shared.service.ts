import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  isLoading = new BehaviorSubject<boolean>(false);

  constructor() {}
}
