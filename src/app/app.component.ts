import {
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, effect,
  inject,
  Injectable,
  NgZone,
  signal
} from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private counter = signal(0);

  // private counter$ = new BehaviorSubject<number>(0);

  incrementCounter() {
    this.counter.update(v => v + 1);
    // this.counter$.next(this.counter$.value + 1);
  }

  getCounter() {
    return this.counter.asReadonly();
    // return this.counter$.asObservable();
  }
}

@Component({
  standalone: true,
  selector: 'child-one',
  template: `
    <h1>Child one: {{ getRandomNumber() }}</h1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildOneComponent {

  getRandomNumber() {
    return Math.random();
  }

}

@Component({
  standalone: true,
  selector: 'grand-child',
  template: `
    <h1>Grand child: {{ getRandomNumber() }}</h1>
    <h2>Counter: {{ counter() }}</h2>
    <button (click)="incrementCounter()">Increment counter</button>
  `,
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GrandChildComponent {

  counter = signal(0);

  private cdr= inject(ChangeDetectorRef);

  constructor() {
    setTimeout(() => {
      this.counter.set(5);
    }, 2000);
  }

  incrementCounter(){
    this.counter.update(v => v + 1);
  }

  getRandomNumber() {
    return Math.random();
  }
}

@Component({
  standalone: true,
  selector: 'child-two',
  template: `
    <h1>Child two: {{ getRandomNumber() }}</h1>
    <grand-child/>
  `,
  imports: [GrandChildComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildTwoComponent {

  getRandomNumber() {
    return Math.random();
  }
}


@Component({
  selector: 'app-root',
  template: `
    <h1>App Component: {{ getRandomNumber() }}</h1>
    <child-one></child-one>
    <child-two></child-two>
  `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  private counterService = inject(CounterService);

  incrementCounter() {
    this.counterService.incrementCounter();
  }

  getRandomNumber() {
    return Math.random();
  }

}
