// import NextI18Next = require('next-i18next');
import NextI18Next, {
  AppWithTranslation,
  Config,
  I18n,
  InitPromise,
  UseTranslation,
  WithTranslationHocType
} from "next-i18next";
import path from "path";
import * as config from "next/config";

export type { WithTranslation } from "next-i18next";

const { localeSubpaths } = config.default().publicRuntimeConfig

const i18n = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['de'],
  localeSubpaths,
  localePath: path.resolve('./public/static/locales')
});


export default i18n;

const
  XTrans = i18n.Trans,
  XLink = i18n.Link,
  XRouter = i18n.Router,
  Xi18n = i18n.i18n,
  XinitPromise = i18n.initPromise,
  Xconfig = i18n.config,
  XuseTranslation = i18n.useTranslation,
  XwithTranslation = i18n.withTranslation,
  XappWithTranslation = i18n.appWithTranslation;

export {
  XTrans as Trans,
  XLink as Link,
  XRouter as Router,
  Xi18n as i18n,
  XinitPromise as initPromise,
  Xconfig as config,
  XuseTranslation as useTranslation,
  XwithTranslation as withTranslation,
  XappWithTranslation as appWithTranslation,
}
