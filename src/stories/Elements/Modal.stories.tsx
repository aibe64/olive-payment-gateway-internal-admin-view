// OliveModal.stories.tsx
import { Meta, StoryFn } from "@storybook/react";
import { useEffect } from "react";
import { Button } from "antd";
import { useModalStore } from "@/store";
import { OliveModal } from "@/components";
import { OliveField, OliveForm } from "@/components/Form";

export default {
  title: "Elements/OliveModal",
  component: OliveModal,
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      defaultValue: false,
    },
    title: {
      control: "text",
      defaultValue: "Modal Title",
    },
    body: {
      control: "text",
      defaultValue: "This is the modal content.",
    },
    width: {
      control: { type: "number" },
      defaultValue: 500,
    },
    showCloseButton: {
      control: "boolean",
      defaultValue: true,
    },
  },
  parameters: {
    docs: {
      source: {
        // Only show the necessary part of the code in documentation
        code: `
  import { Button } from "antd";
  import { OliveModal } from "./OliveModal"; 
  import { useModalStore } from "@/store";
  
  const MyComponent = () => {
    const { set, toggle } = useModalStore();
  
    // Sync args with Zustand store
    useEffect(() => {
        set({
        open: false,
        title: "Sample Modal Title",
        body: "This is the modal body content passed via args.",
        width: 500,
        showCloseButton: true,
        clearPayloadOnClose:false
      });
    }, [set]);
  
    return (
      <div>
        <Button type="primary" onClick={toggle}>
          Toggle Modal
        </Button>
        <OliveModal />
      </div>
    );
  };`,
      },
    },
  },
} as Meta;

const DefaultTemplate: StoryFn = (args) => {
  const { set, toggle } = useModalStore();

  // Sync with Zustand store
  useEffect(
    () => {
      set({ ...args });
    },
     
    [args, set]
  );

  return (
    <div>
      <Button className="!bg-primary !text-[#FFF]" onClick={toggle}>
        Toggle Modal
      </Button>
      <OliveModal />
    </div>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {
  open: false,
  title: "Sample Modal Title",
  body: "This is the modal body content passed via args.",
  width: 500,
  showCloseButton: true,
};

const ClearFieldTemplate: StoryFn = (args) => {
  const { set, toggle } = useModalStore();

  // Sync with Zustand store
  const UserForm = (
    <OliveForm>
      <OliveField name="name" label="Name" />
      <OliveField name="email" label="Email" type="email" />
    </OliveForm>
  );
  useEffect(() => {
    set({ ...args, body: UserForm });
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [args, set]);

  return (
    <div className="flex flex-col gap-2">
      <span>
        The clearPayload property when set to{" "}
        <span className="font-bold">true</span>, clears all form field values on
        the modal content after closing the modal
      </span>
      <Button className={"w-[150px] !bg-primary !text-[#FFF]"} onClick={toggle}>
        Add User
      </Button>
      <OliveModal />
    </div>
  );
};

export const clearPayload = ClearFieldTemplate.bind({});
clearPayload.args = {
  open: false,
  title: "Add user",
  width: 500,
  showCloseButton: true,
  clearPayloadOnClose: true,
};
