import { useEffect, useState } from 'react';
import AccountTable from '@/components/AccountTable';
import { usePage } from '@/context/PageContext';
import { Button } from '@mui/material';
import Form from '@/components/Form';
import Modal from '@/components/Modal';
import Detail from '@/components/Detail';
import { Icon } from '@iconify/react';

const Management = () => {
  const { page, perPage, setPage } = usePage();
  const [meta, setMeta] = useState({});
  const [accountList, setAccountList] = useState(null);
  const [formModal, setFormModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [editedAccount, setEditedAccount] = useState(null);
  const [detail, setDetail] = useState(null);

  const fetchAccounts = async (page, perPage) => {
    const query = perPage && `?perPage=${perPage}&page=${page + 1}`;
    await fetch(`http://localhost:8000/api/v1/accounts${query || ''}`)
      .then((res) => res.json())
      .then((res) => {
        setAccountList(res.data);
        if (query) {
          setMeta(res.meta);
        }
      })
      .catch((error) => console.log(error));
  };

  const getAccount = async (id) => {
    await fetch(`http://localhost:8000/api/v1/accounts/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setDetail(res.data);
      });
  };

  const createAccount = async (account) => {
    await fetch('http://localhost:8000/api/v1/accounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...account, createAt: new Date() }),
    });
    await fetchAccounts(page, perPage);
  };

  const updateAccount = async (account) => {
    await fetch(`http://localhost:8000/api/v1/accounts/${account.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...account }),
    });
    setEditedAccount(null);
    await fetchAccounts(page, perPage);
  };

  const deleteAccount = async (id) => {
    setAccountList(null);
    await fetch(`http://localhost:8000/api/v1/accounts/${id}`, {
      method: 'DELETE',
    });
    if (accountList.length - 1 <= 0 && page > 1) {
      setPage(page - 1);
    } else {
      await fetchAccounts(page, perPage);
    }
  };

  const handleEdit = (account) => {
    setEditedAccount(account);
    setFormModal(true);
  };

  const handleDelete = (id) => {
    deleteAccount(id);
  };

  const handleViewDetail = (id) => {
    getAccount(id);
    setDetailModal(true);
  };

  useEffect(() => {
    setAccountList(null);
    fetchAccounts(page, perPage);
  }, [page, perPage]);

  return (
    <div className='p-5 flex flex-col gap-y-2.5'>
      <div className='flex justify-between'>
        <h1 className='font-bold text-3xl'>Danh sách Account</h1>
        <Button
          variant='contained'
          onClick={() => {
            setEditedAccount(null);
            setFormModal(true);
          }}
          startIcon={<Icon icon='iconoir:plus-circle-solid' />}
        >
          Add New
        </Button>
      </div>
      <AccountTable
        accountList={accountList}
        total={meta.total}
        currentPage={page}
        handleEdit={handleEdit}
        handleViewDetail={handleViewDetail}
        handleDelete={handleDelete}
      />
      <Modal open={formModal}>
        <Form
          onClose={() => setFormModal(false)}
          editedAccount={editedAccount}
          createAccount={createAccount}
          updateAccount={updateAccount}
        />
      </Modal>
      <Modal open={detailModal}>
        <Detail
          account={detail}
          onClose={() => {
            setDetail(null);
            setDetailModal(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Management;
