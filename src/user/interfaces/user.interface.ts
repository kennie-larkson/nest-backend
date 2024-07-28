export default interface User {
  fname: string;
  lname: string;
  email: string;
  password: string;
  gender: string;
}

export interface ReturnedUser {
  id: number;
  fname: string;
  lname: string;
  email: string;
  gender: string;
}
