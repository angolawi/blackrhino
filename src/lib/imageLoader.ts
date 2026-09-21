import { getAssetPath } from "@/utils/assetPath";

export default function imageLoader({
  src,
}: {
  src: string;
  width?: number;
  quality?: number;
}): string {
  return getAssetPath(src);
}
