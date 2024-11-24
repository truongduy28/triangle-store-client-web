export interface CreateCustomerPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICustomer {
  firstName: string;
  lastName: string;
  email: string;
  isDeleted: boolean;
  isVerify: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreateCustomerResponse {
  message: string;
  data: ICustomer;
}

export type VerifyCustomerResponse = CreateCustomerResponse;
export type LoginCustomerResponse = CreateCustomerResponse;
