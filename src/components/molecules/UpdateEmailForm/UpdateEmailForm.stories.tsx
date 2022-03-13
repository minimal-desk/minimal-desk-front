import { ComponentStory, ComponentMeta } from "@storybook/react";
import { UpdateEmailForm } from "./UpdateEmailForm";

export default {
  title: "Molecules/UpdateEmailForm",
  component: UpdateEmailForm,
} as ComponentMeta<typeof UpdateEmailForm>;

const Template: ComponentStory<typeof UpdateEmailForm> = (args) => (
  <UpdateEmailForm {...args} />
);

export const Default = Template.bind({});

Default.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/QB5lkQFD4JsxXCmrPbqYN8/Bootstrap-UI?node-id=2810%3A1335",
  },
};
