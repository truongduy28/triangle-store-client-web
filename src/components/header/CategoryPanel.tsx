import { useGetCategories } from "@/hooks/tanstacks/useCategory";
import { Card, Skeleton } from "antd";
import React from "react";

const CategoryPanel = () => {
  const { data, isLoading } = useGetCategories({ page: 1, size: 999999 });
  return (
    <>
      <Card size="default" className="shadow-lg mt-3">
        {isLoading ? <Skeleton /> : <p>ABc</p>}
      </Card>
    </>
  );
};

export default CategoryPanel;
