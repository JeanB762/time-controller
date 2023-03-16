import { createContext, ReactNode, useReducer, useState } from 'react';

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
  finishActiveCycle: () => void;
  updateSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptActiveCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesProviderType {
  children: ReactNode;
}

export function CyclesContextProvider({ children }: CyclesProviderType) {
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    if (action.type === 'ADD_NEW_CYCLE') {
      return [...state, action.payload.newCycle];
    }
    return state;
  }, []);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [ammountSecondsPassed, setAmmountSecondsPassed] = useState<number>(0);
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function updateSecondsPassed(seconds: number) {
    setAmmountSecondsPassed(seconds);
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmmount: data.minutesAmmount,
      startDate: new Date(),
    };

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    });
    // setCycles((currentCycles) => [...currentCycles, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmmountSecondsPassed(0);
  }

  function interruptActiveCycle() {
    dispatch({
      type: 'INTERRUPT_ACTIVE_CYCLE',
      payload: {
        activeCycleId,
      },
    });
    // setCycles((cycles) =>
    //   cycles.map((cycle) => {
    //     return cycle.id === activeCycleId
    //       ? { ...cycle, interruptedDate: new Date() }
    //       : cycle;
    //   })
    // );

    setActiveCycleId(null);
  }

  function finishActiveCycle() {
    dispatch({
      type: 'FINISH_ACTIVE_CYCLE',
      payload: {
        activeCycleId,
      },
    });
    // setCycles((cycles) =>
    //   cycles.map((cycle) => {
    //     return cycle.id === activeCycleId
    //       ? { ...cycle, finishedDate: new Date() }
    //       : cycle;
    //   })
    // );
  }
  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        ammountSecondsPassed,
        finishActiveCycle,
        updateSecondsPassed,
        createNewCycle,
        interruptActiveCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
