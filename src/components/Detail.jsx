import PropTypes from 'prop-types';
import CloseButton from './UI/CloseButton';
import { CircularProgress } from '@mui/material';

const Detail = ({ account, onClose }) => {
  return (
    <div className='w-[35%] min-w-[400px] bg-white z-10 rounded-md p-10 relative'>
      <CloseButton onClose={onClose} />
      <p className='text-center mb-2.5 font-bold text-3xl'>Detail Account</p>
      {account ? (
        <div className='flex flex-col gap-y-2.5 text-xl'>
          <div className='flex'>
            <p className='font-bold mr-1.5'>ID:</p>
            <p>{account.id}</p>
          </div>
          <div className='flex'>
            <p className='font-bold mr-1.5'>Username:</p>
            <p>{account.username}</p>
          </div>
          <div className='flex'>
            <p className='font-bold mr-1.5'>Fullname:</p>
            <p>{account.fullname}</p>
          </div>
          <div className='flex'>
            <p className='font-bold mr-1.5'>Email:</p>
            <p>{account.email}</p>
          </div>
          <div className='flex'>
            <p className='font-bold mr-1.5'>Department:</p>
            <p>{account.department}</p>
          </div>
          <div className='flex'>
            <p className='font-bold mr-1.5'>Position:</p>
            <p>{account.position}</p>
          </div>
          <div className='flex'>
            <p className='font-bold mr-1.5'>Create At:</p>
            <p>{account.createAt}</p>
          </div>
        </div>
      ) : (
        <div className='w-full min-h-[200px] flex justify-center items-center'>
          <CircularProgress thickness={5} />
        </div>
      )}
    </div>
  );
};

Detail.propTypes = {
  account: PropTypes.object,
  onClose: PropTypes.func,
};

export default Detail;
