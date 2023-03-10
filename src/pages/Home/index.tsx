import { Play } from 'phosphor-react';
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmmountInput,
  Separator,
  StartCoundownButton,
  TaskInput,
} from './styles';

export function Home() {
  return (
    <HomeContainer>
      <form action=''>
        <FormContainer>
          <label htmlFor='task'>Vou trabalhar em: </label>
          <TaskInput
            id='task'
            type='text'
            placeholder='Dê um nome ao seu projeto'
          />
          <label htmlFor='minutesAmmount'>Durante</label>
          <MinutesAmmountInput
            type='number'
            id='minutesAmmount'
            placeholder='00'
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

        <StartCoundownButton type='submit'>
          <Play size={24} />
          Começar
        </StartCoundownButton>
      </form>
    </HomeContainer>
  );
}
