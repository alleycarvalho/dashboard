import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layout,
  PageHeader,
  Input,
  Table,
  Button,
  Popconfirm,
  Tooltip,
} from 'antd';
import { DeleteOutlined, FormOutlined, PlusOutlined } from '@ant-design/icons';

import './styles.css';

import { useDispatch, useSelector } from 'react-redux';

import { usersThunks } from '~/store/thunks/users';

import history from '~/services/history';

const { Search } = Input;

const UsersList = () => {
  const users = useSelector((state) => state.users.users);
  const tableFooter = useSelector((state) => state.users.usersData);
  const loading = useSelector((state) => state.utilities.loading);
  const [tablePagination, setTablePagination] = useState({});
  const [page, setPage] = useState(1);
  const [term, setTerm] = useState('');

  const dispatch = useDispatch();

  const handleSearchUsers = (value) => {
    setTerm(value);
  };

  const handleDelete = (id) => {
    dispatch(usersThunks.deleteUser(id));
  };

  const tableColumns = [
    {
      title: 'Nome',
      dataIndex: 'first_name',
      key: 'first_name',
      width: 120,
      fixed: 'left',
    },
    {
      title: 'Sobrenome',
      dataIndex: 'last_name',
      key: 'last_name',
      width: 120,
    },
    {
      title: 'Sexo',
      dataIndex: 'gender',
      key: 'gender',
      width: 80,
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Telefone',
      dataIndex: 'phone',
      key: 'phone',
      width: 180,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 85,
    },
    {
      title: 'Ações',
      key: 'actions',
      width: 75,
      fixed: 'right',
      render: (record) => (
        <span className="table-actions">
          <Link
            to={`/dashboard/users/${record.id}/update`}
            className="btn-action ant-btn-primary"
          >
            <FormOutlined />
          </Link>

          <Popconfirm
            title={`ID ${record.id}: deseja excluir？`}
            okText="Sim"
            cancelText="Não"
            onConfirm={() => handleDelete(record.id)}
          >
            <Tooltip title={`${record.id}`} placement="left">
              <Button type="danger" size="small" icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const handleTableChange = (pagination) => {
    const pager = { pagination };
    pager.current = pagination.current;

    setTablePagination(pager);
    setPage(pagination.current);
  };

  const handleTableFooter = () => {
    let info = '';

    if (tableFooter.totalCount) {
      const { currentPage, perPage, totalCount } = tableFooter;
      const base = currentPage * perPage;
      const ini = base - perPage + 1;
      const end = base < totalCount ? base : totalCount;

      info = `Mostrando [${ini} - ${end}] de ${totalCount} registros.`;
    }

    return info;
  };

  useEffect(() => {
    dispatch(usersThunks.getUsers(page, term));

    setTablePagination({
      pageSize: 20,
      total: tableFooter.totalCount,
      showSizeChanger: false,
      showQuickJumper: true,
      // showTotal: (total) => `Total de ${total} registros`,
    });
  }, [dispatch, page, tableFooter.totalCount, term]);

  return (
    <Layout>
      <PageHeader
        className="page-header"
        title="Usuários"
        subTitle="Lista"
        onBack={() => history.push('/dashboard')}
      />

      <Layout className="page-content">
        <div className="page-options">
          <Search
            placeholder="Busca por nome"
            style={{ width: 200 }}
            onSearch={(value) => handleSearchUsers(value)}
          />

          <Button
            type="primary"
            className="page-btn"
            icon={<PlusOutlined />}
            onClick={() => history.push('/dashboard/users/create')}
          >
            Adicionar novo usuário
          </Button>
        </div>

        <Table
          bordered
          size="small"
          columns={tableColumns}
          rowKey={(record) => record.id}
          dataSource={users}
          pagination={tablePagination}
          loading={loading}
          footer={handleTableFooter}
          scroll={{ x: 950 }}
          onChange={handleTableChange}
        />
      </Layout>
    </Layout>
  );
};

export default UsersList;
