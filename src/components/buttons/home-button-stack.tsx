import { useEffect, useRef, useState } from 'react';
import './home-button-stack.css';
import ButtonStack from './button-stack';
import RlHomescreenBtn from './rl-homescreen-btn';
import homepageButtonData from '../data/homepage-button-data.json';

type HomeButtonData = {
  label: string;
  info: string;
  link: { text: string; href: string };
};

const buttons = homepageButtonData as HomeButtonData[];

const STEP_MS = 30;
const ITEM_DURATION_MS = 100;
const LIST_EXIT_MS = (buttons.length - 1) * STEP_MS + ITEM_DURATION_MS;

type Phase = 'list' | 'list-exit' | 'detail-enter' | 'detail' | 'detail-exit' | 'list-enter';

export default function HomeButtonStack() {
  const [phase, setPhase] = useState<Phase>('list');
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef<number | undefined>(undefined);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      window.clearTimeout(timeoutRef.current);
      if (frameRef.current !== undefined) cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  const settleNextFrame = (next: Phase) => {
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = requestAnimationFrame(() => setPhase(next));
    });
  };

  const handleSelect = (index: number) => {
    if (phase !== 'list') return;
    setPhase('list-exit');
    timeoutRef.current = window.setTimeout(() => {
      setActiveIndex(index);
      setPhase('detail-enter');
      settleNextFrame('detail');
    }, LIST_EXIT_MS);
  };

  const handleBack = () => {
    if (phase !== 'detail') return;
    setPhase('detail-exit');
    timeoutRef.current = window.setTimeout(() => {
      setPhase('list-enter');
      settleNextFrame('list');
    }, ITEM_DURATION_MS);
  };

  const active = buttons[activeIndex];
  const isExternal = /^https?:\/\//i.test(active.link.href);
  const showingList = phase === 'list' || phase === 'list-exit' || phase === 'list-enter';

  return (
    <ButtonStack>
      {showingList ? (
        buttons.map((item, index) => {
          const delay =
            phase === 'list-exit'
              ? index * STEP_MS
              : phase === 'list-enter'
                ? (buttons.length - 1 - index) * STEP_MS
                : 0;
          const stateClass =
            phase === 'list-exit'
              ? 'home-button-stack__item--exiting'
              : phase === 'list-enter'
                ? 'home-button-stack__item--entering'
                : '';

          return (
            <RlHomescreenBtn
              key={item.label}
              variant="default"
              align="left"
              opacity={0.9}
              className={`home-button-stack__item ${stateClass}`.trim()}
              style={{ transitionDelay: `${delay}ms` }}
              onClick={() => handleSelect(index)}
            >
              {item.label}
            </RlHomescreenBtn>
          );
        })
      ) : (
        <div
          className={`home-button-stack__detail ${
            phase === 'detail-enter'
              ? 'home-button-stack__detail--entering'
              : phase === 'detail-exit'
                ? 'home-button-stack__detail--exiting'
                : ''
          }`.trim()}
        >
          <div className="home-button-stack__header">
            <button type="button" className="home-button-stack__back" onClick={handleBack} aria-label="Back">
              <span className="home-button-stack__back-arrow" aria-hidden="true">
                ←
              </span>
            </button>
            <span className="home-button-stack__title">{active.label}</span>
          </div>
          <p className="home-button-stack__info">{active.info}</p>
          <a
            className="home-button-stack__link"
            href={active.link.href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
          >
            {active.link.text}
          </a>
        </div>
      )}
    </ButtonStack>
  );
}
