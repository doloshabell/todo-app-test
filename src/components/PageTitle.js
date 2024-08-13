import React from 'react';

function PageTitle({ children, ...rest }) {
  return (
    <p className="text-6xl font-extrabold text-slate-600" {...rest}>
      {children}
    </p>
  );
}

export default PageTitle;
