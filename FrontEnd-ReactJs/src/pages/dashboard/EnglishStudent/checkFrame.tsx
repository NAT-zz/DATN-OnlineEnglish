import DailyIframe, { DailyCall } from '@daily-co/daily-js';

let dailyInstance: DailyCall | null = null;

export function getDailyInstance(container: HTMLElement): DailyCall {
  if (!dailyInstance) {
    dailyInstance = DailyIframe.createFrame(container, {
      showLeaveButton: true,
    });
  }
  return dailyInstance;
}

export function destroyDailyInstance() {
  if (dailyInstance) {
    dailyInstance.destroy();
    dailyInstance = null;
  }
}
