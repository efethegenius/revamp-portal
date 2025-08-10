export type SignInCredentials = {
  email: string;
  password: string;
  channel: string;
};

export type IRegisterPayload = {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  country: string;
  rcNumber: string;
  gender: string;
  address: string;
  occupation: string;
  dateofBirth: string;
};

export type ResetPasswordCredentials = {
  email: string;
};

export type NewPasswordResetCredentials = {
  email: string;
  token: string;
  newPassword: string;
  channel: string;
};

export type PasswordChangeCredentials = {
  currentPassword: string;
  newPassword: string;
};
