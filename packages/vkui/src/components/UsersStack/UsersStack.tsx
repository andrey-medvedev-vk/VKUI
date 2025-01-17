import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import type { HTMLAttributesWithRootRef } from '../../types';
import { RootComponent } from '../RootComponent/RootComponent';
import { Caption } from '../Typography/Caption/Caption';
import { Footnote } from '../Typography/Footnote/Footnote';
import styles from './UsersStack.module.css';

const stylesSize = {
  s: styles['UsersStack--size-s'],
  m: styles['UsersStack--size-m'],
  l: styles['UsersStack--size-l'],
};

const stylesDirection = {
  'row': styles['UsersStack--direction-row'],
  'row-reverse': styles['UsersStack--direction-row-reverse'],
  'column': styles['UsersStack--direction-column'],
};

export type UsersStackRenderWrapperProps = {
  children: React.ReactElement;
  ['data-src']: string;
};

export type UsersStackPhoto = {
  src: string;
  renderWrapper?: (props: UsersStackRenderWrapperProps) => React.ReactElement;
};

export interface UsersStackProps extends HTMLAttributesWithRootRef<HTMLDivElement> {
  /**
   * Массив ссылок на фотографии либо массив структур типа `UsersStackPhoto`:
   */
  photos?: string[] | UsersStackPhoto[];
  /**
   * Размер аватарок
   */
  size?: 's' | 'm' | 'l';
  /**
   * Количество аватарок, которые будут показаны.
   * Если в массиве `photos` больше элементов и используется размер `m`, то будет показано количество остальных элементов
   */
  visibleCount?: number;
  /**
   * Число, которое будет указано в счетчике.
   * По умолчанию высчитывается по формуле `photos.length - visibleCount`.
   * Если число больше 99, то счетчик скроется.
   */
  count?: number;
  /**
   * Определяет положение элементов
   * Режим `column` рекомендуется использовать с размером `m`
   * @since 5.3.0
   */
  direction?: 'row' | 'row-reverse' | 'column';
}

interface PathElementProps extends React.SVGAttributes<SVGElement> {
  photoSize: number;
  direction: 'circle' | 'right' | 'left';
}

type PhotoSizeType = 16 | 24 | 32;

function PathElement({ photoSize, direction, ...props }: PathElementProps) {
  switch (direction) {
    case 'circle':
      const radius = photoSize / 2;

      return <circle cx={radius} cy={radius} r={radius} {...props} />;

    case 'right':
      switch (photoSize) {
        case 24:
          return (
            <path
              d="M22,18.625A12 12 0 0 1 12 24A12 12 0 0 1 12 0A12 12 0 0 1 22 5.375A12 12 0 0 0 22,18.625"
              {...props}
            />
          );

        default:
          return (
            <path
              d="M30,23.75A16 16 0 0 1 16 32A16 16 0 0 1 16 0A16 16 0 0 1 30 8.25A16 16 0 0 0 30,23.75"
              {...props}
            />
          );
      }

    default:
      switch (photoSize) {
        case 16:
          return (
            <path
              d="M2,13.285A8 8 0 0 0 8 16A8 8 0 0 0 8 0A8 8 0 0 0 2 2.715A8 8 0 0 1 2,13.285"
              {...props}
            />
          );
        case 24:
          return (
            <path
              d="M2,18.625A12 12 0 0 0 12 24A12 12 0 0 0 12 0A12 12 0 0 0 2 5.375A12 12 0 0 1 2,18.625"
              {...props}
            />
          );

        default:
          return (
            <path
              d="M2,23.75A16 16 0 0 0 16 32A16 16 0 0 0 16 0A16 16 0 0 0 2 8.25A16 16 0 0 1 2,23.75"
              {...props}
            />
          );
      }
  }
}

const photoSizes: Record<NonNullable<UsersStackProps['size']>, PhotoSizeType> = {
  s: 16,
  m: 24,
  l: 32,
};

/**
 * @see https://vkcom.github.io/VKUI/#/UsersStack
 */
export const UsersStack = ({
  photos = [],
  visibleCount = 3,
  count = Math.max(0, photos.length - visibleCount),
  size = 'm',
  children,
  direction = 'row',
  ...restProps
}: UsersStackProps): React.ReactNode => {
  const cmpId = React.useId();

  const canShowOthers = count > 0 && count < 100 && size !== 's';
  const CounterTypography = size === 'l' ? Footnote : Caption;

  const photoSize = photoSizes[size];
  const directionClip = canShowOthers ? 'right' : 'left';

  const photosElements = photos.slice(0, visibleCount).map((photo, i) => {
    const direction = i === 0 && !canShowOthers ? 'circle' : directionClip;

    const id = `UsersStackDefs${cmpId}${i}`;
    const hrefID = `#${id}`;
    const maskID = `UsersStackMask${cmpId}${i}`;

    const isPhotoType = typeof photo === 'object';
    const photoSrc = isPhotoType ? photo.src : photo;

    let photoElement = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles['UsersStack__photo']}
        aria-hidden
        display="block"
      >
        <defs>
          <PathElement id={id} direction={direction} photoSize={photoSize} />
        </defs>
        <clipPath id={maskID}>
          <use href={hrefID} />
        </clipPath>
        <g clipPath={`url(#${maskID})`}>
          <use href={hrefID} className={styles['UsersStack__fill']} />
          <image href={photoSrc} width={photoSize} height={photoSize} />
          <use href={hrefID} fill="none" stroke="rgba(0, 0, 0, 0.08)" />
        </g>
      </svg>
    );
    if (isPhotoType && photo.renderWrapper) {
      photoElement = photo.renderWrapper({
        'children': photoElement,
        'data-src': photoSrc,
      });
    }

    return (
      <div className={styles['UsersStack__photoWrapper']} key={i}>
        {photoElement}
      </div>
    );
  });

  const othersElement = canShowOthers ? (
    <div className={styles['UsersStack__photoWrapper']}>
      <CounterTypography
        caps
        weight="1"
        className={classNames(styles['UsersStack__photo'], styles['UsersStack__photo--others'])}
      >
        +{count}
      </CounterTypography>
    </div>
  ) : null;

  return (
    <RootComponent
      {...restProps}
      baseClassName={classNames(styles['UsersStack'], stylesSize[size], stylesDirection[direction])}
    >
      {(photosElements.length > 0 || othersElement) && (
        <div className={styles['UsersStack__photos']} aria-hidden>
          {photosElements}
          {othersElement}
        </div>
      )}
      {hasReactNode(children) && (
        <Footnote className={styles['UsersStack__text']}>{children}</Footnote>
      )}
    </RootComponent>
  );
};
