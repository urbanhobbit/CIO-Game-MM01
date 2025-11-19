import config from "../data/config.json";

export const initialSettings = config.initial_settings;
export const balance = config.game_balance;

export const cloneMetrics = () => ({ ...initialSettings.metrics });

export const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const clamp = (v, min = 0, max = 100) => Math.max(min, Math.min(max, v));