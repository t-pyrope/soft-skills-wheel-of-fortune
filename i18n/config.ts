import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import { en } from "@/i18n/en";
import { cs } from "@/i18n/cs";
import { ru } from "@/i18n/ru";

import "dayjs/locale/en";
import "dayjs/locale/ru";
import "dayjs/locale/cs";
import dayjs from "dayjs";

// Set the key-value pairs for the different languages you want to support.
const translations = {
  en,
  cs,
  ru,
};
const i18n = new I18n(translations);

const locale = getLocales()[0]?.languageCode;

// Set the locale once at the beginning of your app.
i18n.locale = locale && ["en", "cs", "ru"].includes(locale) ? locale : "en";

// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true;

dayjs.locale(i18n.locale);

export { i18n };
