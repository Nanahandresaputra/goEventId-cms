import React, { createContext, useCallback, useState } from "react";
import LayoutCanvas from "../../../components/atoms/layout-canvas";

import MainContentUsers from "../../../components/management/users/main-content";
import ExtraHeader from "../../../components/atoms/other/extra-header";
import { Form } from "antd";
import { useDispatch } from "react-redux";
import {
  createUsersAction,
  updateUsersAction,
} from "../../../store/features/management/users";

export const ContextUsers = createContext({});

const ManagementUsers = () => {
  const [selectedUsers, setSelectedUsers] = useState({});
  const [modalUsers, setModalUsers] = useState(false);
  const [formUsers] = Form.useForm();

  const dispatch = useDispatch();

  const openModalUsers = () => {
    setModalUsers(true);
  };

  const closeModalUsers = () => {
    formUsers.resetFields();
    setModalUsers(false);
  };

  const createUser = useCallback((body) => {
    dispatch(createUsersAction({ body })).then(() => {
      formUsers.resetFields();
      setModalUsers(false);
    });
  }, []);

  const updateUser = useCallback(
    (body) => {
      dispatch(updateUsersAction({ body, userId: selectedUsers?.id })).then(
        () => {
          formUsers.resetFields();
          setModalUsers(false);
        }
      );
    },
    [selectedUsers]
  );

  return (
    <ContextUsers.Provider
      value={{
        selectedUsers,
        setSelectedUsers,
        modalUsers,
        openModalUsers,
        closeModalUsers,
        createUser,
        updateUser,
        formUsers,
      }}
    >
      <LayoutCanvas
        extraMainActionHeader={() => (
          <ExtraHeader
            onChangeSearch={() => {}}
            onClickBtn={() => {
              setSelectedUsers({});
              openModalUsers();
            }}
          />
        )}
        childMain={() => (
          <section className="space-y-4 h-3/4 ">
            <MainContentUsers />
          </section>
        )}
      />
    </ContextUsers.Provider>
  );
};

export default ManagementUsers;
