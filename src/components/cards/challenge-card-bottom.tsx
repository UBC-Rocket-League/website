import './challenge-card-bottom.css';
import RlHomescreenBtn from '../buttons/rl-homescreen-btn';
import ChallengeItemCard from './challenge-item-card';

type ChallengeCardBottomItem = {
  text: string;
  current: number;
  total: number;
};

type ChallengeCardBottomProps = {
  title: string;
  subtitle: string;
  items: ChallengeCardBottomItem[];
};

export default function ChallengeCardBottom({ title, subtitle, items }: ChallengeCardBottomProps) {
  return (
    <div className="challenge-card-bottom">
      <div className="challenge-card-bottom__header">
        <h2 className="challenge-card-bottom__title">{title}</h2>
        <p className="challenge-card-bottom__subtitle">{subtitle}</p>
      </div>
      {items.map((item) => (
        <ChallengeItemCard key={item.text} text={item.text} current={item.current} total={item.total} />
      ))}
      <div className="challenge-card-bottom__actions">
        <RlHomescreenBtn variant="challenge" fontSize="1.05rem" align="center">
          VIEW CHALLENGES
        </RlHomescreenBtn>
      </div>
    </div>
  );
}
