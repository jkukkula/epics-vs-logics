import { useState, useEffect, useCallback } from "react";

export function useExperiments(configs) {
  const [configIndex, setConfigIndex] = useState(0);
  const [config, setConfig] = useState(configs[0]);
  const [summary, setSummary] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (configIndex === configs.length) {
      setIsFinished(true);
      return;
    }

    setConfig(configs[configIndex]);
  }, [configIndex]);

  const finishExperiment = useCallback(
    (config, results) => {
      setSummary([...summary, { config, results }]);
      setConfigIndex(configIndex + 1);
    },

    [config]
  );

  return [config, finishExperiment, configIndex, isFinished, summary];
}
