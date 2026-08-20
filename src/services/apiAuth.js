import {
  mockLogin,
  mockSignup,
  mockGetCurrentUser,
  mockLogout,
  mockUpdateCurrentUser,
} from "../data/mockData";

export async function login({ email, password }) {
  return mockLogin({ email, password });
}

export async function signup({ fullName, email, password }) {
  return mockSignup({ fullName, email, password });
}

export async function getCurrentUser() {
  return mockGetCurrentUser();
}

export async function logout() {
  return mockLogout();
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  return mockUpdateCurrentUser({ password, fullName, avatar });
}
