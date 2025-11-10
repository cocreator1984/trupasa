"use client";
import Image from "next/image";
import clsx from "clsx";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

type LogoSize = "sm" | "md" | "lg" | "xl" | "2xl" | "xxl" | "3xl";

const sizeMap: Record<LogoSize, { w: number; h: number; sizes: string }> = {
  sm: { w: 32, h: 32, sizes: "(max-width: 768px) 28px, 32px" },
  md: { w: 48, h: 48, sizes: "(max-width: 768px) 40px, 48px" },
  lg: { w: 64, h: 64, sizes: "(max-width: 768px) 48px, 64px" },
  xl: { w: 96, h: 96, sizes: "(max-width: 768px) 72px, 96px" },
  "2xl": { w: 128, h: 128, sizes: "(max-width: 768px) 96px, 128px" },
  xxl: { w: 160, h: 160, sizes: "(max-width: 768px) 120px, 160px" },
  "3xl": { w: 192, h: 192, sizes: "(max-width: 768px) 144px, 192px" },
};

export default function Logo({
  size = "lg",
  alt = "Trupasa logo",
  className,
  priority,
}: {
  size?: LogoSize;
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  const cfg = sizeMap[size] ?? sizeMap.lg;
  const src = `${BASE_PATH}/trupasa.jpeg`;
  return (
    <Image
      src={src}
      alt={alt}
      width={cfg.w}
      height={cfg.h}
      sizes={cfg.sizes}
      priority={priority}
      className={clsx("rounded", className)}
    />
  );
}
