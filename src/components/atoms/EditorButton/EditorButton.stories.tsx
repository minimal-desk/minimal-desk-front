import { Meta, Story } from "@storybook/react";
import { EditorButton } from "./EditorButton";

export default {
  title: "atoms/EditorButton",
  component: EditorButton,
} as Meta;

const Template: Story = (args) => (
  <EditorButton>
    <i className="bi bi-three-dots"></i>
  </EditorButton>
);

export const Default = Template.bind({});

Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/QB5lkQFD4JsxXCmrPbqYN8/Bootstrap-UI?node-id=2772%3A1285"
  },
};
