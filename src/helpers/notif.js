import { toast } from "react-toastify";

export const notifSuccess = ({ method }) => {
  if (method === "create") {
    toast.success("Data berhasil ditambahkan");
  } else if (method === "edit") {
    toast.success("Data berhasil diedit!");
  } else if (method === "delete") {
    toast.success("Data Berhasil Dihapus!");
  }
};
