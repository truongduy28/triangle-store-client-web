/* eslint-disable @next/next/no-img-element */
import { useGetPromotions } from "@/hooks/tanstacks/usePromotion";
import { IPromotion } from "@/interfaces/promotion";
import { Button, Carousel, Divider, Space, Typography } from "antd";
import React, { useMemo } from "react";
import { BsArrowRight } from "react-icons/bs";

const { Title } = Typography;
const PromotionCarousel = () => {
  const { data, isLoading } = useGetPromotions();

  const promotions: IPromotion[] = useMemo(() => data?.data || [], [data]);

  return (
    <Carousel
      autoplay
      speed={1500}
      swipe
      infinite
      style={{
        width: "100%",
        height: "60vw",
        padding: 20,
      }}
    >
      {promotions &&
        promotions.map((item) => (
          <div key={item._id} className="relative">
            <img
              src={
                item.imageURL ||
                "https://image-assets.eu-2.volcanic.cloud/api/v1/assets/images/e943be30799bf9bfd52932527875a4ad?t=1671685039"
              }
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              alt=""
            />
            <div className="absolute top-1/2 left-20 -translate-y-1/2">
              <Title className="m-0">{item.title}</Title>
              <Space>
                <Title level={3} className="m-0" style={{ fontWeight: 300 }}>
                  UP TO {item.value} {item.type === "percent" ? "%" : ""}
                </Title>
                <Divider type="vertical" />
                <Title
                  copyable
                  level={4}
                  className="m-0"
                  style={{ fontWeight: 300 }}
                >
                  {item.code}
                </Title>
              </Space>

              <div className="mt-4">
                <Button
                  iconPosition="end"
                  size="large"
                  icon={<BsArrowRight size={18} />}
                  type="primary"
                >
                  Shop now
                </Button>
              </div>
            </div>
          </div>
        ))}
    </Carousel>
  );
};

export default PromotionCarousel;
