import { Scanner } from "@yudiel/react-qr-scanner";
import { Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  const navigate = useNavigate();
  return (
    <section className="">
      <LoadingScreen isLoading={false}>
        <Scanner
          allowMultiple={true}
          onScan={(result) => console.log(result[0].rawValue)}
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
