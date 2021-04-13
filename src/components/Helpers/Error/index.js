import React from 'react';

function Error({ error }) {
  if (!error) return <p>Erro Não específicado</p>;
  return <p style={{ color: '#f31', margin: '1rem 0' }}>{error}</p>;
}

export default Error;
