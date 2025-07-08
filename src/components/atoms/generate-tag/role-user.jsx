import { role_user } from "../../../helpers/status-data";

const RolerUserTag = ({ text }) => {
  return (
    <section
      className={`py-1 px-3 rounded-lg  ${
        text === role_user.superAdmin.value || text === role_user.admin.value
          ? "bg-purple-100 border border-purple-700"
          : text === role_user.customer.value
          ? "bg-blue-100 border border-blue-700"
          : "bg-teal-100 border border-teal-700"
      }`}
    >
      <p
        className={`text-sm  text-center ${
          text === role_user.superAdmin.value || text === role_user.admin.value
            ? "text-purple-700"
            : text === role_user.customer.value
            ? "text-blue-700"
            : "text-teal-700"
        }`}
      >
        {role_user?.[text]?.label}
      </p>
    </section>
  );
};

export default RolerUserTag;
