import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { CyclesContext } from '../../../../contexts/CyclesContext';
import { FormContainer, MinutesAmmountInput, TaskInput } from './styles';

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
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
  );
}
