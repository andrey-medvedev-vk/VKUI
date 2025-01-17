import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { useExternRef } from '../../hooks/useExternRef';
import { usePlatform } from '../../hooks/usePlatform';
import { getNavId, type NavIdProps } from '../../lib/getNavId';
import { warnOnce } from '../../lib/warnOnce';
import { ModalCardBase, type ModalCardBaseProps } from '../ModalCardBase/ModalCardBase';
import { ModalRootContext, useModalRegistry } from '../ModalRoot/ModalRootContext';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './ModalCard.module.css';

const platformClassNames = {
  ios: styles['ModalCard--ios'],
  android: styles['ModalCard--android'],
  vkcom: styles['ModalCard--vkcom'],
};

export interface ModalCardProps extends NavIdProps, ModalCardBaseProps {}

const warn = warnOnce('ModalCard');

/**
 * @see https://vkcom.github.io/VKUI/#/ModalCard
 */
export const ModalCard = ({
  icon,
  header,
  headerComponent,
  subheader,
  subheaderComponent,
  children,
  actions,
  onClose,
  nav,
  id,
  size,
  modalDismissButtonTestId,
  getRootRef,
  dismissButtonMode,
  dismissLabel,
  ...restProps
}: ModalCardProps): React.ReactNode => {
  const { isDesktop } = useAdaptivityWithJSMediaQueries();
  const platform = usePlatform();

  const modalContext = React.useContext(ModalRootContext);
  const { refs } = useModalRegistry(getNavId({ nav, id }, warn), 'card');
  const rootRef = useExternRef(getRootRef, refs.modalElement);

  const contextValue = React.useMemo(() => ({ labelId: `${id}-label` }), [id]);

  return (
    <RootComponent
      {...restProps}
      getRootRef={rootRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby={contextValue.labelId}
      id={id}
      baseClassName={classNames(
        styles['ModalCard'],
        platformClassNames.hasOwnProperty(platform)
          ? platformClassNames[platform]
          : platformClassNames.android,
        isDesktop && styles['ModalCard--desktop'],
      )}
    >
      <ModalCardBase
        className={styles['ModalCard__in']}
        getRootRef={refs.innerElement}
        icon={icon}
        header={header}
        headerComponent={headerComponent}
        subheader={subheader}
        subheaderComponent={subheaderComponent}
        actions={actions}
        onClose={onClose || modalContext.onClose}
        size={size}
        modalDismissButtonTestId={modalDismissButtonTestId}
        dismissButtonMode={dismissButtonMode}
        dismissLabel={dismissLabel}
      >
        {children}
      </ModalCardBase>
    </RootComponent>
  );
};
