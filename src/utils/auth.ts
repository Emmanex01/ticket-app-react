import { getItem, setItem } from "./localStorage";

export const SESSION_KEY = "ticketapp_session";

export interface User {
  email: string;
  password: string;
}

export const signupUser = (user: User): boolean => {
  const users = getItem<User>('ticketapp_users')
  const exists = users.find((u: User) => u.email === user.email);

  if (exists) return false;
  users.push(user);
  setItem("ticketapp_users", user);
  return true;
};

export const loginUser = (email: string, password: string): boolean => {
  const users = getItem<User>("ticketapp_users");
  const valid = users.find(
    (u: User) => u.email === email && u.password === password
  );

  if (valid) {
    setItem(SESSION_KEY, email)
    return true;
  }
  return false;
};

export const logoutUser = (): void => {
  localStorage.removeItem(SESSION_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getItem<any>(SESSION_KEY);
};
