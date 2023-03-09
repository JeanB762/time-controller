import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger';

interface ButtonProps {
  variant: ButtonVariant;
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'cyan',
  success: 'green',
  danger: 'red',
};

export const ButtonContainer = styled.button<ButtonProps>`
  height: 40px;
  width: 120px;
  background-color: ${(props) => props.theme['green-500']};
  /* ${(props) => {
    return css`
      background-color: ${buttonVariants[props.variant]};
    `;
  }} */
`;
