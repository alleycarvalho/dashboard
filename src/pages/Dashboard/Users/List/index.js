import React, { useEffect, useState } from 'react';
import { Layout, PageHeader, Table, Button, Popconfirm, Alert } from 'antd';
import { DeleteOutlined, FormOutlined, PlusOutlined } from '@ant-design/icons';

import './styles.css';

import { useDispatch, useSelector } from 'react-redux';

import { usersThunks } from '~/store/thunks/users';

import history from '~/services/history';

const UsersList = () => {
  const authorized = useSelector((state) => state.users.authorized);
  const users = useSelector((state) => state.users.list);
  const tableFooter = useSelector((state) => state.users.listData);
  const loading = useSelector((state) => state.users.loading);
  const [tablePagination, setTablePagination] = useState({});
  const [page, setPage] = useState(1);

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
      render: () => (
        <span className="table-actions">
          <Button
            type="primary"
            size="small"
            icon={<FormOutlined />}
            onClick={() => {}}
          />

          <Popconfirm
            title="Deseja excluir？"
            okText="Sim"
            cancelText="Não"
            onConfirm={() => {}}
          >
            <Button type="danger" size="small" icon={<DeleteOutlined />} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  const dispatch = useDispatch();

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
    dispatch(usersThunks.getAll(page));

    setTablePagination({
      pageSize: 20,
      total: tableFooter.totalCount,
      showSizeChanger: false,
      showQuickJumper: true,
      // showTotal: (total) => `Total de ${total} registros`,
    });
  }, [dispatch, page, tableFooter.totalCount]);

  return (
    <Layout>
      <PageHeader
        className="page-header"
        title="Usuários"
        subTitle="Lista"
        onBack={() => history.push('/dashboard')}
      />

      <Layout className="page-content">
        <Button
          type="primary"
          className="page-btn"
          icon={<PlusOutlined />}
          onClick={() => {}}
        >
          Adicionar novo usuário
        </Button>

        {authorized && (
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
        )}

        {!authorized && (
          <Alert
            type="warning"
            message="Forneça o token de acesso do GoRest Api!"
          />
        )}
      </Layout>
    </Layout>
  );
};

export default UsersList;
