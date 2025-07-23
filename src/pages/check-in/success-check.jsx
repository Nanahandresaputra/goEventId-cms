import { BsFillPatchCheckFill } from "react-icons/bs";
import { checkImg } from "../../assets/images";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const SuccessCheckIn = () => {
  const navigate = useNavigate();
  return (
    <section className="h-screen w-screen overflow-hidden bg-[#225246] flex flex-col items-center justify-center space-y-28 ">
      <img src={checkImg} alt="check" className="h-24 w-24" />
      <p className="text-white font-semibold text-2xl">Berhasil Check-in</p>
      <Button
        type="primary"
        className="w-9/12 !py-6 !font-semibold !text-2xl !absolute !bottom-8"
        onClick={() => navigate("/check-in/scan")}
      >
        Lanjut Scan
      </Button>
    </section>
  );
};

export default SuccessCheckIn;
