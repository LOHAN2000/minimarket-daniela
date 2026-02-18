export interface newUser {
  name: string,
  lastName: string,
  email: string,
  userName: string,
  password: string,
  role: string
}

export interface User {
  sub: string;
  unique_name: string;
  role: string;
  fullname?: string;
}