import PropTypes from 'prop-types';
import { TablePagination, IconButton, CircularProgress } from '@mui/material';
import { Icon } from '@iconify/react';
import { usePage } from '@/context/PageContext';

const AccountTable = ({
  accountList,
  total = 0,
  handleEdit,
  handleViewDetail,
  handleDelete,
}) => {
  const { page, perPage, setPage, setPerPage } = usePage();
  const rowHeight = 40;
  const rowStyles = `h-[${rowHeight}px]` + ' border-b-2 hover:bg-gray-200';
  const rowPadding = 'px-4';
  const blankRow = (diff) => {
    const h = rowHeight * diff;
    const value = h + 'px';
    return <tr style={{ height: value }}></tr>;
  };
  return (
    <div className='w-full mx-auto my-0 shadow-lg rounded-md overflow-hidden'>
      <table className='w-full h-full'>
        <thead>
          <tr className='h-[40px] text-white bg-purple-800 font-bold'>
            <td className={rowPadding} align='left'>
              ID
            </td>
            <td align='left'>Email</td>
            <td align='left'>Username</td>
            <td align='left'>Fullname</td>
            <td align='left'>Department</td>
            <td align='left'>Position</td>
            <td align='left'>Created At</td>
            <td align='center'>Actions</td>
          </tr>
        </thead>
        <tbody className='w-full h-full relative'>
          {accountList ? (
            <>
              {accountList.map((account) => (
                <tr className={rowStyles} key={account.id}>
                  <td className={rowPadding}>{account.id}</td>
                  <td>{account.email}</td>
                  <td>{account.username}</td>
                  <td>{account.fullname}</td>
                  <td>{account.department}</td>
                  <td>{account.position}</td>
                  <td>{account.createAt.slice(0, 10)}</td>
                  <td align='center'>
                    <IconButton
                      size='small'
                      onClick={() => handleViewDetail(account.id)}
                    >
                      <Icon
                        className='text-cyan-500'
                        icon='akar-icons:eye'
                        size='small'
                      />
                    </IconButton>
                    <IconButton
                      size='small'
                      onClick={() => handleEdit(account)}
                    >
                      <Icon
                        className='text-green-400'
                        icon='lucide:edit'
                        size='small'
                      />
                    </IconButton>
                    <IconButton
                      size='small'
                      onClick={() => handleDelete(account.id)}
                    >
                      <Icon
                        className='text-red-500'
                        icon='ic:baseline-delete'
                        size='small'
                      />
                    </IconButton>
                  </td>
                </tr>
              ))}
              {accountList.length < perPage &&
                blankRow(perPage - accountList.length)}
            </>
          ) : (
            <>
              {blankRow(perPage)}
              <tr className='absolute w-full h-full flex justify-center items-center top-0 left-0'>
                <CircularProgress thickness={5} />
              </tr>
            </>
          )}
        </tbody>
        <tfoot>
          <tr>
            <TablePagination
              sx={{
                border: 'none',
                width: '100px',
              }}
              rowsPerPage={perPage}
              rowsPerPageOptions={[5, 10, 20]}
              page={page}
              count={total}
              onPageChange={(e, newPage) => setPage(newPage)}
              onRowsPerPageChange={(e) => setPerPage(e.target.value)}
            ></TablePagination>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

AccountTable.propTypes = {
  accountList: PropTypes.array,
  onPageChange: PropTypes.func,
  total: PropTypes.number,
  handleEdit: PropTypes.func.isRequired,
  handleViewDetail: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default AccountTable;
