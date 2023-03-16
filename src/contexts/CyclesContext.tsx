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

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function CyclesContextProvider({ children }: CyclesProviderType) {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      switch (action.type) {
        case 'ADD_NEW_CYCLE':
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id,
          };
        case 'INTERRUPT_ACTIVE_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              return cycle.id === state.activeCycleId
                ? { ...cycle, interruptedDate: new Date() }
                : cycle;
            }),
            activeCycleId: null,
          };
        case 'FINISH_ACTIVE_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              return cycle.id === state.activeCycleId
                ? { ...cycle, finishedDate: new Date() }
                : cycle;
            }),
            activeCycleId: null,
          };
        default:
          return state;
      }
    },
    {
      cycles: [],
      activeCycleId: null,
    }
  );
  const [ammountSecondsPassed, setAmmountSecondsPassed] = useState<number>(0);

  const { cycles, activeCycleId } = cyclesState;
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
    setAmmountSecondsPassed(0);
  }

  function interruptActiveCycle() {
    dispatch({
      type: 'INTERRUPT_ACTIVE_CYCLE',
      payload: {
        activeCycleId,
      },
    });
  }

  function finishActiveCycle() {
    dispatch({
      type: 'FINISH_ACTIVE_CYCLE',
      payload: {
        activeCycleId,
      },
    });
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
