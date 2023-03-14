import { Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmmountInput,
  Separator,
  StartCoundownButton,
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

export function Home() {
  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmmount: 0,
    },
  });

  function handleCreateNewCycle(data: NewCycleFormProps) {
    console.log(data);
  }

  const task = watch('task');
  const isSubmitDisabled = !task;

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
            {...register('minutesAmmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCoundownButton disabled={isSubmitDisabled} type='submit'>
          <Play size={24} />
          Começar
        </StartCoundownButton>
      </form>
    </HomeContainer>
  );
}
