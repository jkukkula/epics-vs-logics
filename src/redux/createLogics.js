import { createLogic } from "redux-logic";

export function createLogics(
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
      : `trigger-logic-${n}`;

    const successType = successTypeProvider
      ? successTypeProvider(n)
      : `success-logic-${n}`;
    let proc = n === 0 ? process : () => {};
    return createLogic({
      process: proc,
      name: `logic-${n}`,
      type: triggerType,
      processOptions: {
        successType
      }
    });
  });
}
