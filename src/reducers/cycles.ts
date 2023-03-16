export interface Cycle {
  id: string;
  task: string;
  minutesAmmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_ACTIVE_CYCLE = 'INTERRUPT_ACTIVE_CYCLE',
  FINISH_ACTIVE_CYCLE = 'FINISH_ACTIVE_CYCLE',
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      };
    case ActionTypes.INTERRUPT_ACTIVE_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          return cycle.id === state.activeCycleId
            ? { ...cycle, interruptedDate: new Date() }
            : cycle;
        }),
        activeCycleId: null,
      };
    case ActionTypes.FINISH_ACTIVE_CYCLE:
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
}
