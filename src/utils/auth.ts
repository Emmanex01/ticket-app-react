export const SESSION_KEY = "ticketapp_session";

export interface User {
  email: string;
  password: string;
}

export const signupUser = (user: User): boolean => {
  const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
  const exists = users.find((u: User) => u.email === user.email);

  if (exists) return false;
  users.push(user);
  localStorage.setItem("ticketapp_users", JSON.stringify(users));
  return true;
};

export const loginUser = (email: string, password: string): boolean => {
  const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
  const valid = users.find(
    (u: User) => u.email === email && u.password === password
  );

  if (valid) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email }));
    return true;
  }
  return false;
};

export const logoutUser = (): void => {
  localStorage.removeItem(SESSION_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(SESSION_KEY);
};
