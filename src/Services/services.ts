import axios from "axios";
import type {
  IRegisterPayload,
  NewPasswordResetCredentials,
  PasswordChangeCredentials,
  ResetPasswordCredentials,
  SignInCredentials,
} from "./serviceTypes";
// import { BASE_URL, SIGN_IN } from "../../constants/api";

const retaiPortalservice = axios.create({
  baseURL:
    "https://customerinfoupdate-retailportal-staging.azurewebsites.net/api",
  timeout: 1000000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    ApiKey: "AIRQODK2Q3IOHKZ0OQH7QH8S7Z1758H5FDS81PGH",
  },
});

retaiPortalservice.interceptors.request.use(
  async (config) => {
    // const accessToken = sessionStorage.getItem("token");
    const token = sessionStorage.getItem("token") || null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function getProducts() {
  const { data } = await retaiPortalservice.get(`products`);
  return data;
}

export async function signIn(credentials: SignInCredentials) {
  const { data } = await retaiPortalservice.post(`login`, credentials);
  return data;
}

export async function register(payload: IRegisterPayload) {
  const { data } = await retaiPortalservice.post(`Register`, payload);
  return data;
}

export async function SendResetPasswordLink(
  credentials: ResetPasswordCredentials
) {
  const { data } = await retaiPortalservice.post(
    `SendResetPasswordLink`,
    credentials
  );
  return data;
}

export async function NewResetPassword(
  credentials: NewPasswordResetCredentials
) {
  const { data } = await retaiPortalservice.post(`ResetPassword`, credentials);
  return data;
}

export async function ChangePassword(credentials: PasswordChangeCredentials) {
  const { data } = await retaiPortalservice.post(`ChangePassword`, credentials);
  return data;
}
