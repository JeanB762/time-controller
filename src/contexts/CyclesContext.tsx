import { differenceInSeconds } from 'date-fns';
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react';
import {
  ActionTypes,
  addNewCycleAction,
  finishActiveCycleAction,
  interruptActiveCycleAction,
} from '../reducers/cycles/actions';
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer';

interface CreateCycleData {
  task: string;
  minutesAmmount: number;
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
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedCyclesState = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0'
      );
      if (storedCyclesState) return JSON.parse(storedCyclesState);
      return initialState;
    }
  );

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [ammountSecondsPassed, setAmmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }
    return 0;
  });

  useEffect(() => {
    const stateJson = JSON.stringify(cyclesState);
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJson);
  }, [cyclesState]);

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

    dispatch(addNewCycleAction(newCycle));
    setAmmountSecondsPassed(0);
  }

  function interruptActiveCycle() {
    dispatch(interruptActiveCycleAction());
  }

  function finishActiveCycle() {
    dispatch(finishActiveCycleAction());
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
