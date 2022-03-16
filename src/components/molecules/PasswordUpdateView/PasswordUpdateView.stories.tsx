import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PasswordUpdateView } from "./PasswordUpdateView";

export default {
  title: "Molecules/PasswordUpdateView",
  component: PasswordUpdateView,
} as ComponentMeta<typeof PasswordUpdateView>;

const Template: ComponentStory<typeof PasswordUpdateView> = (args) => (
  <PasswordUpdateView {...args} />
);

export const Default = Template.bind({});

Default.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/QB5lkQFD4JsxXCmrPbqYN8/Bootstrap-UI?node-id=2868%3A1281",
  },
};
