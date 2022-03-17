import { Meta, Story } from "@storybook/react";
import { EditorDropdownMenu } from "./DropdownMenu";

export default {
  title: "Molecules/DropdownMenu",
  component: EditorDropdownMenu,
} as Meta;

const Template: Story = (args) => (
  <EditorDropdownMenu 
    menuId = "menuid"
    onClickEdit={()=>{}}
    onClickDelete={()=>{}}

  />
);

export const Default = Template.bind({});

Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/QB5lkQFD4JsxXCmrPbqYN8/Bootstrap-UI?node-id=2599%3A3413"
  },
};

const CustomTitle: Story = (args) => (
  <EditorDropdownMenu 
    menuId = "menuid"
    onClickEdit={()=>{}}
    onClickDelete={()=>{}}
    editButtonTitle={args.editButtonTitle}
    deleteButtonTitle={args.deleteButtonTitle}
  />
);

export const Custom = CustomTitle.bind({});

Custom.args = {
  editButtonTitle: "Edit Topic Title",
  deleteButtonTitle: "Delete Topic"
};