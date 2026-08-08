import { useCallback, useEffect, useRef, useState } from 'react';
import './challenge-card.css';
import ChallengeCardTop from './challenge-card-top';
import ChallengeCardBottom from './challenge-card-bottom';
import challengeData from '../data/challenge-data.json';

const STEP_DURATION_MS = 5000;

export default function ChallengeCard() {
  const stepCount = challengeData.length;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const elapsedRef = useRef(0);
  const lastTickRef = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % stepCount) + stepCount) % stepCount);
      setProgress(0);
      elapsedRef.current = 0;
      lastTickRef.current = null;
    },
    [stepCount],
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (!playing) {
      lastTickRef.current = null;
      return;
    }

    let frame: number;

    const tick = (now: number) => {
      if (lastTickRef.current !== null) {
        elapsedRef.current += now - lastTickRef.current;
      }
      lastTickRef.current = now;

      if (elapsedRef.current >= STEP_DURATION_MS) {
        goNext();
        return;
      }

      setProgress((elapsedRef.current / STEP_DURATION_MS) * 100);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, index, goNext]);

  const current = challengeData[index];

  return (
    <div className="challenge-card">
      <ChallengeCardTop
        image={current.image}
        progress={progress}
        stepCount={stepCount}
        activeIndex={index}
        playing={playing}
        onTogglePlay={() => setPlaying((value) => !value)}
        onPrev={goPrev}
        onNext={goNext}
      />
      <ChallengeCardBottom title={current.title} subtitle={current.subtitle} items={current.items} />
    </div>
  );
}
