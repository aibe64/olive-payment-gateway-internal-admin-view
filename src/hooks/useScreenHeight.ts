import { useState, useEffect } from "react";

interface ScreenHeightData {
  screenHeight: number;
}

export const useScreenHeight = (): ScreenHeightData => {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    // Function to update the screen height
    const updateHeight = () => {
      setScreenHeight(window.innerHeight);
    };

    // Update height on mount
    updateHeight();

    // Add event listener for window resize
    window.addEventListener("resize", updateHeight);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return {
    screenHeight,
  };
};

