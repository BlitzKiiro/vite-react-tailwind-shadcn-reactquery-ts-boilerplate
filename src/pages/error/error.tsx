import React from "react";
import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const ErrorElement: React.FC = () => {
  const { t } = useTranslation();
  const error: any = useRouteError();

  let errorMessage = error.message ?? "An unexpected error occurred.";
  let errorCode = "";

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || errorMessage;
    errorCode = error.status.toString() ?? "500";
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='p-6  rounded-lg  text-center w-[80vw]'>
        <h1 className='text-7xl font-bold text-red-600 mb-4'>{errorCode}</h1>
        <p className='text-lg text-gray-700 mb-2'>{t("error.error-heading")}</p>
        <p className='text-md text-gray-500 mb-6'>{errorMessage}</p>
        <Link to='/'>
          <Button variant='outline'> {t("error.go-home")}</Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorElement;
