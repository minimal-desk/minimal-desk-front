import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AccountSettingsContainer } from "./AccountSettingsContainer";

export default {
  title: "Organisms/AccountSettingsContainer",
  component: AccountSettingsContainer,
} as ComponentMeta<typeof AccountSettingsContainer>;

const Template: ComponentStory<typeof AccountSettingsContainer> = (args) => (
  <AccountSettingsContainer {...args} />
);

export const Default = Template.bind({});

Default.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/QB5lkQFD4JsxXCmrPbqYN8/Bootstrap-UI?node-id=2880%3A1283",
  },
};
