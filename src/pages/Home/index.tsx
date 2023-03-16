import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';
import { differenceInSeconds } from 'date-fns';

import { HandPalm, Play } from 'phosphor-react';
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmmountInput,
  Separator,
  StartCoundownButton,
  StopCountdownButton,
  TaskInput,
} from './styles';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmmount: zod
    .number()
    .min(5, 'O ciclo deve ser mínimo 5 minutos')
    .max(60, 'O ciclo deve ser no máximo 60 minutos'),
});

type NewCycleFormProps = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [ammountSecondsPassed, setAmmountSecondsPassed] = useState<number>(0);

  const { register, handleSubmit, watch, reset } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmmount: 0,
    },
  });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - ammountSecondsPassed : 0;

  const minutesAmmount = Math.floor(currentSeconds / 60);
  const secondsAmmount = currentSeconds % 60;

  const minutes = String(minutesAmmount).padStart(2, '0');
  const seconds = String(secondsAmmount).padStart(2, '0');

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference >= totalSeconds) {
          setCycles((cycles) =>
            cycles.map((cycle) => {
              return cycle.id === activeCycleId
                ? { ...cycle, finishedDate: new Date() }
                : cycle;
            })
          );
          setAmmountSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setAmmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, activeCycleId]);

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

  function handleInterruptCycle() {
    setCycles((cycles) =>
      cycles.map((cycle) => {
        return cycle.id === activeCycleId
          ? { ...cycle, interruptedDate: new Date() }
          : cycle;
      })
    );

    setActiveCycleId(null);
  }

  useEffect(() => {
    if (activeCycle) document.title = `${minutes}:${seconds}`;
  }, [minutes, seconds, activeCycle]);

  const task = watch('task');
  const isSubmitDisabled = !task;

  console.log(cycles);

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action=''>
        <FormContainer>
          <label htmlFor='task'>Vou trabalhar em: </label>
          <TaskInput
            id='task'
            type='text'
            placeholder='Dê um nome ao seu projeto'
            list='task-suggestions'
            disabled={!!activeCycle}
            {...register('task')}
          />
          <datalist id='task-suggestions'>
            <option value='Projeto 01' />
            <option value='Projeto 02' />
            <option value='Projeto 03' />
            <option value='Projeto 04' />
          </datalist>
          <label htmlFor='minutesAmmount'>Durante</label>
          <MinutesAmmountInput
            type='number'
            id='minutesAmmount'
            placeholder='00'
            step={5}
            max={60}
            min={5}
            disabled={!!activeCycle}
            {...register('minutesAmmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {activeCycle ? (
          <StopCountdownButton type='button' onClick={handleInterruptCycle}>
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
