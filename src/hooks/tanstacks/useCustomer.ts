import handleAPI from "@/apis/handleApi";
import {
  ADD_CUSTOMER,
  LOGIN_CUSTOMER,
  RESEND_CODE,
  VERIFY_CODE,
} from "@/constants/endpoint";
import {
  CreateCustomerPayload,
  CreateCustomerResponse,
  LoginCustomerResponse,
  VerifyCustomerResponse,
} from "@/interfaces/customer";
import { useMutation } from "@tanstack/react-query";

export const useCreateCustomer = () =>
  useMutation<CreateCustomerResponse, any, any, any>({
    mutationFn: (body: CreateCustomerPayload) =>
      handleAPI(
        ADD_CUSTOMER,
        body,
        "post"
      ) as unknown as Promise<CreateCustomerResponse>,
  });

export const useVerifyCustomer = () =>
  useMutation<VerifyCustomerResponse, any, { code: string; id: string }, any>({
    mutationFn: async (body: { code: string; id: string }) =>
      (await handleAPI(
        VERIFY_CODE,
        body,
        "post"
      )) as unknown as Promise<VerifyCustomerResponse>,
  });

export const useResendVerifyCodeCustomer = () =>
  useMutation<{ message: string }, any, { email: string; id: string }, any>({
    mutationFn: async (body: { email: string; id: string }) =>
      (await handleAPI(RESEND_CODE, body, "post")) as unknown as Promise<{
        message: string;
      }>,
  });

export const useLoginCustomer = () =>
  useMutation<
    LoginCustomerResponse,
    any,
    { email: string; password: string },
    any
  >({
    mutationFn: async (body: { email: string; password: string }) =>
      (await handleAPI(
        LOGIN_CUSTOMER,
        body,
        "post"
      )) as unknown as Promise<LoginCustomerResponse>,
  });
