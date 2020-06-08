import { useState, useCallback } from 'react'

// 강제 렌더링 하기 위한 함수 (forceUpdate)
export function useForceUpdate() {
  const [, setTick] = useState(0);
  const update = useCallback(() => {
    setTick(tick => tick + 1);
  }, [])
  return update;
}