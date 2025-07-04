import { Navigate, useLocation, useRoutes } from "react-router-dom";
import MobileApp from "./page/mobile/layout";
import MhomePage from "./page/mobile/home";
import ScanQr from "./page/mobile/scan-qr/index.js";
import Payment from "./page/mobile/payment/index.js";
import HistoryTransactions from "./page/mobile/history-transactions/index.js";
import Profile from "./page/mobile/profile/index.js";
import PinUpdate from "./page/mobile/profile/pin-update/index.js";
import FormPassword from "./page/mobile/profile/change-password/index.js";
import AuthLogin from "./page/auth/index.js";
import DecryptorTest from "./debugger/decryptor-test.js";
import EncryptorTest from "./debugger/encryptor-test.js";
import ChangeProfile from "./page/mobile/profile/change-profile/index.js";
import SendEmailOtp from "./page/mobile/change-password-otp/send-email/index.js";
import ChangePasswordRedirect from "./page/mobile/change-password-otp/change-password-redirect/index.js";
import DesktopApp from "./page/desktop/layout.js";
import MangementUserShift from "./page/desktop/management/user-shift/index.js";
import { admin, client, superAdmin } from "./helpers/levelData.js";
import { getCookiesData } from "./helpers/cookies.js";
import ManagementUser from "./page/desktop/management/user/index.js";
import ManagementShift from "./page/desktop/management/shift/index.js";
import ReportingTransaction from "./page/desktop/reporting/transaction/index.js";
import ManagementCompany from "./page/desktop/management/company/index.js";

//===================== Private Router ===================

const ParentRedirect = () => {
  return <Navigate to={"/login"} />;
};

const PrivateRouterMobile = ({ children }) => {
  const loggedIn = getCookiesData({ key: "loggedIn" });
  const isValidateP = sessionStorage.getItem("isValidateP");
  const userIdentity = getCookiesData({ key: "userIdentity" });
  const profileData = userIdentity?.value;

  if (profileData && profileData?.level === client && loggedIn && isValidateP) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

const PrivateRouterDesktop = ({ children }) => {
  const userIdentity = getCookiesData({ key: "userIdentity" });
  const profileData = userIdentity?.value;

  if (
    profileData &&
    (profileData?.level === admin || profileData?.level === superAdmin)
  ) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

const PrivateAuth = ({ children }) => {
  const userIdentity = getCookiesData({ key: "userIdentity" });
  const profileData = userIdentity?.value;

  if (
    profileData &&
    (profileData?.level === admin || profileData?.level === superAdmin)
  ) {
    // default link is temporary
    return <Navigate to={"/desktop/manajemen-pengguna"} />;
  } else {
    return children;
  }
};

const PrivatePayment = ({ children }) => {
  const { state } = useLocation();

  if (state?.scannedQr) {
    return children;
  } else {
    return <Navigate to={"/mobile/homepage"} />;
  }
};

//======================== Debugger =====================

const debbugerRoutes = [
  {
    path: "/decryptor-test",
    element: <DecryptorTest />,
  },
  {
    path: "/encryptor-test",
    element: <EncryptorTest />,
  },
];

//===================== Mobile Router ====================

const mobileRoutes = [
  {
    path: "/mobile",
    element: (
      <PrivateRouterMobile>
        <MobileApp />
      </PrivateRouterMobile>
    ),
    children: [
      { path: "homepage", element: <MhomePage /> },
      { path: "scan-qr", element: <ScanQr /> },
      {
        path: "payment",
        element: (
          <PrivatePayment>
            <Payment />
          </PrivatePayment>
        ),
      },
      { path: "riwayat", element: <HistoryTransactions /> },
      {
        path: "profile",
        element: <Profile />,
      },
      { path: "change-password", element: <FormPassword /> },
      { path: "pin-update", element: <PinUpdate /> },
      { path: "profile-update", element: <ChangeProfile /> },
    ],
  },
];

//===================== Desktop Router =====================

const desktopRoutes = [
  {
    path: "/desktop",
    element: (
      <PrivateRouterDesktop>
        <DesktopApp />
      </PrivateRouterDesktop>
    ),
    children: [
      // { path: "manajemen-shift-pengguna", element: <MangementUserShift /> },
      { path: "manajemen-pengguna", element: <ManagementUser /> },
      { path: "manajemen-shift", element: <ManagementShift /> },
      { path: "manajemen-perusahaan", element: <ManagementCompany /> },
      { path: "laporan-transaksi", element: <ReportingTransaction /> },
    ],
  },
];

const AppRouter = () => {
  const routers = useRoutes([
    ...mobileRoutes,
    ...desktopRoutes,
    ...debbugerRoutes,
    {
      path: "/login",
      element: (
        <PrivateAuth>
          <AuthLogin />
        </PrivateAuth>
      ),
    },
    { path: "/", element: <ParentRedirect /> },
    { path: "/send-email", element: <SendEmailOtp /> },
    { path: "/reset-password", element: <ChangePasswordRedirect /> },
  ]);

  return routers;
};

export default AppRouter;
