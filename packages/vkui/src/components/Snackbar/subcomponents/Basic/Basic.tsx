import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../../hooks/useAdaptivity';
import type { HTMLAttributesWithRootRef } from '../../../../types';
import { RootComponent } from '../../../RootComponent/RootComponent';
import { Paragraph } from '../../../Typography/Paragraph/Paragraph';
import { Subhead } from '../../../Typography/Subhead/Subhead';
import styles from './Basic.module.css';

const stylesLayout = {
  none: styles['Snackbar--layout-none'],
  vertical: styles['Snackbar--layout-vertical'],
  horizontal: styles['Snackbar--layout-horizontal'],
};

const sizeYClassNames = {
  none: styles['Snackbar--sizeY-none'],
  regular: styles['Snackbar--sizeY-regular'],
};

export interface BasicProps {
  /**
   * Элемент действия.
   * Не может использоваться одновременно с `subtitle`
   */
  action?: React.ReactNode;

  /**
   * Контент в правой части, может быть иконкой 24x24
   */
  after?: React.ReactNode;

  /**
   * Варианты расположения кнопки действия
   * По умолчанию на десктопах, или при наличии элементов `after` или `subtitle`
   * имеет значение `vertical`, в остальных случаях `horizontal`
   */
  layout?: 'vertical' | 'horizontal';

  /**
   * Может быть следующими компонентами:
   *  - цветная иконка 24x24 или 28x28 пикселя
   *  - `<Avatar size={32} />`
   *  - `<Image size={40} />`
   */
  before?: React.ReactNode;

  /**
   * Задает стиль снекбара
   */
  mode?: 'default' | 'dark';

  /**
   * Дополнительная строка текста под `children`.
   * Не может использоваться одновременно с `action`
   */
  subtitle?: React.ReactNode;
}

export interface SnackbarBasicProps extends HTMLAttributesWithRootRef<HTMLDivElement>, BasicProps {}

export function Basic({
  layout: layoutProps,
  action,
  after,
  before,
  mode,
  subtitle,
  children,
  ...restProps
}: SnackbarBasicProps): React.ReactNode {
  const { sizeY = 'none' } = useAdaptivity();
  const layout = after || subtitle ? 'vertical' : 'none';

  return (
    <RootComponent
      {...restProps}
      baseClassName={classNames(
        styles['Snackbar__body'],
        stylesLayout[layoutProps || layout],
        sizeY !== 'compact' && sizeYClassNames[sizeY],
        mode === 'dark' && styles['Snackbar--mode-dark'],
      )}
    >
      {before && <div className={styles['Snackbar__before']}>{before}</div>}

      <div className={styles['Snackbar__content']}>
        <Paragraph className={styles['Snackbar__content-text']}>{children}</Paragraph>
        {subtitle && !action && (
          <Subhead className={styles['Snackbar__content-subtitle']}>{subtitle}</Subhead>
        )}

        {action && !subtitle && <div className={styles['Snackbar__action']}>{action}</div>}
      </div>

      {after && <div className={styles['Snackbar__after']}>{after}</div>}
    </RootComponent>
  );
}
