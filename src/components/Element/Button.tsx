import { Button, Spin } from "antd";
import { motion } from "framer-motion";
import { Props } from "@/models";
import { useFormStore } from "@/store";
import { useAPI } from "@/hooks";

export const OliveButton = ({
  title,
  onClick,
  htmlType,
  block,
  classNames,
  loading,
  disabled,
  callApi,
  customApiConfigs,
}: Props.Button) => {
  const { isProcessing, submitForm } = useFormStore((state) => state);
  const { callGetData, callPostData } = useAPI({});

  const executeOnlick = () => {
    if (onClick && !callApi) {
      onClick();
    } else if (onClick && callApi) {
      if (customApiConfigs?.method === "GET") {
        callGetData(
          customApiConfigs.endpoint,
          customApiConfigs.callBackFunction
        );
      } else if (customApiConfigs?.method === "POST") {
        callPostData({
          url: customApiConfigs.endpoint,
          customRequest: customApiConfigs.customPayload,
          callBackApiResponse: customApiConfigs.callBackFunction,
        });
      }
    }
  };

  return (
    <>
      {htmlType === "link" ? (
        isProcessing ? (
          <>
            <Spin size="small" className="ml-2" />
          </>
        ) : (
          <a className={classNames} onClick={executeOnlick}>
            {title}
          </a>
        )
      ) : (
        <motion.div whileHover={{ scale: 1.0 }} whileTap={{ scale: 0.95 }}>
          <Button
            type="primary"
            htmlType={htmlType === "submit" ? "submit" : "button"}
            disabled={disabled || (htmlType === "submit" && !submitForm)}
            className={`${classNames} border-[#006F01] disabled:bg-[#E5E7E8] disabled:hover:scale-100 disabled:hover:border-[#E5E7E8] 
            disabled:hover:bg-[#E5E7E8!important] disabled:hover:text-[#ffffff!important] text-[#ffffff!important] hover:scale-105 
            transition-all flex items-center justify-center py-6`}
            block={block}
            onClick={executeOnlick}
            loading={loading || isProcessing}
          >
            {title}
          </Button>
        </motion.div>
      )}
    </>
  );
};

export const SubmitButton: React.FC<Props.SubmitButton> = ({
  title,
  classNames,
  form,
  loading,
  customApiConfigs,
  disabled
}) => {
  const { isProcessing } = useFormStore((state) => state);
  return (
    <OliveButton
      title={title}
      block={true}
      htmlType="submit"
      classNames={classNames}
      form={form}
      loading={loading || isProcessing}
      customApiConfigs={customApiConfigs}
      disabled={disabled}
    />
  );
};

export const Link: React.FC<Props.SubmitButton> = ({
  title,
  classNames,
  form,
  loading,
  callApi,
  onClick,
  customApiConfigs,
}) => {
  const { isProcessing } = useFormStore((state) => state);
  return (
    <OliveButton
      title={title}
      block={true}
      htmlType="link"
      onClick={onClick}
      callApi={callApi}
      classNames={classNames}
      form={form}
      loading={loading || isProcessing}
      customApiConfigs={customApiConfigs}
    />
  );
};

export const Primary: React.FC<Props.SubmitButton> = ({
  title,
  classNames,
  loading,
  onClick,
}) => {
  return (
    <motion.div whileHover={{ scale: 1.0 }} whileTap={{ scale: 0.95 }}>
      <Button
        htmlType="button"
        className={`${classNames} border-[#006F01] disabled:bg-[#E5E7E8] disabled:hover:scale-100 disabled:hover:border-[#E5E7E8] 
    disabled:hover:bg-[#E5E7E8!important] disabled:hover:text-[#ffffff!important] text-[#ffffff!important] hover:scale-105 
    transition-all flex items-center justify-center py-6`}
        onClick={onClick}
        loading={loading}
      >
        {title}
      </Button>
    </motion.div>
  );
};

OliveButton.Submit = SubmitButton;
OliveButton.Link = Link;
