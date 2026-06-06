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
  timeInput = 4; // 480;

  // UI state
  remaining = 0;
  isRunning = false;

  // audio for alarm
  private audio = new Audio('assets/beep.mp3');
  private audioUnlocked = false;

  // inject service (modern Angular style)
  private timerService = inject(TimerService);

  ngOnInit() {
    // loop the sound
    this.audio.loop = true;

    // subscribe to remaining time
    this.timerService.remaining$.subscribe(value => {
      this.remaining = value;
    });

    // subscribe to running state
    this.timerService.running$.subscribe(running => {
      const wasRunning = this.isRunning;
      this.isRunning = running;

      if (wasRunning && !running && this.remaining === 0) {
        this.playAlarm();
      }
    });
  }

  start() {
    void this.unlockAudio();
    this.stopAlarm();
    this.timerService.setDuration(this.timeInput);
    this.timerService.start();
  }

  next() {
    void this.unlockAudio();
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

  private async unlockAudio() {
    if (this.audioUnlocked) {
      return;
    }

    this.audio.muted = true;

    try {
      await this.audio.play();
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audioUnlocked = true;
    } catch {
      console.warn('Audio unlock failed');
    } finally {
      this.audio.muted = false;
    }
  }

  // ✅ helper: stop alarm
  private stopAlarm() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
