import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TimerService {

  private duration = 0;

  private remaining = new BehaviorSubject<number>(0);
  private running = new BehaviorSubject<boolean>(false);

  private sub?: Subscription;

  constructor(private ngZone: NgZone) {}

  remaining$ = this.remaining.asObservable();
  running$ = this.running.asObservable();

  setDuration(seconds: number) {
    this.duration = seconds;
    // ensure we emit inside Angular zone so components update bindings
    this.ngZone.run(() => this.remaining.next(seconds));
  }

  start() {
    console.log('Timer start called'); // ✅ debug

    this.sub?.unsubscribe();

    // set running state inside the zone
    this.ngZone.run(() => this.running.next(true));

    // interval may run outside Angular's zone in some environments; keep
    // the timer callback lightweight and ensure subject updates happen
    // inside the zone so change detection runs.
    this.sub = interval(1000).subscribe(() => {
      const current = this.remaining.getValue() - 1;

      console.log('tick:', current); // ✅ debug

      if (current <= 0) {
        this.ngZone.run(() => {
          this.remaining.next(0);
          this.running.next(false);
        });
        this.stopInterval();
      } else {
        this.ngZone.run(() => this.remaining.next(current));
      }
    });
  }

  stopInterval() {
    this.sub?.unsubscribe();
    // also ensure running state update occurs inside the zone
    this.ngZone.run(() => this.running.next(false));
  }

  nextCycle() {
    this.start(); // reuse same duration
  }
}
