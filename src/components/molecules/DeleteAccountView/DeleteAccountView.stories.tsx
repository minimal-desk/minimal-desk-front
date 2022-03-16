import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DeleteAccountView } from "./DeleteAccountView";

export default {
  title: "Molecules/DeleteAccountView",
  component: DeleteAccountView,
} as ComponentMeta<typeof DeleteAccountView>;

const Template: ComponentStory<typeof DeleteAccountView> = () => (
  <DeleteAccountView />
);

export const Default = Template.bind({});

Default.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/QB5lkQFD4JsxXCmrPbqYN8/Bootstrap-UI?node-id=2872%3A1282",
  },
};
