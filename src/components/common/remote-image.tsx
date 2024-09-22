// src/components/RemoteImg.tsx
import React from "react";
import { base_backend_url } from "@/api/config";

type RemoteImgProps = React.ImgHTMLAttributes<HTMLImageElement>;

const RemoteImg: React.FC<RemoteImgProps> = ({ src, ...props }) => {
  const remoteSrc = `${base_backend_url}${src}`;

  return <img src={remoteSrc} {...props} />;
};

export default RemoteImg;
