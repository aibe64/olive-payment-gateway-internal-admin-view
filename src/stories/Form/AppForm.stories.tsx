import { Meta, StoryFn } from "@storybook/react/types-6-0";
import { OliveField, OliveForm } from "@/components";
import { Props } from "@/models";
import "../../index.css";

// Define metadata for the story
export default {
  title: "Form/AppForm",
  component: OliveForm,
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
      <OliveForm callApi={args.callApi}>
        <OliveField  name="name" />
        <OliveField name="email" />
        <OliveField name="dob" />
        <OliveField name="sex" />
      </OliveForm>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  
};