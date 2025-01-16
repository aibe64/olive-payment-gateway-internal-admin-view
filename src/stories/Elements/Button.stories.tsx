import { Meta, StoryFn } from "@storybook/react/types-6-0";
import { XpressButton } from "@/components";
import { Props } from "@/models"; 
import "../../index.css";

// Define metadata for the story
export default {
  title: "Elements/Button",
  component: XpressButton,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: "clicked" },
    callApi: { control: "boolean" },
    customApiConfigs: { control: "object" },
  },
} as Meta;

// Define a template for the story
const Template: StoryFn<Props.Button> = (args: Props.Button) => (
    <XpressButton {...args} />
);

// Default Button story
export const Default = Template.bind({});
Default.args = {
  title: "Submit",
  htmlType: "button",
  block: false,
  classNames: "bg-primary hover:!bg-primary",
  loading: false,
  disabled: false,
  callApi: false,
};

// Loading Button story
export const Loading = Template.bind({});
Loading.args = {
  title: "Loading...",
  htmlType: "button",
  block: true,
  classNames: "bg-primary hover:!bg-primary",
  loading: true,
  disabled: false,
  callApi: false,
};

// Link Button story
export const LinkButton = Template.bind({});
LinkButton.args = {
  title: "Link Button",
  htmlType: "link",
  loading: false,
  disabled: false,
};

// Submit Button story
export const SubmitButton = Template.bind({});
SubmitButton.args = {
  title: "Submit Form",
  htmlType: "submit",
  block: true,
  classNames: "bg-primary hover:!bg-primary",
  loading: false,
  disabled: false,
};
