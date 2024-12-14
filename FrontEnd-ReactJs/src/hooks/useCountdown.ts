import { useState, useEffect, useCallback } from 'react';

// ----------------------------------------------------------------------

type ReturnType = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

export default function useCountdown(date: Date, isReady: boolean): ReturnType {
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const setNewTime = useCallback(
    (cb: () => void) => {
      const startTime = date;

      const endTime = new Date();

      const distanceToNow = startTime.valueOf() - endTime.valueOf();

      if (distanceToNow < 0) {
        setCountdown({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        cb && cb();
        return;
      }

      const getDays = Math.floor(distanceToNow / (1000 * 60 * 60 * 24));

      const getHours = `0${Math.floor(
        (distanceToNow % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )}`.slice(-2);

      const getMinutes = `0${Math.floor((distanceToNow % (1000 * 60 * 60)) / (1000 * 60))}`.slice(
        -2
      );

      const getSeconds = `0${Math.floor((distanceToNow % (1000 * 60)) / 1000)}`.slice(-2);

      setCountdown({
        days: getDays.toString() || '000',
        hours: getHours || '000',
        minutes: getMinutes || '000',
        seconds: getSeconds || '000',
      });
    },
    [date]
  );

  useEffect(() => {
    if (isReady) {
      const interval = setInterval(
        () =>
          setNewTime(() => {
            clearInterval(interval);
          }),
        1000
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
      return () => clearInterval(interval);
    }
    return () => {};
  }, [isReady, setNewTime]);

  return {
    days: countdown.days,
    hours: countdown.hours,
    minutes: countdown.minutes,
    seconds: countdown.seconds,
  };
}

// Usage
// const countdown = useCountdown(new Date('07/07/2022 21:30'));
