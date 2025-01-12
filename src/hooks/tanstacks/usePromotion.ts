import {
  GetPromotionResponse,
  GetPromotionsResponse,
} from "@/interfaces/promotion";
import { useQuery } from "@tanstack/react-query";
import handleAPI from "../../apis/handleApi";
import { GET_PROMOTIONS } from "@/constants/endpoint";

export const useGetPromotions = () =>
  useQuery<GetPromotionsResponse, any, GetPromotionsResponse, any>({
    queryKey: ["get-promotions"],
    queryFn: () =>
      handleAPI(GET_PROMOTIONS) as unknown as Promise<GetPromotionsResponse>,
    refetchOnWindowFocus: false,
  });

export const useGetPromotion = (id?: string) =>
  useQuery<GetPromotionResponse, any, GetPromotionResponse, any>({
    queryKey: ["get-promotion", id],
    queryFn: () =>
      id
        ? (handleAPI(
            `${GET_PROMOTIONS}/${id}`
          ) as unknown as Promise<GetPromotionResponse>)
        : (undefined as any),
    refetchOnWindowFocus: false,
  });
