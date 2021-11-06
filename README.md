Front-end of MinimalDesk

## react-intl

基本的に下記の書き方で OK

```:js
<FormattedMessage
  id="IntlDemo.h1"
  defaultMessage="Welcome to Next.js!"
/>
```

`yarn extract`で`translations/[en.json |ja.json]`が生成される。当面の間は日本語版を作る予定はないのでこのコマンドは叩く必要なし。`en.json`には`defaultMessage`が自動で挿入される。

`id`は`[component name].[tag]`のようにすれば良いと思うが、ひとつの`component`に同じタグがある場合は suffix をつける必要がある。要検討。

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
