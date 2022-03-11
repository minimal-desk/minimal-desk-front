import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AccountDeleteModal } from "./AccountDeleteModal";

export default {
  title: "Templates/AccountDeleteModal",
  component: AccountDeleteModal,
} as ComponentMeta<typeof AccountDeleteModal>;

const Template: ComponentStory<typeof AccountDeleteModal> = () => (
  <AccountDeleteModal />
);

export const Default = Template.bind({});

Default.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/QB5lkQFD4JsxXCmrPbqYN8/Bootstrap-UI?node-id=2596%3A2830",
  },
};
