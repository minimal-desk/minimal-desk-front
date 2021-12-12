import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ConsoleFooter } from "./ConsoleFooter";

export default {
  title: "Organisms/ConsoleFooter",
  component: ConsoleFooter,
} as ComponentMeta<typeof ConsoleFooter>;

const Template: ComponentStory<typeof ConsoleFooter> = (args) => <ConsoleFooter {...args} />;

export const Default = Template.bind({});

Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/QB5lkQFD4JsxXCmrPbqYN8/Bootstrap-UI?node-id=2739%3A1276"
  }
}
