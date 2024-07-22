//  * @fileoverview AuthProvider component

import React, { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLoggedUser } from "@/api/user";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getLoggedUser,
  });

  return <>{children}</>;
};

export default AuthProvider;
