import { differenceInSeconds } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { CyclesContext } from '../../../../contexts/CyclesContext';
import { CountdownContainer, Separator } from './styles';

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    ammountSecondsPassed,
    finishActiveCycle,
    updateSecondsPassed,
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - ammountSecondsPassed : 0;
  const minutesAmmount = Math.floor(currentSeconds / 60);
  const secondsAmmount = currentSeconds % 60;
  const minutes = String(minutesAmmount).padStart(2, '0');
  const seconds = String(secondsAmmount).padStart(2, '0');

  useEffect(() => {
    if (activeCycle) document.title = `${minutes}:${seconds}`;
  }, [minutes, seconds, activeCycle]);

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        );

        if (secondsDifference >= totalSeconds) {
          finishActiveCycle();
          updateSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          updateSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    finishActiveCycle,
    updateSecondsPassed,
  ]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
