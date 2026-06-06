import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimerService } from '../services/timer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html'
})
export class App implements OnInit {

  // user input (default = 8 minutes)
  timeInput = 480;

  // UI state
  remaining = 0;
  isRunning = false;

  // audio for alarm
  private audio = new Audio('assets/beep.mp3');

  // inject service (modern Angular style)
  private timerService = inject(TimerService);

  ngOnInit() {
    // loop the sound
    this.audio.loop = true;

    // subscribe to remaining time
    this.timerService.remaining$.subscribe(value => {
      this.remaining = value;

      // when timer finishes → play sound
      if (value === 0 && !this.isRunning) {
        this.playAlarm();
      }
    });

    // subscribe to running state
    this.timerService.running$.subscribe(running => {
      this.isRunning = running;
    });
  }

  start() {
    this.stopAlarm();
    this.timerService.setDuration(this.timeInput);
    this.timerService.start();
  }

  next() {
    this.stopAlarm();
    this.timerService.nextCycle();
  }

  done() {
    this.stopAlarm();
    this.timerService.stopInterval();
  }

  // ✅ helper: format mm:ss
  format(seconds: number): string {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  // ✅ helper: play alarm safely
  private playAlarm() {
    this.audio.currentTime = 0;
    this.audio.play().catch(() => {
      // browsers may block autoplay until user interaction
      console.warn('Audio play blocked until user interaction');
    });
  }

  // ✅ helper: stop alarm
  private stopAlarm() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
