import { Meta, Story } from "@storybook/react";
import { TopicItem } from "./TopicItem";
import { QaContents } from "../QaItem/QaItem";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default {
  "title": "Organisms/TopicItem",
  component: TopicItem
} as Meta;

const Template: Story = (args) => (
  <DndProvider backend={HTML5Backend}>
    <TopicItem 
      topicTitle={args.topicTitle} 
      topicId={args.topicId} 
      items={args.items} 
      index={0}
      moveTopic={()=>{}}
      moveQa={()=>{}}
      requestDeleteQaItem={()=>{}}
      requestDeleteTopic={()=>{}}
      requestUpdateTopicTitle={()=>{}}
      requestUpdateQaItem={()=>{}}
    />
  </DndProvider>
);

const items:QaContents[] = [
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

export const Default = Template.bind({});

Default.args = {
  topicTitle: "Topic",
  topicId: "topicid",
  items: items
};

Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/QB5lkQFD4JsxXCmrPbqYN8/Bootstrap-UI?node-id=2772%3A1383"
  },
};