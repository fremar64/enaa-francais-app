import type {
  ActivityEvaluationSurface,
  PedagogicalEvent
} from "../activity-contract";

export class ActivityRunner {
  private startTime: number | null = null;
  private events: PedagogicalEvent[] = [];
  private attempts = 0;
  private errors = 0;
  private success = false;

  start() {
    this.startTime = Date.now();
    this.events = [];
    this.attempts = 0;
    this.errors = 0;
    this.success = false;
  }

  recordEvent(event: PedagogicalEvent) {
    this.ensureStarted();
    this.events.push(event);
    this.applyEvent(event);
  }

  recordAttempt() {
    this.recordEvent({ type: "attempt", timestamp: Date.now() });
  }

  recordError(code: string) {
    this.recordEvent({ type: "error", code, timestamp: Date.now() });
  }

  recordSuccess() {
    this.recordEvent({ type: "success", timestamp: Date.now() });
  }

  recordHint(level: number) {
    this.recordEvent({ type: "hint-used", level, timestamp: Date.now() });
  }

  recordAbandon() {
    this.recordEvent({ type: "abandon", timestamp: Date.now() });
  }

  getSurface(): ActivityEvaluationSurface {
    return {
      attempts: this.attempts,
      errors: this.errors,
      success: this.success,
      durationMs: this.getDurationMs(),
      events: [...this.events]
    };
  }

  private ensureStarted() {
    if (this.startTime === null) {
      this.start();
    }
  }

  private getDurationMs() {
    if (this.startTime === null) {
      return 0;
    }

    return Date.now() - this.startTime;
  }

  private applyEvent(event: PedagogicalEvent) {
    if (event.type === "attempt") {
      this.attempts += 1;
    }

    if (event.type === "error") {
      this.errors += 1;
    }

    if (event.type === "success") {
      this.success = true;
    }
  }
}
