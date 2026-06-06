import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TimerService {

  private duration = 0;

  private remaining = new BehaviorSubject<number>(0);
  private running = new BehaviorSubject<boolean>(false);

  private sub?: Subscription;

  remaining$ = this.remaining.asObservable();
  running$ = this.running.asObservable();

  setDuration(seconds: number) {
    this.duration = seconds;
    this.remaining.next(seconds);
  }

  start() {
    console.log('Timer start called'); // ✅ debug

    this.sub?.unsubscribe();

    this.running.next(true);

    this.sub = interval(1000).subscribe(() => {
      const current = this.remaining.getValue() - 1;

      console.log('tick:', current); // ✅ debug

      if (current <= 0) {
        this.remaining.next(0);
        this.running.next(false);
        this.stopInterval();
      } else {
        this.remaining.next(current);
      }
    });
  }

  stopInterval() {
    this.sub?.unsubscribe();
    this.running.next(false);
  }

  nextCycle() {
    this.start(); // reuse same duration
  }
}
