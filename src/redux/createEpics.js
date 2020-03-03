import { ofType } from "redux-observable";
import { map } from "rxjs/operators";

export function createEpics(
  n,
  process,
  reverse,
  triggerTypeProvider,
  successTypeProvider
) {
    let ids = [...Array(n).keys()];
    if (reverse) {
        ids = ids.reverse();
    }
    return ids.map(n => {
    const triggerType = triggerTypeProvider
      ? triggerTypeProvider(n)
      : `trigger-epic-${n}`;

    const successType = successTypeProvider
      ? successTypeProvider(n)
      : `success-epic-${n}`;

    return action$ =>
      action$.pipe(
        ofType(triggerType),
        map(n==0 ? process : ()=>{}),
        map(payload => ({
          type: successType,
          payload
        }))
      );
  });
}
