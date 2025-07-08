import dayjs from "dayjs";
import "dayjs/locale/id";

dayjs.locale("id");

export const formatDate = ({
  time = `${Date.now()}`,
  formatDate = "DD MMMM YYYY HH:mm",
}) => {
  console.log({ time });
  return dayjs(time).format(formatDate);
};
