import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "@/assets/langs/en.json";
import translationAR from "@/assets/langs/ar.json";

const savedLanguage = localStorage.getItem("i18nextLng") || "ar";

i18n.use(initReactI18next).init({
  lng: savedLanguage,
  resources: {
    en: { ...translationEN },
    ar: { ...translationAR },
  },

  fallbackLng: "ar",
});
