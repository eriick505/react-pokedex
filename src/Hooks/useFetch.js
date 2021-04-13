import React from 'react';

function useFetch() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const request = React.useCallback(async url => {
    let response;
    let json;

    try {
      setError(null);
      setLoading(true);
      response = await fetch(url);
      json = await response.json();
      if (!response.ok)
        throw new Error('Não foi possível pegar os dados da requisição');
    } catch (err) {
      setError(err.message);
      json = null;
    } finally {
      setLoading(false);
      setData(json);
      return {
        response,
        json,
      };
    }
  }, []);

  return {
    data,
    loading,
    error,
    request,
  };
}

export default useFetch;
