// enum role_user {
//     admin
//     customer
//     superAdmin
//     penyelenggara
//   }

//   enum status_order {
// belum_digunakan
// digunakan
// expired
//   }

//   enum status_pembayaran {
//     pending
//     gagal
//     berhasil
//   }

//   enum status_acara {
//     publish
//     draft
//     expired
//   }

export const statusActivation = {
  active: {
    label: "Aktif",
    value: 1,
  },
  inactive: {
    label: "Tidak Aktif",
    value: 0,
  },
};

export const role_user = {
  admin: {
    label: "Admin",
    value: "admin",
  },
  superAdmin: {
    label: "Super Admin",
    value: "superAdmin",
  },
  customer: {
    label: "Customer",
    value: "customer",
  },
  penyelenggara: {
    label: "Penyelenggara",
    value: "penyelenggara",
  },
};

export const statusOrder = {
  belum_digunakan: {
    label: "Belum Digunakan",
    value: "belum_digunakan",
  },
  digunakan: {
    label: "Digunakan",
    value: "digunakan",
  },
  expired: {
    label: "Kadaluarsa",
    value: "expired",
  },
};

export const statusAcara = {
  publish: {
    label: "Publish",
    value: "publish",
  },
  draft: {
    label: "Draft",
    value: "draft",
  },
  expired: {
    label: "Kadaluarsa ",
    value: "expired",
  },
};
