import { IconButton } from '@mui/material';
import { Icon } from '@iconify/react';

// eslint-disable-next-line react/prop-types
const CloseButton = ({ onClose, disabled }) => {
  return (
    <IconButton
      sx={{ position: 'absolute', top: 10, right: 10 }}
      onClick={onClose}
      disabled={disabled}
    >
      <Icon icon='mingcute:close-fill' />
    </IconButton>
  );
};

export default CloseButton;
