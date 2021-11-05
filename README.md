Front-end of MinimalDesk

## react-intl
基本的に下記の書き方でOK
```
<FormattedMessage
  id="IntlDemo.h1"
  defaultMessage="Welcome to Next.js!" 
/>
```

`yarn extract`で`translations/[en.json |ja.json]`が生成される。当面の間は日本語版を作る予定はないのでこのコマンドは叩く必要なし。`en.json`には`defaultMessage`が自動で挿入される。

`id`は`[component name].[tag]`のようにすれば良いと思うが、ひとつの`component`に同じタグがある場合はsuffixをつける必要がある。要検討。