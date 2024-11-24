import { appBackground } from "@/constants/appInfos";
import { useRouter } from "next/router";
export const getBgUrlFromPathname = (pathname: string) => {
  const matchedBackground = appBackground.find(
    (item) => item.path === pathname
  );
  return matchedBackground ? matchedBackground.url : "";
};

export const getLastSegment = (): string => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const pathname = router.pathname; // Get the current path
  const segments = pathname.split("/").filter(Boolean); // Split and remove empty segments
  return segments.pop() || ""; // Return the last segment
};
