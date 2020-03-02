import { createLogic } from "redux-logic";

export function createLogics(
  n,
  process,
  triggerTypeProvider,
  successTypeProvider
) {
  return [...Array(n).keys()].map(n => {
    const triggerType = triggerTypeProvider
      ? triggerTypeProvider(n)
      : `trigger-logic-${n}`;

    const successType = successTypeProvider
      ? successTypeProvider(n)
      : `success-logic-${n}`;

    return createLogic({
      process,
      name: `logic-${n}`,
      type: triggerType,
      processOptions: {
        successType
      }
    });
  });
}
