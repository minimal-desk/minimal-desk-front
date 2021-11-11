Front-end of MinimalDesk

## react-intl

### react componentの中で使う場合（`IntlProvider`が`root`にある状況）
```js
// Componentを使う方法
import { FormattedMessage } from "react-intl";

<FormattedMessage
  id="IntlDemo.h1"
  defaultMessage="Welcome to Next.js!"
/>


//useIntlを使う方法（propsに設定するときなど）
import { useIntl } from "react-intl";

const { formatMessage } = useIntl();

<Button label={formatMessage({id: "IntlDemo.h1", defaultMessage: "Welcome to Next.js!"})} />
```

### react component以外で使う場合。
*react componentで指定しているtranslationのjsonファイルと設定を同期させてない（個別にファイルを参照している）ので多言語対応機能をユーザーに提供する際は要修正。

```js
import { intlObject } from "./utils/intlObject";

const label = intlObject.formatMessage({id: "IntlDemo.h1", defaultMessage: "Welcome to Next.js!"});
```

`yarn extract`で`translations/[en.json |ja.json]`が生成される。当面の間は日本語版を作る予定はないのでこのコマンドは叩く必要なし。`en.json`には`defaultMessage`が自動で挿入される。

`id`は`[component name].[hogehoge]`のようにすれば良いと思う。

### 多言語対応の確認方法
Storybookの場合、Locales -> EN / JA を切り替えると確認できる。`intlObject`を使っている場合はこの方法では確認できないので注意。`intlObject`で設定したものを切り替えたい場合は`intlObject.tsx`で指定しているjsonを手動で変える。

## storybook

### 起動コマンド

```shell
yarn storybook
```

### Figma の追加方法

```js
import { withDesign } from "storybook-addon-designs";

export default {
  title: "My stories",
  component: Button,
  decorators: [withDesign],
};

export const myStory = () => <Button>Hello, World!</Button>;

myStory.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File",
  },
};
```
