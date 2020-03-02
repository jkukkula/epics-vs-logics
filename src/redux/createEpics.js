import { ofType } from "redux-observable";
import { map } from "rxjs/operators";

export function createEpics(
  n,
  process,
  triggerTypeProvider,
  successTypeProvider
) {
  return [...Array(n).keys()].map(n => {
    const triggerType = triggerTypeProvider
      ? triggerTypeProvider(n)
      : `trigger-epic-${n}`;

    const successType = successTypeProvider
      ? successTypeProvider(n)
      : `success-epic-${n}`;

    return action$ =>
      action$.pipe(
        ofType(triggerType),
        map(process),
        map(payload => ({
          type: successType,
          payload
        }))
      );
  });
}
