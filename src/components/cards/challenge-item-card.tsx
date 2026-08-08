import './challenge-item-card.css';

type ChallengeItemCardProps = {
  text: string;
  current: number;
  total: number;
};

export default function ChallengeItemCard({ text, current, total }: ChallengeItemCardProps) {
  const percent = total > 0 ? Math.min(100, Math.max(0, (current / total) * 100)) : 0;

  return (
    <div className="challenge-item-card">
      <div className="challenge-item-card__text">{text}</div>
      <div className="challenge-item-card__progress">
        <div className="challenge-item-card__bar">
          <div className="challenge-item-card__bar-fill" style={{ width: `${percent}%` }} />
        </div>
        <span className="challenge-item-card__fraction">
          {current}/{total}
        </span>
      </div>
    </div>
  );
}
