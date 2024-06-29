import { useState } from 'react';

export const useSpeedControl = () => {
  const [speed, setSpeed] = useState(2000);

  const faster = () => {
    setSpeed((currentSpeed) => {
      const delta = currentSpeed > 1000 ? 1000 : 100;
      const newSpeed = currentSpeed - delta;

      return Math.max(100, newSpeed);
    });
  };

  const slower = () => {
    setSpeed((currentSpeed) => {
      const delta = currentSpeed > 1000 ? 1000 : 100;
      const newSpeed = currentSpeed + delta;

      return Math.min(10000, newSpeed);
    });
  };

  return { speed, setSpeed, faster, slower };
};
