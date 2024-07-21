export interface UserData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

// export type Expense = {
//   _id: string;
//   text: string;
//   amount: number;
// };