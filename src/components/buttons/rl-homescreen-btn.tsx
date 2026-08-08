import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import './rl-homescreen-btn.css';

export type RlHomescreenBtnVariant = 'default' | 'challenge' | 'orange';
export type RlHomescreenBtnAlign = 'left' | 'center' | 'right';

type CommonProps = {
  variant?: RlHomescreenBtnVariant;
  align?: RlHomescreenBtnAlign;
  subtext?: ReactNode;
  fontSize?: string;
  opacity?: number;
  children?: ReactNode;
  className?: string;
};

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type AsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type RlHomescreenBtnProps = AsButton | AsLink;

export default function RlHomescreenBtn({
  variant = 'default',
  align = 'right',
  subtext,
  fontSize,
  opacity,
  className,
  style,
  children,
  ...rest
}: RlHomescreenBtnProps) {
  const classes = ['rl-homescreen-btn', className].filter(Boolean).join(' ');
  const hasSubtext = Boolean(subtext);
  const mergedStyle: CSSProperties | undefined =
    fontSize !== undefined || opacity !== undefined
      ? {
          ...style,
          ...(fontSize !== undefined ? { ['--rl-btn-font-size' as string]: fontSize } : {}),
          ...(opacity !== undefined ? { ['--rl-btn-opacity' as string]: opacity } : {}),
        }
      : style;

  const content = (
    <>
      <span className="rl-homescreen-btn__label">{children}</span>
      {hasSubtext && <span className="rl-homescreen-btn__subtext">{subtext}</span>}
    </>
  );

  if ('href' in rest && rest.href) {
    return (
      <a
        className={classes}
        style={mergedStyle}
        data-variant={variant}
        data-align={align}
        data-subtext={hasSubtext ? 'true' : undefined}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      style={mergedStyle}
      data-variant={variant}
      data-align={align}
      data-subtext={hasSubtext ? 'true' : undefined}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
