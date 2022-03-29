import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ChangePasswordModal } from "./ChangePasswordModal";

export default {
  title: "Templates/ChangePasswordModal",
  component: ChangePasswordModal,
} as ComponentMeta<typeof ChangePasswordModal>;

const Template: ComponentStory<typeof ChangePasswordModal> = () => (
  <ChangePasswordModal />
);

export const Default = Template.bind({});

Default.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/QB5lkQFD4JsxXCmrPbqYN8/Bootstrap-UI?node-id=2596%3A2735",
  },
};
