import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimerService } from '../services/timer'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  styleUrls: ['./app.css'],
  imports: [FormsModule]
})
export class App {

  timeInput = 480;
  remaining = 0;
  isRunning = false;

  private audio = new Audio('assets/timer_alarm.mp3');

  //protected readonly title = signal('repeat-timer');

  constructor(private timer: TimerService) { }

  ngOnInit() {
    this.audio.loop = true;

    this.timer.remaining$.subscribe(value => {
      this.remaining = value;

      if (value === 0 && !this.isRunning) {
        this.audio.play();
      }
    });

    this.timer.running$.subscribe(r => {
      this.isRunning = r;
    });
  }

  start() {
    this.timer.setDuration(this.timeInput);
    this.timer.start();
  }

  next() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.timer.nextCycle();
  }

  done() {
    this.audio.pause();
    this.timer.stopInterval();
  }

  format(sec: number): string {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
}
