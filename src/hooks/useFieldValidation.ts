import { Rule } from "antd/es/form/index";

export const useFieldValidation = (
  ...validators: ((value: any) => Promise<string | null>)[]
): Rule => {
  return {
    validator: async (_, value) => {
      for (const validator of validators) {
        const error = await validator(value);
        if (error !== null) {
          return Promise.reject(new Error(error));
        }
      }
      return Promise.resolve();
    },
  };
};
