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
    if (this.sub) this.sub.unsubscribe();

    this.running.next(true);

    this.sub = interval(1000).subscribe(() => {
      const current = this.remaining.value - 1;

      if (current <= 0) {
        this.remaining.next(0);
        this.running.next(false);
        this.stopInterval();
      } else {
        this.remaining.next(current);
      }
    });
  }

  reset() {
    this.stopInterval();
    this.remaining.next(this.duration);
  }

  stopInterval() {
    this.sub?.unsubscribe();
    this.running.next(false);
  }

  nextCycle() {
    this.setDuration(this.duration);
    this.start();
  }
}
