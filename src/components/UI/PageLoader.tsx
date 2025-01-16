import { Progress } from "antd";
import { useState, useEffect } from "react";

export function PageLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Progress
      percent={progress}
      showInfo={false}
      strokeColor="#006F01"
      rootClassName="!rounded-none !absolute !w-full -!top-5 !p-0 !left-0"
    />
  );
}
