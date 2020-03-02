import {useDispatch} from 'react-redux';
import {useEffect} from 'react';

export function ActionDispatcher() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: 'trigger-logic-0'});
    dispatch({type: 'trigger-epic-0'});
  }, [dispatch]);

  return null;
}
