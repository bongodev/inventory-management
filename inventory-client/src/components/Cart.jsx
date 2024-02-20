import { IconButton, Tooltip } from '../ui';

import { CartIcon } from '../icons';

export function GlobalCart() {
  return (
    <Tooltip title="Add to cart">
      <IconButton sx={{ color: 'white' }}>
        <CartIcon />
      </IconButton>
    </Tooltip>
  );
}
