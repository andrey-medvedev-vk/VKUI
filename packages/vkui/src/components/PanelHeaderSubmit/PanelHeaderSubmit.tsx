import { Icon24DoneOutline, Icon28DoneOutline } from '@vkontakte/icons';
import { usePlatform } from '../../hooks/usePlatform';
import { AdaptiveIconRenderer } from '../AdaptiveIconRenderer/AdaptiveIconRenderer';
import {
  PanelHeaderButton,
  type PanelHeaderButtonProps,
} from '../PanelHeaderButton/PanelHeaderButton';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';

/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderButton
 */
export const PanelHeaderSubmit = ({
  children = 'Готово',
  ...restProps
}: PanelHeaderButtonProps): React.ReactNode => {
  const platform = usePlatform();

  return (
    <PanelHeaderButton primary {...restProps}>
      {platform === 'ios' ? (
        children
      ) : (
        <>
          <VisuallyHidden>{children}</VisuallyHidden>
          <AdaptiveIconRenderer IconCompact={Icon24DoneOutline} IconRegular={Icon28DoneOutline} />
        </>
      )}
    </PanelHeaderButton>
  );
};
