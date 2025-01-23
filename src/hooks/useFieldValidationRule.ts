import { AppStorage, useFormStore } from "@/store";
import {
  APIResponse,
  APIResponseCode,
  AppStorageKeys,
  ValidateFetchConfig,
} from "@/models";
import { useFieldValidation } from "./";
import { useCallback } from "react";
import { AppConfig } from "@/config";

export const useFieldValidationRule = (config?: ValidateFetchConfig) => {
  const { setFormState, setIsProcessing, validationStatusByFieldName } =
    useFormStore((state) => state);

  const phoneValidationRule = useFieldValidation(
    async (value: string): Promise<string | null> => {
      const phoneRegex = /^\d{10}$/;
      if (!value || phoneRegex.test(value)) {
        if (config?.validateNetworkNumber && config.network) {
          const { network } = config;
          if (network?.toLowerCase()?.includes("mtn")) {
            const mtnRegex =
              /^(234|0)(803|806|810|813|814|816|903|906|706|703)(\d{7})$/;
            if (!mtnRegex.test(`0${value}`)) {
              return "Input a valid MTN number";
            }
          } else if (network?.toLowerCase()?.includes("airtel")) {
            const airtelRegex =
              /^(234|0)701(\d{7})$|^(234|0)702(\d{7})$|^(234|0)708(\d{7})$|^(234|0)802(\d{7})$|^(234|0)808(\d{7})$|^(234|0)812(\d{7})$|^(234|0)901(\d{7})$|^(234|0)902(\d{7})$|^(234|0)904(\d{7})$|^(234|0)907(\d{7})$|^(234|0)912(\d{7})$|^(234|0)911(\d{7})$/;
            if (!airtelRegex.test(`0${value}`)) {
              return "Input a valid Airtel number";
            }
          } else if (network?.toLowerCase()?.includes("glo")) {
            const gloRegex =
              /^(234|0)705(\d{7})$|^(234|0)805(\d{7})$|^(234|0)807(\d{7})$|^(234|0)811(\d{7})$|^(234|0)815(\d{7})$|^(234|0)905(\d{7})$|^(234|0)915(\d{7})$/;
            if (!gloRegex.test(`0${value}`)) {
              return "Input a valid Glo number";
            }
          } else if (network?.toLowerCase()?.includes("9mobile")) {
            const nineMobileRegex =
              /^(234|0)809(\d{7})$|^(234|0)817(\d{7})$|^(234|0)818(\d{7})$|^(234|0)907(\d{7})$|^(234|0)908(\d{7})$|^(234|0)909(\d{7})$/;
            if (!nineMobileRegex.test(`0${value}`)) {
              return "Input a valid 9mobile number";
            }
          }
        }
        return null;
      }
      return "Please input a valid phone number (10 digits)";
    }
  );

  const validateOnlyNumberRule = useFieldValidation(
    async (value: string): Promise<string | null> => {
      const onlyNumberRegex = /^\d+$/;
      if (!value || onlyNumberRegex.test(value)) {
        return null;
      }
      return "Only numbers are accepted";
    }
  );

  const validateBinRule = useFieldValidation(
    async (value: string): Promise<string | null> => {
      const onlyNumberRegex = /^\d+$/;
      const onlySixToEightRegex = /^\d{6,8}$/;
      if (!value || !onlyNumberRegex.test(value)) {
        return "Only numbers are accepted";
      }else if(!value || onlySixToEightRegex.test(value)){
        return null
      }
      return "Please enter the first 6 to 8 digits of the credit card number";
    }
  );

  const validateUrlRule = useFieldValidation(
    async (value: string): Promise<string | null> => {
      const urlRegex =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(:\d{1,5})?(\/[^\s]*)?$/;
      if (!value || urlRegex.test(value)) {
        return null;
      }
      return "Please enter a correct URL format";
    }
  );

  const validateRangeAmountRule = useFieldValidation(
    async (value: string): Promise<string | null> => {
      value = value?.replace(/,/g, "");
      if (!Number.isNaN(parseFloat(value)) && config?.max && config.min) {
        const amount = parseFloat(value);
        if (amount > config.max || amount < config.min) {
          return `Please enter an amount outside the range of ${config?.min} to ${config?.max}.`;
        } else {
          return null;
        }
      } else if (config?.max && config.min) {
        return `Please enter an amount outside the range of ${config?.min} to ${config?.max}.`;
      } else {
        return "Invalid Amount";
      }
    }
  );

  const emailValidationRule = useFieldValidation(
    async (value: string): Promise<string | null> => {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!value || emailRegex.test(value)) {
        return null;
      }
      return "Please input a valid email address";
    }
  );

  const validateOnlyAlphabetRule = useFieldValidation(
    async (value: string): Promise<string | null> => {
      const onlyAlphabetRegex = /\d/;
      if (!value || onlyAlphabetRegex.test(value)) {
        return null;
      }
      return "Please this field should not contain a number";
    }
  );

  const updateValidatingStatusByFieldName = useCallback(
    (
      fieldName: string,
      status: "" | "success" | "warning" | "error" | "validating" | undefined
    ) => {
      return validationStatusByFieldName?.map((item) =>
        item.fieldName === fieldName ? { ...item, status } : { ...item }
      );
    },
    [validationStatusByFieldName]
  );

  const validateValueIfItExistOnDB = useCallback(
    async (value: string, fieldName: string): Promise<boolean> => {
      let isValid = false;
      if (value && config) {
        if (
          (!config.queryValidationCriteria?.isNewlyCreatedValue &&
            config.queryValidationCriteria?.createdValue?.toLowerCase() !==
              value?.toLowerCase()) ||
          config.queryValidationCriteria?.isNewlyCreatedValue
        ) {
          setFormState(
            "validationStatusByFieldName",
            updateValidatingStatusByFieldName(fieldName, "validating")
          );
          await fetch(`${AppConfig.API_BASE_URL}${config.apiUrl}${value}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${AppStorage.getItem(
                AppStorageKeys.Token
              ) as string}`,
            },
          })
            .then(async (response) => {
              const result = await response.json();
              if (result.responseCode === APIResponseCode.Success) {
                setFormState(
                  "validationStatusByFieldName",
                  updateValidatingStatusByFieldName(fieldName, "success")
                );
                isValid = true;
              } else {
                setFormState(
                  "validationStatusByFieldName",
                  updateValidatingStatusByFieldName(fieldName, "error")
                );
              }
            })
            .catch(() => {
              setFormState(
                "validationStatusByFieldName",
                updateValidatingStatusByFieldName(fieldName, "error")
              );
            })
            .finally(() => setIsProcessing(false));
        }else{
          setFormState("validationStatusByFieldName", [
            ...(validationStatusByFieldName || []),
            { fieldName: fieldName, status: "success" },
          ]);
        }
      }
      return isValid;
    },
    [setFormState, setIsProcessing, validationStatusByFieldName, updateValidatingStatusByFieldName]
  );

  const setFieldValueValidation = useCallback(
    async (name: string, value: string) => {
      const isValid = await validateValueIfItExistOnDB(value, name);
      if (isValid) {
        setFormState(
          "validationStatusByFieldName",
          updateValidatingStatusByFieldName(name, "success")
        );
      }
    },
    []
  );

  const bvnIsValidate = useCallback(
    async (value: string, fieldName: string): Promise<boolean> => {
      // Regular expression for checking if there are no alphabets and maximum 11 characters
      const bvnRegex = /^[0-9]{11,11}$/;
      if (!value || bvnRegex.test(value)) {
        if (config) {
          let bvnIsValid: boolean = false;
          let payload = {};
          if (value) {
            setFormState(
              "validationStatusByFieldName",
              updateValidatingStatusByFieldName(fieldName, "validating")
            );
            setIsProcessing(true);
            await fetch(`${config.apiUrl}${value}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then(async (response) => {
                const result: APIResponse.API<any> = await response.json();
                if (!response.ok || result.data === null) {
                  bvnIsValid = false;
                  setFormState(
                    "validationStatusByFieldName",
                    updateValidatingStatusByFieldName(fieldName, "error")
                  );
                } else {
                  bvnIsValid = true;
                  //setFormState("validatingStatus", "success");
                  config.fieldKeysToUpdateFromAPIresponse?.forEach((key) => {
                    const responseKey = key.apiResponseKey;
                    payload = {
                      ...payload,
                      bvn: value,
                      [key.fieldKey]:
                        (result.data?.[responseKey] as string)?.replace(
                          /^0/,
                          ""
                        ) || undefined,
                    };
                  });
                  setFormState("fieldKeysToUpdateFromAPIresponse", payload);
                }
              })
              .catch(() => {
                bvnIsValid = false;
                setFormState(
                  "validationStatusByFieldName",
                  updateValidatingStatusByFieldName(fieldName, "error")
                );
              })
              .finally(() => setIsProcessing(false));
          }
          const validatingStatus = validationStatusByFieldName?.filter(
            (item) => item.fieldName === fieldName
          )[0].status;
          return bvnIsValid || validatingStatus === "success";
        } else {
          return true;
        }
      } else {
        setFormState(
          "validationStatusByFieldName",
          updateValidatingStatusByFieldName(fieldName, "error")
        );
      }
      return false;
    },
    [config, setFormState, setIsProcessing, validationStatusByFieldName]
  );

  const getPasswordStrength = (password: string) => {
    if (!password) return 0;
    const strength = calculatePasswordStrength(password);
    return strength;
  };

  const calculatePasswordStrength = (password: string): number => {
    if (password?.length === 0) return 0;

    // Calculate password strength based on various criteria
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    const passwordLength = password?.length;

    let strength = 0;

    // Adjust strength based on criteria
    if (passwordLength < 8 && passwordLength > 1) {
      strength = 10;
    } else if (passwordLength >= 8) {
      if (hasUppercase) strength += 20;
      if (hasLowercase) strength += 20;
      if (hasNumber) strength += 20;
      if (hasSpecialChar) strength += 20;
      if (passwordLength >= 10) strength += 20;
    } else {
      strength = 0;
    }

    return strength;
  };

  const getPasswordStrengthLabel = (password: string) => {
    if (!password) return "";
    const strength = getPasswordStrength(password);
    if (strength === 0) return "Very Weak";
    if (strength < 40) return "Weak";
    if (strength < 60) return "Medium";
    if (strength < 80) return "Strong";
    return "Very Strong";
  };

  return {
    phoneValidationRule,
    emailValidationRule,
    bvnIsValidate,
    getPasswordStrength,
    getPasswordStrengthLabel,
    validateOnlyAlphabetRule,
    validateOnlyNumberRule,
    validateRangeAmountRule,
    validateUrlRule,
    validateValueIfItExistOnDB,
    updateValidatingStatusByFieldName,
    setFieldValueValidation,
    validateBinRule
  };
};
