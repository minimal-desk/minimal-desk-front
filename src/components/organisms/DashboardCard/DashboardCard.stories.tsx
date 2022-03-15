import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DashboardCard } from "./DashboardCard";

export default {
  title: "Organisms/DashboardCard",
  component: DashboardCard,
} as ComponentMeta<typeof DashboardCard>;

const Template: ComponentStory<typeof DashboardCard> = (args) => (
  <DashboardCard title={"card title"} />
);

export const Default = Template.bind({});

Default.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/QB5lkQFD4JsxXCmrPbqYN8/Bootstrap-UI?node-id=2590%3A1164",
  },
};
