import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          signIn: "Sign in",
          signUp: "Sign up",
          cancel: "Cancel",
          email: "Email",
          password: "Password",
          emailRequired: "Email is required",
          passwordRequired: "Password is required",
          loading: "Loading...",
        },
      },
      ru: {
        translation: {
          signIn: "Войти",
          signUp: "Регистрация",
          cancel: "Отмена",
          email: "Эл. адрес",
          password: "Пароль",
          emailRequired: "Требуется эл. адрес",
          passwordRequired: "Требуется пароль",
          loading: "Загрузка...",
        },
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
