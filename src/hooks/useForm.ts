import { useFormStore } from "@/store";
import { Form } from "antd";
import { useCallback, useEffect } from "react";

export const useAppForm = () => {
  const [form] = Form.useForm();
  const { payload, setFormState, fields } = useFormStore();

  const checkFormValidation = useCallback(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => {
        setFormState("submitForm", true);
      })
      .catch((error) => {
        if (Array.isArray(error.errorFields) && error.errorFields?.length) {
          setFormState("submitForm", false);
        }
      });
  }, [ form, setFormState, payload]);

  useEffect(() => {
    checkFormValidation();
  }, [checkFormValidation]);

  useEffect(() => {
    setFormState("form", form);
  }, [form, setFormState]);

  return {
    form,
    fields,
    payload,
  };
};
