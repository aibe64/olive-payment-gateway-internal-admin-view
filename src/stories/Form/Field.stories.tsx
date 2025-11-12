import { Meta, StoryFn } from "@storybook/react/types-6-0";
import { OliveField, OliveForm } from "@/components";
import { Props } from "@/models";
import "../../index.css";

// Define metadata for the story
export default {
  title: "Form/Field",
  component: OliveField,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
    name: {
      control: "text",
      defaultValue: "firstName",
    },
    label: {
      control: "text",
      defaultValue: "First Name",
    },
    required: {
      control: "boolean",
      defaultValue: true,
    },
    showPasswordMeter: {
      control: "boolean",
      defaultValue: false,
    },
    isAmountField: {
      control: "boolean",
      defaultValue: false,
    },
    type: {
      control: "select",
      defaultValue: "text",
      options: [
        "password",
        "select",
        "date",
        "tel",
        "search",
        "number",
        "dropdown",
        "text",
        "email",
      ],
    },
    validator: {
      control: "select",
      defaultValue: "text",
      options: [
        "disable",
        "bvn",
        "email",
        "phone",
        "onlyAphabet",
        "onlyNumber",
        "amountRange",
      ],
    },
  },
} as Meta;

// Define a template for the story
const Template: StoryFn<Props.Field> = (args: Props.Field) => {
  return (
    <OliveForm>
      <OliveField
        name={args.name}
        label={args.label}
        required={args.required}
        type={args.type}
        validator={args.validator}
        showPasswordMeter={args.showPasswordMeter}
        isAmountField={args.isAmountField}
      />
    </OliveForm>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: "firstName",
  label: "First Name",
  required: true,
  type: "text",
  validator: undefined,
  showPasswordMeter: false,
  isAmountField: false
};
