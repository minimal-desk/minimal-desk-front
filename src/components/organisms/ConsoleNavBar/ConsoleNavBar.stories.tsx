import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ConsoleNavBar } from "./ConsoleNavBar";


export default {
  title: "Organisms/ConsoleNavBar",
  component: ConsoleNavBar,
} as ComponentMeta<typeof ConsoleNavBar>;

const Template: ComponentStory<typeof ConsoleNavBar> = (args) => <ConsoleNavBar {...args} />;

export const Default = Template.bind({});

Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/QB5lkQFD4JsxXCmrPbqYN8/Bootstrap-UI?node-id=2723%3A1280"
  }
}