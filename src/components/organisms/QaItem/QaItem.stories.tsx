import { Meta, Story } from "@storybook/react";
import { QaItem } from "./QaItem";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default {
  title: "Organisms/QaItem",
  component: QaItem,
} as Meta;

const Template: Story = (args) => (
  <DndProvider backend={HTML5Backend}>
    <QaItem 
      title={args.title} 
      contents={args.contents} 
      itemId={args.itemId} 
      requestDeleteQaItem={()=>{}}
      requestUpdateItem={()=>{}}
      topicIndex={0}
      index={0}
      moveQaItem={(_)=>{}}
      {...args} />
  </DndProvider>
);

export const Default = Template.bind({});

Default.args = {
  title: "私は今朝そんなに同じ相違っ放しとしてのの他へ用いたた。いやいや時間を矛盾順もどうしてもこの計画だななりに思うているでがも道楽行ったくっありば、一応にはしでしたないない。自他の考えるで方もとうてい先刻のすでにんずまし。まるで岡田さんを反対当人どう約束を待っないくらその訳そこか把持のていうお危くましましょんですて、この昨日はそれか",
  contents: "私は今朝そんなに同じ相違っ放しとしてのの他へ用いたた。いやいや時間を矛盾順もどうしてもこの計画だななりに思うているでがも道楽行ったくっありば、一応にはしでしたないない。自他の考えるで方もとうてい先刻のすでにんずまし。まるで岡田さんを反対当人どう約束を待っないくらその訳そこか把持のていうお危くましましょんですて、この昨日はそれか...",
  itemId: "itemId"
};

Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/QB5lkQFD4JsxXCmrPbqYN8/Bootstrap-UI?node-id=2772%3A1381"
  },
};
