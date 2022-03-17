import { Meta, Story } from "@storybook/react";
import { QaContents } from "../QaItem/QaItem";
import { TopicContents } from "../TopicItem/TopicItem";
import { TopicCollection } from "./TopicCollection";

export default {
  "title": "Organisms/TopicCollection",
  component: TopicCollection
} as Meta;

const Template: Story = (args) => (
  <TopicCollection
    topicItems={args.items}
  />
);

const qaItems:QaContents[] = [
  { 
    title: "FreshDeskやZenDeskと何が違うんですか？", 
    contents: "MinimalDeskは個人開発者向けのヘルプデスクサービスに特化しています。従来のヘルプデスクサービスに比べ、簡単な操作でヘルプデスクを構築できます。既存のWEBサイトへの埋め込みやREST APIからのデータ取得にも対応しています。", 
    itemId: "item1" 
  },

  { 
    title: "私は今朝そんなに同じ相違っ放しとしてのの他へ用いたた。いやいや時間を矛盾順もどうしてもこの計画だななりに思うているでがも道楽行ったくっありば、一応にはしでしたないない。", 
    contents: "私は今朝そんなに同じ相違っ放しとしてのの他へ用いたた。いやいや時間を矛盾順もどうしてもこの計画だななりに思うているでがも道楽行ったくっありば、一応にはしでしたないない。自他の考えるで方もとうてい先刻のすでにんずまし。まるで岡田さんを反対当人どう約束を待っないくらその訳そこか把持のていうお危くましましょんですて、この昨日はそれか", 
    itemId: "item2" 
  },
]

const qaItems2:QaContents[] = [
  { 
    title: "ほげほげ", 
    contents: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ", 
    itemId: "item3" 
  },

  { 
    title: "もげもげ", 
    contents: "トンネルを抜けるとそこは雪国だった ", 
    itemId: "item4" 
  },
]

const topicItems:TopicContents[] = [
  {
    topicTitle: "何らかのトピック",
    topicId: "topicItem1",
    items: qaItems
  },
  {
    topicTitle: "2つめのトピック",
    topicId: "topicItem2",
    items: qaItems2
  }
]

export const Default = Template.bind({});

Default.args = {
  items: topicItems
};

Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/QB5lkQFD4JsxXCmrPbqYN8/Bootstrap-UI?node-id=3108%3A1281"
  },
};
