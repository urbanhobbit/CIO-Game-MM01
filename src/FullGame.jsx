import React from "react";
import useGameLogic from "./hooks/useGameLogic";
import { styles } from "./styles/theme";

// Bileşen Importları
import HeaderSimple from "./components/common/HeaderSimple";
import HeaderWithStatus from "./components/common/HeaderWithStatus";
import MetricsPanel from "./components/panels/MetricsPanel";

// Ekranlar (Bunların hepsini ayrı dosyalara taşıdığını varsayıyorum)
import StartScreen from "./components/screens/StartScreen";
import TutorialScreen from "./components/screens/TutorialScreen";
import StoryScreen from "./components/screens/StoryScreen";
import AdvisorsScreen from "./components/screens/AdvisorsScreen";
import DecisionScreen from "./components/screens/DecisionScreen";
import ImmediateScreen from "./components/screens/ImmediateScreen";
import DelayedScreen from "./components/screens/DelayedScreen";
import ReportScreen from "./components/screens/ReportScreen";
import EndScreen from "./components/screens/EndScreen";

export default function FullGame() {
  const { state, actions } = useGameLogic();

  // START EKRANI
  if (state.screen === "start") {
    return (
      <div style={styles.wrapper}>
        <HeaderSimple isKids={state.isKids} onRestart={actions.resetGame} />
        <StartScreen
          allScenarioIds={state.allScenarioIds}
          selectedIds={state.selectedIds}
          setSelectedIds={actions.setSelectedIds}
          onStart={() => actions.startGame(false)}
          onStartTutorial={() => actions.startGame(true)}
          mode={state.mode}
          setMode={actions.setMode}
          isKids={state.isKids}
          scenariosData={state.scenariosData}
        />
      </div>
    );
  }

  // Hata durumu
  if (!state.currentScenario && state.screen !== "end") {
    return (
      <div style={styles.wrapper}>
        <p>Senaryo bulunamadı.</p>
        <button style={styles.primaryButton} onClick={actions.resetGame}>
          Yeniden Başlat
        </button>
      </div>
    );
  }

  // OYUN AKIŞI
  return (
    <div style={styles.wrapper}>
      {state.currentScenario && (
        <HeaderWithStatus
          scenario={state.currentScenario}
          index={state.currentIndex}
          total={state.crisisSequence.length}
          isKids={state.isKids}
          onRestart={actions.resetGame}
        />
      )}
      
      {/* OYUN BİTTİ HEADER DURUMU (Opsiyonel: End screen için özel header yoksa) */}
      {state.screen === "end" && (
         <HeaderSimple isKids={state.isKids} onRestart={actions.resetGame} />
      )}

      <div style={styles.mainRow}>
        <div style={styles.mainCard}>
          {state.screen === "tutorial" && (
            <TutorialScreen
              onNext={() => actions.setScreen("story")}
              isKids={state.isKids}
            />
          )}

          {state.screen === "story" && (
            <StoryScreen
              scenario={state.currentScenario}
              onNext={() => actions.setScreen("advisors")}
              isKids={state.isKids}
            />
          )}

          {state.screen === "advisors" && (
            <AdvisorsScreen
              scenario={state.currentScenario}
              news={state.news}
              onNext={() => actions.setScreen("decision")}
              isKids={state.isKids}
            />
          )}

          {state.screen === "decision" && (
            <DecisionScreen
              scenario={state.currentScenario}
              metrics={state.metrics}
              budget={state.budget}
              hr={state.hr}
              onSkip={actions.handleSkipTurn}
              onApply={actions.handleApplyDecision}
              isKids={state.isKids}
            />
          )}

          {state.screen === "immediate" && state.results && (
            <ImmediateScreen
              scenario={state.currentScenario}
              results={state.results}
              metricsBefore={state.metricsBefore}
              metricsAfter={state.metrics}
              onNext={() => actions.setScreen("delayed")}
              isKids={state.isKids}
            />
          )}

          {state.screen === "delayed" && state.results && (
            <DelayedScreen
              scenario={state.currentScenario}
              results={state.results}
              metrics={state.metrics}
              onNext={() => actions.setScreen("report")}
              isKids={state.isKids}
            />
          )}

          {state.screen === "report" && state.results && (
            <ReportScreen
              metricsBefore={state.history[state.currentIndex]}
              metricsAfter={state.metrics}
              results={state.results}
              onNext={actions.goNextCrisisOrEnd}
              isKids={state.isKids}
            />
          )}

          {state.screen === "end" && (
            <EndScreen
              metrics={state.metrics}
              budget={state.budget}
              hr={state.hr}
              history={state.history}
              onRestart={actions.resetGame}
              isKids={state.isKids}
            />
          )}
        </div>

        <div style={styles.sideCard}>
          <MetricsPanel
            metrics={state.metrics}
            budget={state.budget}
            hr={state.hr}
            isKids={state.isKids}
          />
        </div>
      </div>
    </div>
  );
}