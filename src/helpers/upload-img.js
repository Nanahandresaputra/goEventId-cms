import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";

export const getBase64 = ({ file, callback }) => {
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      callback(reader.result);

      resolve(reader.result);
    };
    reader.onerror = (error) => {
      toast.error(error);
      reject(error);
    };
  });
};
export const beforeUpload = ({ file, setValidateImg }) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    console.error("You can only upload JPG/PNG file!");
    setValidateImg(true);

    setTimeout(() => {
      setValidateImg(false);
    }, 1800);
  } else {
    setValidateImg(false);
  }
  return false;
};

export async function handleImageUpload({ file }) {
  const options = {
    maxSizeMB: 0.04,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(file, options);

    console.log("compressed file --->", compressedFile);
    return compressedFile;
  } catch (error) {
    console.log(error);
  }
}
