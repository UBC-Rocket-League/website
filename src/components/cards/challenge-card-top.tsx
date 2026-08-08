import './challenge-card-top.css';

type ChallengeCardTopProps = {
  image?: string | null;
  progress: number;
  stepCount: number;
  activeIndex: number;
  playing: boolean;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function ChallengeCardTop({
  image,
  progress,
  stepCount,
  activeIndex,
  playing,
  onTogglePlay,
  onPrev,
  onNext,
}: ChallengeCardTopProps) {
  return (
    <div className="challenge-card-top">
      {image ? (
        <img className="challenge-card-top__image" src={image} alt="" />
      ) : (
        <div className="challenge-card-top__placeholder" />
      )}

      <div className="challenge-card-top__progress-track">
        <div className="challenge-card-top__progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <button
        type="button"
        className="challenge-card-top__play-pause"
        onClick={onTogglePlay}
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {playing ? '❚❚' : '►'}
      </button>

      <div className="challenge-card-top__nav">
        <button
          type="button"
          className="challenge-card-top__arrow"
          onClick={onPrev}
          aria-label="Previous"
        >
          &lt;
        </button>

        <div className="challenge-card-top__pills">
          {Array.from({ length: stepCount }).map((_, i) => (
            <span
              key={i}
              className="challenge-card-top__pill"
              data-active={i === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>

        <button
          type="button"
          className="challenge-card-top__arrow"
          onClick={onNext}
          aria-label="Next"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
