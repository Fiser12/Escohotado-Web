import classNames from 'classnames';
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
};

/**
 * Componente H2 tipado para aceptar cualquier prop de un <h2> nativo
 * y, además, tu prop `label` personalizada.
 */
export const H2: React.FC<Props> = ({ label, className, ...props }) => {
  const headerClass = classNames(
    'text-primary-900 text-3xl md:text-5xl font-regular font-display',
    className
  );

  return (
    <h2 className={headerClass} {...props}>
      {label}
    </h2>
  );
};
