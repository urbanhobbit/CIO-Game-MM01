// src/hooks/useGameLogic.js
import { useState, useMemo, useEffect } from "react";
import parentScenarios from "../data/scenarios_parent.json";
import childScenarios from "../data/scenarios_child.json";
import {
  cloneMetrics,
  initialSettings,
  balance,
  shuffle,
  clamp,
} from "../utils/gameUtils";

export default function useGameLogic() {
  const [mode, setMode] = useState("adult");
  const isKids = mode === "kids";

  const scenariosData = useMemo(
    () => (isKids ? childScenarios : parentScenarios),
    [isKids]
  );
  const allScenarioIds = useMemo(
    () => Object.keys(scenariosData),
    [scenariosData]
  );

  const [screen, setScreen] = useState("start");
  const [metrics, setMetrics] = useState(cloneMetrics);
  const [budget, setBudget] = useState(initialSettings.budget);
  const [hr, setHr] = useState(initialSettings.hr);
  const [crisisSequence, setCrisisSequence] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedScenarioId, setSelectedScenarioId] = useState(null);
  const [news, setNews] = useState(["Oyun başladı. Ülke durumu stabil."]);
  const [history, setHistory] = useState([cloneMetrics()]);
  const [decision, setDecision] = useState({});
  const [results, setResults] = useState(null);
  const [metricsBefore, setMetricsBefore] = useState(cloneMetrics);
  const [selectedIds, setSelectedIds] = useState(new Set(allScenarioIds));

  const currentScenario =
    selectedScenarioId != null ? scenariosData[selectedScenarioId] : null;
  const maxCrises = initialSettings.max_crises || 3;

  const addNews = (headline) => {
    setNews((prev) => [headline, ...prev].slice(0, 5));
  };

  const resetGame = () => {
    setScreen("start");
    setMetrics(cloneMetrics());
    setBudget(initialSettings.budget);
    setHr(initialSettings.hr);
    setCrisisSequence([]);
    setCurrentIndex(0);
    setSelectedScenarioId(null);
    setNews(["Oyun yeniden başlatıldı. Ülke durumu stabil."]);
    setHistory([cloneMetrics()]);
    setDecision({});
    setResults(null);
    setSelectedIds(new Set(allScenarioIds));
  };

  // Mod değişince sıfırla
  useEffect(() => {
    const freshIds = new Set(Object.keys(scenariosData));
    setSelectedIds(freshIds);
    resetGame();
    setNews([
      isKids
        ? "Oyun çocuk modu ile yeniden başlatıldı."
        : "Oyun yetişkin modu ile yeniden başlatıldı.",
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, scenariosData]);

  const startGame = (withTutorial = false) => {
    const ids =
      selectedIds.size > 0 ? Array.from(selectedIds) : [...allScenarioIds];
    const seq = shuffle(ids).slice(0, maxCrises);
    if (!seq.length) return;

    setCrisisSequence(seq);
    setCurrentIndex(0);
    setSelectedScenarioId(seq[0]);
    setHistory([cloneMetrics()]);
    setScreen(withTutorial ? "tutorial" : "story");
  };

  const calculateEffects = (action, scope, duration, safeguards) => {
    // Sabitler utils'e taşınmadıysa config'den veya hook içinden okuyabilirsin.
    // Burada "balance" objesi import edildiği için onu kullanıyoruz.
    const {
      THREAT_SEVERITY,
      RANDOM_FACTOR_RANGE,
      SCOPE_MULTIPLIERS,
      DURATION_MULTIPLIERS,
      SAFEGUARD_QUALITY_PER_ITEM,
      TRUST_BOOST_FOR_TRANSPARENCY,
      FATIGUE_PER_DURATION,
    } = balance;

    const randomFactor =
      Math.random() * (RANDOM_FACTOR_RANGE[1] - RANDOM_FACTOR_RANGE[0]) +
      RANDOM_FACTOR_RANGE[0];

    const scopeMultiplier = SCOPE_MULTIPLIERS[scope];
    const durationMultiplier = DURATION_MULTIPLIERS[duration];
    const safeguardQuality =
      (safeguards?.length || 0) * SAFEGUARD_QUALITY_PER_ITEM;

    let securityChange =
      (THREAT_SEVERITY * action.security_effect) / 100 -
      action.side_effect_risk * randomFactor * 20;

    let freedomCost =
      action.freedom_cost *
      scopeMultiplier *
      durationMultiplier *
      (1 - safeguardQuality * action.safeguard_reduction);

    let publicTrustChange =
      (safeguards?.includes("transparency") ? TRUST_BOOST_FOR_TRANSPARENCY : 0) -
      freedomCost * 0.5;

    let resilienceChange =
      action.speed === "slow"
        ? (action.security_effect * safeguardQuality) / 2
        : 5;

    let fatigueChange =
      DURATION_MULTIPLIERS[duration] * FATIGUE_PER_DURATION[scope];

    if (securityChange > 15)
      addNews(`📈 GÜVENLİK ARTTI: '${action.name}' sonrası tehdit seviyesi düştü.`);
    if (freedomCost > 15)
      addNews("📉 ÖZGÜRLÜK TARTIŞMASI: Yeni kısıtlamalar tepki çekti.");

    const counter_factual =
      action.id === "A"
        ? "B veya C ile benzer güvenliği daha düşük özgürlük maliyetiyle sağlayabilirdiniz."
        : "Bu seçim görece orantılı; kullandığınız güvenceler fark yarattı.";

    return {
      metrics: {
        security: clamp(metrics.security + securityChange),
        freedom: clamp(metrics.freedom - freedomCost),
        public_trust: clamp(metrics.public_trust + publicTrustChange),
        resilience: clamp(metrics.resilience + resilienceChange),
        fatigue: clamp(metrics.fatigue + fatigueChange),
      },
      budget: budget - action.cost,
      hr: hr - action.hr_cost,
      counter_factual,
    };
  };

  const calculateSkipTurnEffects = () => {
    addNews("🚨 KAYNAK YETERSİZ: Müdahale edilemedi.");
    return {
      metrics: {
        security: clamp(metrics.security - 25),
        freedom: metrics.freedom,
        public_trust: clamp(metrics.public_trust - 20),
        resilience: clamp(metrics.resilience - 10),
        fatigue: clamp(metrics.fatigue + 15),
      },
      budget,
      hr,
      counter_factual: "Kaynakları daha iyi yönetebilirdiniz.",
    };
  };

  const handleApplyDecision = (opts) => {
    const { action, scope, duration, safeguards } = opts;
    setMetricsBefore({ ...metrics });
    const res = calculateEffects(action, scope, duration, safeguards);
    
    const resultObj = {
      ...res,
      actionId: action.id,
      actionName: action.name,
      scope,
      duration,
      safeguards,
      skipped: false,
    };
    
    setResults(resultObj);
    setMetrics(res.metrics);
    setBudget(res.budget);
    setHr(res.hr);
    setDecision({ actionId: action.id, scope, duration, safeguards, skipped: false });
    setScreen("immediate");
  };

  const handleSkipTurn = () => {
    setMetricsBefore({ ...metrics });
    const res = calculateSkipTurnEffects();
    setResults(res);
    setMetrics(res.metrics);
    setBudget(res.budget);
    setHr(res.hr);
    setDecision({ skipped: true });
    setScreen("immediate");
  };

  const goNextCrisisOrEnd = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < crisisSequence.length) {
      const nextId = crisisSequence[nextIndex];
      setCurrentIndex(nextIndex);
      setSelectedScenarioId(nextId);
      setScreen("story");
      setHistory((h) => [...h, { ...metrics }]);
      setDecision({});
      setResults(null);
    } else {
      setScreen("end");
    }
  };

  return {
    state: {
      mode, isKids, screen, metrics, budget, hr, news, history,
      currentScenario, currentIndex, crisisSequence,
      results, metricsBefore, allScenarioIds, selectedIds, scenariosData
    },
    actions: {
      setMode, setScreen, setSelectedIds,
      resetGame, startGame, handleApplyDecision, handleSkipTurn, goNextCrisisOrEnd
    }
  };
}