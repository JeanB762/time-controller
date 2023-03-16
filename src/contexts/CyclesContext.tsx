import { Children, createContext, ReactNode, useState } from 'react';

interface CreateCycleData {
  task: string;
  minutesAmmount: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  ammountSecondsPassed: number;
  handleFinishActiveCycle: () => void;
  updateSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptActiveCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesProviderType {
  children: ReactNode;
}

export function CyclesContextProvider({ children }: CyclesProviderType) {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [ammountSecondsPassed, setAmmountSecondsPassed] = useState<number>(0);
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function updateSecondsPassed(seconds: number) {
    setAmmountSecondsPassed(seconds);
  }

  function handleFinishActiveCycle() {
    setCycles((cycles) =>
      cycles.map((cycle) => {
        return cycle.id === activeCycleId
          ? { ...cycle, finishedDate: new Date() }
          : cycle;
      })
    );
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmmount: data.minutesAmmount,
      startDate: new Date(),
    };

    setCycles((currentCycles) => [...currentCycles, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmmountSecondsPassed(0);
  }

  function interruptActiveCycle() {
    setCycles((cycles) =>
      cycles.map((cycle) => {
        return cycle.id === activeCycleId
          ? { ...cycle, interruptedDate: new Date() }
          : cycle;
      })
    );

    setActiveCycleId(null);
  }
  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        ammountSecondsPassed,
        handleFinishActiveCycle,
        updateSecondsPassed,
        createNewCycle,
        interruptActiveCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
