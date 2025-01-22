import { useState } from "react";
import { useIdleTimer } from "react-idle-timer";

interface TimeoutHookProps {
  timeoutDuration?: number;
  onTimeout: () => void;
}

export const useTimeoutHook = ({
  timeoutDuration = 1800000,
  onTimeout,
}: TimeoutHookProps) => {
  const [isIdle, setIsIdle] = useState(false);

  const handleOnIdle = () => {
    setIsIdle(true);
    onTimeout();
  };

  const handleOnActive = () => {
    setIsIdle(false);
  };

  const {
    getRemainingTime,
    getElapsedTime,
    isIdle: isUserIdle,
  } = useIdleTimer({
    timeout: timeoutDuration,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    debounce: 500, // Debouncing events to prevent too many triggers
  });

  return {
    isIdle,
    getRemainingTime,
    getElapsedTime,
    isUserIdle,
  };
};
