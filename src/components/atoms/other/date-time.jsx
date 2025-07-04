import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/id";

dayjs.locale("id");

const DateTime = () => {
  const [time, setTime] = useState(dayjs());

  useEffect(() => {
    const intervalId = setInterval(() => setTime(dayjs()), 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <section className="text-center">
      <p className="text-[#FFFFFF99] text-2xl">{time.format("HH:mm")}</p>
      <p className="text-[#FFFFFF99] text-lg">
        {time.format("ddd, DD MMM YYYY")}
      </p>
    </section>
  );
};

export default DateTime;
