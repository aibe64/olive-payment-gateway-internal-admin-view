import { Meta, StoryFn } from "@storybook/react/types-6-0";
import { XpressField, XpressForm } from "@/components";
import { Props } from "@/models";
import "../../index.css";

// Define metadata for the story
export default {
  title: "Form/AppForm",
  component: XpressForm,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
} as Meta;
interface TemplateProps {
    name: string;
    email: string;
    dob: Date;
    sex: string
}

const Template: StoryFn<Props.Field> = (args: Props.FormProp<TemplateProps>) => {
  return (
    <div>
      <XpressForm callApi={args.callApi}>
        <XpressField  name="name" />
        <XpressField name="email" />
        <XpressField name="dob" />
        <XpressField name="sex" />
      </XpressForm>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  
};