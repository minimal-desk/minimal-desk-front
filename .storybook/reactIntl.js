import { setIntlConfig, withIntl } from "storybook-addon-intl";

const locales = ["en", "ja"]
const messages = locales.reduce((acc, lang) => ({
  ...acc,
  [lang]: require(`../translations/${lang}.json`),
}), {});

const getMessages = (locale) => messages[locale]; 

export const addIntl = (story) => {
  setIntlConfig({
    locales: locales,
    defaultLocale: "en",
    getMessages,
  });
  return (withIntl(story));
};
