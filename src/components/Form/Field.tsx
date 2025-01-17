import { Props } from "@/models";
import {
  Checkbox,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Progress,
  Select,
} from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  DownOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import React, { useCallback, useEffect } from "react";
import { useFormStore } from "@/store";
import { useFieldValidationRule } from "@/hooks";
import { NgnFlag } from "@/assets";
import { isObject } from "@/lib";

export const XpressField: React.FC<Props.Field> = ({
  name,
  required,
  label,
  classNames,
  type,
  formClassNames,
  labelClassNames,
  items,
  dropDownItems,
  hasFeedback,
  help,
  validateStatus,
  isAmountField,
  defaultValue,
  checkboxChildren,
  onBlur,
  onSearch,
  maxLength,
  minLength,
  validate,
  searchText,
  confirmPassword,
  readonly,
  defaultCountryFlag,
  defaultCountryCode,
  placeholder,
  suffix,
  prefix,
  telHeight,
  validator,
  addonBefore,
  showCount,
  showPasswordMeter,
  validatorFetchConfig,
  onSelectDropDownCallBack,
  onOpenDropDown,
  loading,
  disabledDate,
  onChange,
}) => {
  const { payload, setPayload, setFormState, validationStatusByFieldName } =
    useFormStore();
  const {
    phoneValidationRule,
    bvnIsValidate,
    validateValueIfItExistOnDB,
    validateOnlyAlphabetRule,
    emailValidationRule,
    getPasswordStrength,
    getPasswordStrengthLabel,
    validateOnlyNumberRule,
    validateRangeAmountRule,
    validateUrlRule,
    updateValidatingStatusByFieldName,
  } = useFieldValidationRule(validatorFetchConfig);

  const validatingStatus:
    | ""
    | "success"
    | "warning"
    | "error"
    | "validating"
    | undefined = validationStatusByFieldName?.filter(
    (item) => item.fieldName === name
  )[0]?.status;

  const onChangeValue = useCallback(
    async (value: string) => {
      if (onChange) {
        onChange(value);
      } else {
        if (validatorFetchConfig?.removeValueSpaces)
          value = value.replace(/\s+/g, "");
        if (isAmountField) {
          setPayload(
            name,
            value
              ?.toString()
              .replace(/[^\d.]/g, "") // Allow digits and decimal point only
              .replace(/^(\d*\.?)|(\d*)\.?/g, "$1$2") // Allow only one decimal point
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          );
        } else {
          if (validator === "exist_on_db") {
            const isValid = await validateValueIfItExistOnDB(value, name);
            if (isValid) {
              setFormState(
                "validationStatusByFieldName",
                updateValidatingStatusByFieldName(name, "success")
              );
            }
          }
          setPayload(name, value);
        }
      }
    },
    [setPayload, validateValueIfItExistOnDB, name, payload]
  );

  useEffect(() => {
    if ((validator === "bvn" || validator === "exist_on_db") && name) {
      const validatingStatus = validationStatusByFieldName?.filter(
        (item) => item.fieldName === name
      );
      if (!validatingStatus?.length) {
        setFormState("validationStatusByFieldName", [
          ...(validationStatusByFieldName || []),
          { fieldName: name, status: undefined },
        ]);
      }
    }
  }, [name, validator, validationStatusByFieldName]);

  return (
    <Form.Item
      key={name}
      label={
        label && (
          <span className={`font-normal ${labelClassNames}`}>{label}</span>
        )
      }
      name={name}
      rules={[
        validator === "email"
          ? emailValidationRule
          : validator === "onlyNumber"
          ? validateOnlyNumberRule
          : validator === "phone"
          ? phoneValidationRule
          : validator === "url"
          ? validateUrlRule
          : validator === "amountRange"
          ? validateRangeAmountRule
          : validator === "onlyAphabet"
          ? validateOnlyAlphabetRule
          : { required: required, message: "" },
        validate
          ? { validator: validate }
          : {
              required: required,
              message: "",
            },
        validator === "bvn"
          ? () => ({
              async validator(_, value) {
                const isBVN = await bvnIsValidate(`${value}`, name);
                if (isBVN) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Please input a valid BVN "));
              },
            })
          : validator === "exist_on_db"
          ? () => ({
              async validator() {
                if (validatingStatus === "success") {
                  return Promise.resolve();
                }
                return Promise.reject(new Error());
              },
            })
          : { required: required, message: "" },
        confirmPassword?.passwordkey
          ? ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  !value ||
                  getFieldValue(confirmPassword?.passwordkey) === value
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match."));
              },
            })
          : { required: required, message: "" },
      ]}
      validateStatus={
        name === "bvn" && payload?.bvn && payload?.bvn?.length < 11
          ? ""
          : validator === "exist_on_db" || validator === "bvn"
          ? validatingStatus
          : ""
      }
      hasFeedback={hasFeedback}
      help={help}
      className={formClassNames}
    >
      {type === "password" ? (
        <div className="flex flex-col gap-1">
          <Input.Password
            minLength={minLength}
            defaultValue={defaultValue}
            placeholder={placeholder}
            onChange={(e) => setPayload(name, e.target.value)}
            className={`rounded-lg p-3 border-[1px] border-[#E8E8E8] ${classNames}`}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          {showPasswordMeter && (
            <div>
              <Progress
                style={{ width: "90%" }}
                percent={getPasswordStrength(
                  isObject(payload) ? payload[name] : ""
                )}
                status={
                  getPasswordStrength(isObject(payload) ? payload[name] : "") >=
                  80
                    ? "success"
                    : getPasswordStrength(
                        isObject(payload) ? payload[name] : ""
                      ) >= 60
                    ? "active"
                    : getPasswordStrength(
                        isObject(payload) ? payload[name] : ""
                      ) < 40
                    ? "exception"
                    : "normal"
                }
                format={() => (
                  <span>
                    {getPasswordStrengthLabel(
                      isObject(payload) ? payload[name] : ""
                    )}
                  </span>
                )}
              />
            </div>
          )}
        </div>
      ) : type === "select" ? (
        <Select
          className={`rounded-lg h-[45px] ${classNames}`}
          placeholder={placeholder}
          disabled={readonly}
          loading={loading}
          onChange={(e) => {
            setPayload(name, e);
            if (onSelectDropDownCallBack) onSelectDropDownCallBack(e);
          }}
        >
          {items &&
            items?.map((x) => (
              <Select.Option value={x.value} key={x.value}>
                {x.label}
              </Select.Option>
            ))}
        </Select>
      ) : type === "date" ? (
        <DatePicker
          className={`rounded-lg p-3 ${classNames}`}
          placeholder={placeholder}
          onChange={(date) => setPayload(name, date)}
          disabledDate={disabledDate}
          disabled={readonly}
        />
      ) : type === "search" ? (
        <Input.Search
          maxLength={maxLength}
          onSearch={onSearch}
          minLength={minLength}
          className={`rounded-lg p-3 ${classNames}`}
          enterButton={searchText}
          size="large"
          loading={validateStatus === "validating"}
          placeholder={placeholder}
          onChange={(e) => setPayload(name, e.target.value)}
        />
      ) : type === "tel" ? (
        <>
          {/* <label className="">{label}</label> */}
          <div className="flex gap-4">
            <div
              className={`border-[1px] flex py-2 px-4 rounded-lg p-3 gap-2 items-center justify-center h-[${telHeight}] cursor-pointer`}
            >
              <img src={defaultCountryFlag ?? NgnFlag} alt="" />
              <span className="font-semibold">
                {defaultCountryCode ?? "+234"}
              </span>
            </div>
            <Input
              placeholder={placeholder}
              className={`rounded-lg p-3 border-[1px]  ${classNames} h-[${telHeight}]`}
              type={"text"}
              maxLength={10}
              onChange={(e) => setPayload(name, e.target.value)}
              value={payload ? payload[name] : ""}
              readOnly={readonly}
              required={required}
            />
          </div>
        </>
      ) : type === "checkbox" ? (
        <Checkbox
          checked={payload ? payload[name] : false}
          onChange={(e) => setPayload(name, e.target.checked)}
        >
          {checkboxChildren}
        </Checkbox>
      ) : type === "dropdown" ? (
        <Dropdown
          onOpenChange={onOpenDropDown}
          trigger={["click"]}
          menu={{
            items: dropDownItems,
            selectable: true,
            onSelect: (value: any) => {
              setPayload(name, value.item?.props?.value);
              if (onSelectDropDownCallBack)
                onSelectDropDownCallBack(value.item?.props?.value);
            },
          }}
        >
          <div
            className={`${classNames} flex justify-between border-gray-200 border-[1px] h-[50px] p-3 rounded-lg cursor-pointer hover:!border-[#2A8851]`}
          >
            <span>{payload ? payload[name] : placeholder ?? "Select"}</span>
            {loading ? <LoadingOutlined /> : <DownOutlined />}
          </div>
        </Dropdown>
      ) : type === "text-area" ? (
        <Input.TextArea
          rows={3}
          showCount
          maxLength={maxLength}
          defaultValue={defaultValue}
          readOnly={readonly}
          placeholder={placeholder}
          onChange={(e) => setPayload(name, e.target.value)}
        />
      ) : (
        <Input
          className={`rounded-lg p-3 dark:bg-primary-dark border-[#d9d9d9] dark:border-[#424242]  ${classNames}`}
          type={type}
          onBlur={onBlur}
          maxLength={maxLength}
          defaultValue={defaultValue}
          minLength={minLength}
          readOnly={readonly}
          placeholder={placeholder}
          suffix={suffix}
          addonBefore={addonBefore}
          showCount={showCount}
          prefix={isAmountField ? "₦" : prefix}
          onChange={(e) => onChangeValue(e.target.value) as unknown}
        />
      )}
    </Form.Item>
  );
};
