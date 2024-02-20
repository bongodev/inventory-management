import { Box as MUIBox } from '@mui/material';

export function Box({ children, ...props }) {
  return (
    <MUIBox display="flex" {...props}>
      {children}
    </MUIBox>
  );
}
