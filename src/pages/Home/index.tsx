import { useContext } from 'react';
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
import { CyclesContext } from '../../contexts/CyclesContext';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmmount: zod
    .number()
    .min(5, 'O ciclo deve ser mínimo 5 minutos')
    .max(60, 'O ciclo deve ser no máximo 60 minutos'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { activeCycle, createNewCycle, interruptActiveCycle } =
    useContext(CyclesContext);
  const newCycleForm = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmmount: 0,
    },
  });
  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);
    reset();
  }

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action=''>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type='button' onClick={interruptActiveCycle}>
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
