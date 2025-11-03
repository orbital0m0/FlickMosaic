import React, { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = React.PropsWithChildren<{
  icon?: ReactNode;
}> &
  ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ icon, children, ...props }) => {
  return (
    <button type="button" {...props}>
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
