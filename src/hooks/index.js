import { useRef, useEffect } from 'react';

export function usePrevious(state) {
  const prevStateRef = useRef(null);

  useEffect(() => prevStateRef.current = state);

  const prevState = prevStateRef.current;
  return prevState;
}
