import PropTypes from 'prop-types';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  LinearProgress,
} from '@mui/material';
import { useState, useEffect } from 'react';
import CloseButton from './UI/CloseButton';

const Form = ({ editedAccount, updateAccount, createAccount, onClose }) => {
  const [account, setAccount] = useState({
    email: '',
    username: '',
    fullname: '',
    department: '',
    position: '',
  });
  const [submit, setSubmit] = useState(false);
  useEffect(() => {
    if (editedAccount) setAccount(editedAccount);
  }, [editedAccount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    if (editedAccount) {
      await updateAccount(account);
    } else {
      await createAccount(account);
    }
    setSubmit(false);
    onClose();
  };

  const handleEmail = (e) => {
    setAccount({ ...account, email: e.target.value });
  };

  const handleUserName = (e) => {
    setAccount({ ...account, username: e.target.value });
  };

  const handleFullName = (e) => {
    setAccount({ ...account, fullname: e.target.value });
  };

  const handleDepartment = (e) => {
    setAccount({ ...account, department: e.target.value });
  };

  const handlePosition = (e) => {
    setAccount({ ...account, position: e.target.value });
  };

  return (
    <div className='w-[35%] min-w-[400px] bg-white z-10 rounded-md p-10 relative'>
      {submit && (
        <div className='absolute w-full top-0 left-0'>
          <LinearProgress />
        </div>
      )}
      <CloseButton onClose={onClose} disabled={submit} />
      <p className='text-center mb-2.5 font-bold text-3xl'>
        {editedAccount ? 'Edit Account' : 'Create New Account'}
      </p>
      <form className='flex gap-y-8 flex-col' onSubmit={handleSubmit}>
        <TextField
          sx={{ flexGrow: 1 }}
          variant='standard'
          label='Username'
          value={account.username}
          onChange={handleUserName}
          required
        ></TextField>
        <TextField
          sx={{ flexGrow: 1 }}
          variant='standard'
          label='Fullname'
          value={account.fullname}
          onChange={handleFullName}
          required
        ></TextField>
        <TextField
          sx={{ flexGrow: 1 }}
          variant='standard'
          label='Email'
          value={account.email}
          onChange={handleEmail}
          required
        ></TextField>
        <div className='flex gap-x-10'>
          <FormControl
            variant='standard'
            required
            sx={{ flexGrow: 1, flexBasis: 0 }}
          >
            <InputLabel>Department</InputLabel>
            <Select value={account.department} onChange={handleDepartment}>
              <MenuItem value='Sales'>Sales</MenuItem>
              <MenuItem value='Marketing'>Marketing</MenuItem>
              <MenuItem value='Software'>Software</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant='standard'
            required
            sx={{ flexGrow: 1, flexBasis: 0 }}
          >
            <InputLabel>Position</InputLabel>
            <Select value={account.position} onChange={handlePosition}>
              <MenuItem value='Dev'>Dev</MenuItem>
              <MenuItem value='Sale'>Sale</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button variant='contained' type='submit' disabled={submit}>
          Save
        </Button>
      </form>
    </div>
  );
};

Form.propTypes = {
  onClose: PropTypes.func,
  editedAccount: PropTypes.object,
  updateAccount: PropTypes.func.isRequired,
  createAccount: PropTypes.func.isRequired,
};

export default Form;
