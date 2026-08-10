import type { ReactNode } from 'react';
import './button-stack.css';

type ButtonStackProps = {
  children: ReactNode;
};

export default function ButtonStack({ children }: ButtonStackProps) {
  return <div className="button-stack">{children}</div>;
}
