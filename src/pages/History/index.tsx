import { HistoryContainer, HistoryList } from './styles';

export function History() {
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tarefa 01</td>
              <td>20 minutos</td>
              <td>Há 1 semana</td>
              <td>Concluída</td>
            </tr>
            <tr>
              <td>Tarefa 01</td>
              <td>20 minutos</td>
              <td>Há 1 semana</td>
              <td>Concluída</td>
            </tr>
            <tr>
              <td>Tarefa 01</td>
              <td>20 minutos</td>
              <td>Há 1 semana</td>
              <td>Concluída</td>
            </tr>
            <tr>
              <td>Tarefa 01</td>
              <td>20 minutos</td>
              <td>Há 1 semana</td>
              <td>Concluída</td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
