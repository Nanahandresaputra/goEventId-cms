import { Scanner } from "@yudiel/react-qr-scanner";
import { Button, Spin } from "antd";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkInAction } from "../../store/features/check-in/check-in";

const LoadingScreen = ({ children, isLoading }) => {
  return (
    <section className="h-full w-full relative">
      {isLoading && (
        <div className="h-full w-full absolute z-[99999] bg-black/80 flex justify-center items-center">
          <Spin size="large" />
        </div>
      )}
      {children}
    </section>
  );
};

const ScanQr = () => {
  const { isLoadingCheckIn } = useSelector((state) => state.checkIn);
  const navigate = useNavigate();
  const dispatch = useDispatch(() => {}, []);

  const scanTicket = useCallback((kode_order) => {
    dispatch(checkInAction({ body: { kode_order } }))
      .then((res) => {
        if (res?.meta?.requestStatus === "fulfilled")
          navigate("/check-in/success");
      })
      .catch(() => {});
  }, []);

  return (
    <section className="">
      <LoadingScreen isLoading={isLoadingCheckIn}>
        <Scanner
          allowMultiple={!isLoadingCheckIn}
          onScan={(result) => scanTicket(result[0].rawValue)}
          classNames={{ container: "!h-[92vh]" }}
          onError={() => toast.error("Terjadi Kesalahan!")}
        />
        <Button
          type="primary"
          className="!h-[8vh] !w-full !text-xl"
          onClick={() => navigate("/check-in")}
        >
          Batal
        </Button>
      </LoadingScreen>
    </section>
  );
};

export default ScanQr;
