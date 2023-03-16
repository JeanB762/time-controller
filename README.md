# Aplicação em React de um Timer ( Pomodoro ) com listagem de ciclos

## Este é um projeto de exemplo para uma aplicação React que implementa um temporizador Pomodoro e uma lista de ciclos passados. O projeto utiliza o Vite como bundler e npm como gerenciador de dependências.
-----------------------------------------------------------

## Pré-requisitos
  - Node.js instalado
  - npm instalado

## Instalação
  - Clone este repositório: git clone https://github.com/JeanB762/time-controller.git  
  - Navegue até o diretório raiz: cd time-controller    
  - Instale as dependências: npm install  
  - Inicie o servidor de desenvolvimento: npm run dev  
  - A aplicação será executada na porta indicada no terminal.  

## Funcionalidades  
### A aplicação implementa as seguintes funcionalidades:  
  - Seleção do nome da tarefa a ser realizada
  - Seleção do tempo de duração da tarefa
  - Início do ciclo Pomodoro
  - Interrupção do ciclo Pomodoro
  - Lista de ciclos passados


## Regras de validação de entrada
- A tarefa é obrigatória
- O tempo de duração deve ser de no mínimo 5 minutos e no máximo 60 minutos
- O tempo pode ser definido em intervalos de 5 minutos

## Ciclos passados
### A lista de ciclos passados é exibida em uma página separada e exibe os seguintes campos:

- Nome da tarefa
- Tempo total de duração do ciclo
- Status do ciclo (finalizado, interrompido ou em andamento)

## Armazenamento de dados
  - Os ciclos passados são armazenados no armazenamento local do navegador (local storage [A implementar]). Quando um ciclo é finalizado ou interrompido, ele é adicionado à lista de ciclos passados.