import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TimerService {
  private duration = 0;
  private endTime = 0;

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
    this.sub?.unsubscribe();

    // ✅ calculate real end timestamp
    this.endTime = Date.now() + this.duration * 1000;

    this.running.next(true);

    // ✅ update more frequently for accuracy
    this.sub = interval(250).subscribe(() => {
      const now = Date.now();
      const secondsLeft = Math.max(
        0,
        Math.ceil((this.endTime - now) / 1000)
      );

      this.remaining.next(secondsLeft);

      if (secondsLeft <= 0) {
        this.running.next(false);
        this.stopInterval();
      }
    });
  }

  stopInterval() {
    this.sub?.unsubscribe();
    this.running.next(false);
  }

  reset() {
    this.stopInterval();
    this.remaining.next(this.duration);
  }

  nextCycle() {
    this.start(); // ✅ reuse same duration
  }
}
