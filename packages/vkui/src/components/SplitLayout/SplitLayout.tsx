import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import type { HasRef, HTMLAttributesWithRootRef } from '../../types';
import { PopoutRoot } from '../PopoutRoot/PopoutRoot';
import styles from './SplitLayout.module.css';

export interface SplitLayoutProps
  extends HTMLAttributesWithRootRef<HTMLDivElement>,
    HasRef<HTMLDivElement> {
  /**
   * Свойство для отрисовки `Alert`, `ActionSheet` и `ScreenSpinner`.
   */
  popout?: React.ReactNode;
  /**
   * Свойство для отрисовки `ModalRoot`.
   */
  modal?: React.ReactNode;
  header?: React.ReactNode;
  /**
   * Центрирует контент.
   */
  center?: boolean;
}

/**
 * @see https://vkcom.github.io/VKUI/#/SplitLayout
 */
export const SplitLayout = ({
  popout,
  modal,
  header,
  children,
  getRootRef,
  getRef,
  className,
  center,
  ...restProps
}: SplitLayoutProps): React.ReactNode => {
  const platform = usePlatform();

  return (
    <PopoutRoot
      className={classNames(
        styles['SplitLayout'],
        platform === 'ios' && styles['SplitLayout--ios'],
      )}
      popout={popout}
      modal={modal}
      getRootRef={getRootRef}
    >
      {header}
      <div
        {...restProps}
        ref={getRef}
        className={classNames(
          styles['SplitLayout__inner'],
          !!header && styles['SplitLayout__inner--header'],
          center && styles['SplitLayout__inner--center'],
          className,
        )}
      >
        {children}
      </div>
    </PopoutRoot>
  );
};
