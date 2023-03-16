import { createContext, useState } from 'react';
import { HandPalm, Play } from 'phosphor-react';
import { FormProvider, useForm } from 'react-hook-form';
import zod from 'zod';

import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';

import {
  HomeContainer,
  StartCoundownButton,
  StopCountdownButton,
} from './styles';
import { zodResolver } from '@hookform/resolvers/zod';

interface Cycle {
  id: string;
  task: string;
  minutesAmmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmmount: zod
    .number()
    .min(5, 'O ciclo deve ser mínimo 5 minutos')
    .max(60, 'O ciclo deve ser no máximo 60 minutos'),
});

interface CyclesContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  ammountSecondsPassed: number;
  handleFinishActiveCycle: () => void;
  updateSecondsPassed: (seconds: number) => void;
}
type NewCycleFormProps = zod.infer<typeof newCycleFormValidationSchema>;

export const CyclesContext = createContext({} as CyclesContextType);

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [ammountSecondsPassed, setAmmountSecondsPassed] = useState<number>(0);
  const newCycleForm = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmmount: 0,
    },
  });
  const { handleSubmit, watch, reset } = newCycleForm;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  const task = watch('task');
  const isSubmitDisabled = !task;

  function updateSecondsPassed(seconds: number) {
    setAmmountSecondsPassed(seconds);
  }

  function handleCreateNewCycle(data: NewCycleFormProps) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmmount: data.minutesAmmount,
      startDate: new Date(),
    };

    setCycles((currentCycles) => [...currentCycles, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmmountSecondsPassed(0);

    reset();
  }

  function handleInterruptActiveCycle() {
    setCycles((cycles) =>
      cycles.map((cycle) => {
        return cycle.id === activeCycleId
          ? { ...cycle, interruptedDate: new Date() }
          : cycle;
      })
    );

    setActiveCycleId(null);
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

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action=''>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            ammountSecondsPassed,
            handleFinishActiveCycle,
            updateSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton
            type='button'
            onClick={handleInterruptActiveCycle}
          >
            <HandPalm size={24} />
            Parar
          </StopCountdownButton>
        ) : (
          <StartCoundownButton disabled={isSubmitDisabled} type='submit'>
            <Play size={24} />
            Começar
          </StartCoundownButton>
        )}
      </form>
    </HomeContainer>
  );
}
