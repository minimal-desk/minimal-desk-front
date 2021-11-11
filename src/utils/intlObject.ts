import { createIntl, createIntlCache } from '@formatjs/intl';
import en from '../../translations/en.json'; // ja.json

const cache = createIntlCache();
export const intlObject = createIntl({
  locale: 'en',
  messages: en
}, cache);