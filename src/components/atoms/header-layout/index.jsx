import React, { useCallback, useState } from "react";
import { Avatar, Button, Dropdown, Form, Modal } from "antd";
import FormModalProfile from "./form-update-profile";
import DateTime from "../other/date-time";
import { parseJwt } from "../../../helpers/decode-token";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../../store/features/auth/auth";

const HeaderLayout = () => {
  const [openModalUser, setOpenModalUser] = useState(false);
  const [isChangePass, setIsChangePass] = useState(false);

  const { isLoading } = useSelector((state) => state.auth);

  const userData = localStorage?.token ? parseJwt(localStorage.token) : {};

  const [formUser] = Form.useForm();

  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logoutAction()).catch(() => {});
  }, []);

  const openModal = () => {
    setOpenModalUser(true);
  };

  const closeModal = () => {
    setOpenModalUser(false);
    setIsChangePass(false);
    formUser.resetFields();
  };

  // const handleUpdateUser = () => {
  //   formUser
  //     .validateFields()
  //     .then((val) => {
  //       if (val?.password) {
  //         const valToContent = {
  //           // id: profileData.id,
  //           fullname: val.fullname,
  //           email: val.email,
  //           password: val.password,
  //         };
  //         dispatch(updateProfileAction(valToContent))
  //           .then(() => {
  //             notifSuccess({ method: "edit" });
  //             dispatch(logoutAction()).catch(() => {});
  //           })
  //           .catch(() => {});
  //       } else {
  //         const valToContent = {
  //           // id: profileData.id,
  //           fullname: val.fullname,
  //           email: val.email,
  //         };
  //         const valToCookies = {
  //           ...profileData,
  //           fullName: val?.fullname,
  //           email: val?.email,
  //         };

  //         dispatch(updateProfileAction(valToContent))
  //           .then(() => {
  //             notifSuccess({ method: "edit" });
  //             setAfterEditProfile(valToCookies);
  //             saveToCookies({ key: "userIdentity", value: valToCookies });
  //           })
  //           .catch(() => {})
  //           .finally(() => closeModal());
  //       }
  //     })
  //     .catch(() => {});
  // };
  return (
    <div className="bg-[#063127] flex justify-between items-center w-full lg:px-3 2xl:px-8 lg:pt-[2vh] 2xl:pt-[3.5vh]">
      <Modal
        title="Edit Profile"
        open={openModalUser}
        // onOk={}
        onCancel={closeModal}
        confirmLoading={false} //temp
      >
        <FormModalProfile
          form={formUser}
          isChangePass={isChangePass}
          setIsChangePass={setIsChangePass}
        />
      </Modal>
      <div className="flex-1 flex justify-center">
        <DateTime />
      </div>
      <Dropdown
        trigger={["click"]}
        popupRender={() => (
          <div className="w-full bg-white rounded-md p-3 border flex flex-col space-y-2 shadow-md">
            <div>
              <p className="text-lg font-semibold">{userData?.name}</p>
              <p className="text-sm opacity-70 ">{userData?.email}</p>
            </div>
            <div className="flex w-full items-center space-x-3">
              <Button type="primary" onClick={openModal}>
                Edit Profile
              </Button>
              <Button
                type="primary"
                danger
                onClick={handleLogout}
                loading={isLoading}
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      >
        <div className="!flex !items-center !space-x-3 hover:cursor-pointer">
          <p className="text-[#FFFFFF99] text-2xl">{userData?.name}</p>
          <Avatar className="!bg-orange-400 !text-lg flex items-center justify-center">
            {userData?.name?.charAt(0)?.toUpperCase()}
          </Avatar>
        </div>
      </Dropdown>
    </div>
  );
};

export default HeaderLayout;
