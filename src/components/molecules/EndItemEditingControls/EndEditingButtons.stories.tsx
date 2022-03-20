import { Meta, Story } from "@storybook/react";
import { EndEditingButtons } from "./EndEditingButtons";

export default {
  title: "molecules/EndEditingButtons",
  component: EndEditingButtons,
} as Meta;

const Template: Story = (args) => (
  <EndEditingButtons
    onClickDone={()=>{}}
    onClickCancel={()=>{}}
  />
);

const CustomTitle: Story = (args) => (
  <EndEditingButtons
    onClickDone={()=>{}}
    onClickCancel={()=>{}}
    isNewItem={true}
  /> 
);


export const Default = Template.bind({});
export const Custom = CustomTitle.bind({})

Custom.args = {
  title: "Add"
};

Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/QB5lkQFD4JsxXCmrPbqYN8/Bootstrap-UI?node-id=3185%3A1281"
  },
};
