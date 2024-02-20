import { useContext } from 'react';

import { Badge, IconButton, Tooltip } from '../ui';

import { CartIcon } from '../icons';

import { CartContext } from '../contexts';

export function GlobalCart() {
  const { cart } = useContext(CartContext);

  return (
    <Badge badgeContent={cart.length} color="warning">
      <Tooltip title="Add to cart">
        <IconButton sx={{ color: 'white' }}>
          <CartIcon />
        </IconButton>
      </Tooltip>
    </Badge>
  );
}
