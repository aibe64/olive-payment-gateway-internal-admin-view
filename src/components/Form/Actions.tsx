import { ActionIcon } from "@/assets";
import { useTableActions } from "@/hooks";
import { ActionDetails, Props } from "@/models";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button, Divider, Dropdown, MenuProps, Typography } from "antd";
import { FC, memo, useCallback, useMemo } from "react";
import { XpressButton } from "../Element";

const Component = <T,>({
  actions,
  components,
  pageName,
  details,
}: Props.TableAction<T>) => {
  const { setActionModal } = useTableActions({});

  const onClickAction = useCallback(
    (
      action:
        | "View"
        | "Edit"
        | "Approve"
        | "Disapprove"
        | "Delete"
        | "Activate"
        | "Deactivate"
        | "Others"
        | "Download"
        | "Status"
        | "Custom"
        | "none"
        | "Update"
    ) => {
      const actionDetails = details?.find((item) => item.name === action);
      switch (action) {
        case "Edit":
        case "Update":
          const editWidth = actions.filter((item) => item.action === action)[0]
            ?.modalWidth;
          setActionModal(
            components?.Edit ?? <></>,
            <Typography className="text-[1.2rem] font-bold">{`${action} ${pageName}`}</Typography>,
            editWidth ?? 450
          );
          break;
        case "View":
          const width = actions.filter((item) => item.action === action)[0]
            ?.modalWidth;
          setActionModal(
            components?.View ?? <>N/A</>,
            <Typography className="font-bold text-[1.2rem]">{`${pageName} Details`}</Typography>,
            width ?? 450
          );
          break;
        case "Custom":
          const details = actions.find((item) => item.action === action);
          setActionModal(
            components?.Custom ?? <>N/A</>,
            <Typography className="font-bold text-[1.2rem]">
              {details?.title}
            </Typography>,
            details?.modalWidth ?? 450
          );
          break;
        case "Approve":
          setActionModal(
            <ApproveForm {...actionDetails} />,
            `${action} ${pageName}`,
            350
          );
          break;
        case "Disapprove":
          setActionModal(
            <DisapproveForm {...actionDetails} />,
            `${action} ${pageName}`,
            350
          );
          break;
        case "Delete":
          setActionModal(
            <DeleteForm {...actionDetails} />,
            `${action} ${pageName}`,
            350
          );
          break;
        case "Deactivate":
          setActionModal(
            <DeactivateForm {...actionDetails} />,
            `${action} ${pageName}`,
            350
          );
          break;
        case "Activate":
          setActionModal(
            <ActivateForm {...actionDetails} />,
            `${action} ${pageName}`,
            350
          );
          break;
        default:
          const actionName = actions.filter((item) => item.action === action)[0]
            ?.title;
          setActionModal(
            <OtherForm {...actionDetails} actionName={actionName} />,
            `${actionName}`,
            350
          );
          break;
      }
    },
    [
      components?.Edit,
      components?.View,
      pageName,
      setActionModal,
      details,
      actions,
    ]
  );

  const items = useMemo((): MenuProps["items"] | undefined => {
    if (actions && Array.isArray(actions)) {
      const items: MenuProps["items"] = actions.reduce((acc, action, index) => {
        if (action.action !== "none")
          acc?.push({
            key: `${index + 1}`,
            label: (
              <div className="w-[200px">
                {action.action === "Download" && components?.Download ? (
                  <PDFDownloadLink
                    document={components?.Download}
                    fileName={action?.downloadName}
                    style={{ textDecoration: "none" }}
                  >
                    <button className="w-full">{action.title}</button>
                  </PDFDownloadLink>
                ) : (
                  <button
                    className="w-full"
                    onClick={() => onClickAction(action.action)}
                  >
                    {action.title}
                  </button>
                )}
              </div>
            ),
          });
        if (index < actions.length - 1 && action.action !== "none") {
          acc?.push({ type: "divider" });
        }

        return acc;
      }, [] as MenuProps["items"]);

      return items;
    }
    return undefined;
  }, [onClickAction, actions]);

  return (
    <Dropdown
      trigger={["hover"]}
      menu={{
        items,
      }}
      placement="bottomLeft"
      rootClassName="w-32 mt-20"
    >
      <div className="w-8">
        {" "}
        <img src={ActionIcon} alt="" className="" />
      </div>
    </Dropdown>
  );
};

export const XpressTableActions = memo(Component);

XpressTableActions.displayName = "Xpress table actions";

export const DeleteForm: FC<ActionDetails> = ({
  actionFor,
  endpoint,
  onCallBackAPI,
}) => {
  const { processing, callActionApi, handleClose } = useTableActions({
    endpoint,
    onCallBackAPI,
  });
  return (
    <div className="flex flex-col">
      <Typography className="text-center">
        Are you sure you want to delete{" "}
        <Typography className="text-tertiary font-bold">
          {actionFor}?
        </Typography>
      </Typography>
      <Divider className="mt-3 mb-3" />
      <div className="flex justify-end gap-2">
        <Button
          onClick={handleClose}
          className="!bg-[#fff] !text-[#1a1818] !py-2 !border-[#808080] transition-all duration-500 hover:w-[65px]"
        >
          No
        </Button>
        <XpressButton
          onClick={callActionApi}
          classNames="!py-2"
          title="Yes"
          loading={processing}
        />
      </div>
    </div>
  );
};

export const ApproveForm: FC<ActionDetails> = ({
  actionFor,
  endpoint,
  onCallBackAPI,
  payload,
}) => {
  const { processing, callActionApi, handleClose } = useTableActions({
    endpoint,
    onCallBackAPI,
    payload,
  });
  return (
    <div className="flex flex-col">
      <Typography className="text-center">
        Are you sure you want to approve{" "}
        <Typography className="text-tertiary font-bold">
          {actionFor}?
        </Typography>
      </Typography>
      <Divider className="mt-3 mb-3" />
      <div className="flex justify-end gap-2">
        <Button
          onClick={handleClose}
          className="!bg-[#fff] !text-[#1a1818] !py-2 !border-[#808080] transition-all duration-500 hover:w-[65px]"
        >
          No
        </Button>
        <XpressButton
          onClick={callActionApi}
          classNames="!py-2"
          title="Yes"
          loading={processing}
        />
      </div>
    </div>
  );
};

export const DisapproveForm: FC<ActionDetails> = ({
  actionFor,
  endpoint,
  onCallBackAPI,
  payload,
}) => {
  const { processing, callActionApi, handleClose } = useTableActions({
    endpoint,
    onCallBackAPI,
    payload,
  });
  return (
    <div className="flex flex-col">
      <Typography className="text-center">
        Are you sure you want to disapprove{" "}
        <Typography className="text-tertiary font-bold">
          {actionFor}?
        </Typography>
      </Typography>
      <Divider className="mt-3 mb-3" />
      <div className="flex justify-end gap-2">
        <Button
          onClick={handleClose}
          className="!bg-[#fff] !text-[#1a1818] !py-2 !border-[#808080] transition-all duration-500 hover:w-[65px]"
        >
          No
        </Button>
        <XpressButton
          onClick={callActionApi}
          classNames="!py-2"
          title="Yes"
          loading={processing}
        />
      </div>
    </div>
  );
};

export const OtherForm: FC<ActionDetails> = ({
  actionFor,
  endpoint,
  onCallBackAPI,
  actionName,
  payload,
}) => {
  const { processing, callActionApi, handleClose } = useTableActions({
    endpoint,
    onCallBackAPI,
    payload,
  });
  return (
    <div className="flex flex-col">
      <Typography className="text-center">
        Are you sure you want to {actionName?.toLowerCase()}{" "}
        <Typography className="text-tertiary font-bold">
          {actionFor}?
        </Typography>
      </Typography>
      <Divider className="mt-3 mb-3" />
      <div className="flex justify-end gap-2">
        <Button
          onClick={handleClose}
          className="!bg-[#fff] !text-[#1a1818] !py-2 !border-[#808080] transition-all duration-500 hover:w-[65px]"
        >
          No
        </Button>
        <XpressButton
          onClick={callActionApi}
          classNames="!py-2"
          title="Yes"
          loading={processing}
        />
      </div>
    </div>
  );
};

export const ActivateForm: FC<ActionDetails> = ({
  actionFor,
  endpoint,
  onCallBackAPI,
}) => {
  const { processing, callActionApi, handleClose } = useTableActions({
    endpoint,
    onCallBackAPI,
  });
  return (
    <div className="flex flex-col">
      <Typography className="text-center">
        Are you sure you want to activate{" "}
        <Typography className="text-tertiary font-bold">
          {actionFor}?
        </Typography>
      </Typography>
      <Divider className="mt-3 mb-3" />
      <div className="flex justify-end gap-2">
        <Button
          onClick={handleClose}
          className="!bg-[#fff] !text-[#1a1818] !py-2 !border-[#808080] transition-all duration-500 hover:w-[65px]"
        >
          No
        </Button>
        <XpressButton
          onClick={callActionApi}
          classNames="!py-2"
          title="Yes"
          loading={processing}
        />
      </div>
    </div>
  );
};

export const DeactivateForm: FC<ActionDetails> = ({
  actionFor,
  endpoint,
  onCallBackAPI,
}) => {
  const { processing, callActionApi, handleClose } = useTableActions({
    endpoint,
    onCallBackAPI,
  });
  return (
    <div className="flex flex-col">
      <Typography className="text-center">
        Are you sure you want to deactivate{" "}
        <Typography className="text-tertiary font-bold">
          {actionFor}?
        </Typography>
      </Typography>
      <Divider className="mt-3 mb-3" />
      <div className="flex justify-end gap-2">
        <Button
          onClick={handleClose}
          className="!bg-[#fff] !text-[#1a1818] !py-2 !border-[#808080] transition-all duration-500 hover:w-[65px]"
        >
          No
        </Button>
        <XpressButton
          onClick={callActionApi}
          classNames="!py-2"
          title="Yes"
          loading={processing}
        />
      </div>
    </div>
  );
};
