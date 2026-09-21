export default function imageLoader({
  src,
}: {
  src: string;
  width?: number;
  quality?: number;
}): string {
  const isProd = process.env.NODE_ENV === "production";
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? "/blackrhino" : "");

  if (basePath && src.startsWith("/") && !src.startsWith(`${basePath}/`)) {
    return `${basePath}${src}`;
  }
  return src;
}
