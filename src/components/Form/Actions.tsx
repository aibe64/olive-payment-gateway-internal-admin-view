import { useTableActions } from "@/hooks";
import { Props } from "@/models";
import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { memo, useCallback, useMemo } from "react";

const Component = <T,>({
  actions,
  components,
  pageName,
}: Props.TableAction<T>) => {
  const { setActionModal } = useTableActions();

  const onClickAction = useCallback(
    (action: "View" | "Edit" | "Approve" | "Disapprove" | "Delete") => {
      switch (action) {
        case "Edit":
          setActionModal(components?.Edit ?? <></>, `${action} ${pageName}`);
          break;
        case "View":
          setActionModal(components?.View ?? <>N/A</>, `${pageName} details`);
          break;
        case "Approve":
          setActionModal(<ApproveForm />, `${action} ${pageName}`);
          break;
        case "Approve":
          setActionModal(<DisapproveForm />, `${action} ${pageName}`);
          break;
        case "Delete":
          setActionModal(<DeleteForm />, `${action} ${pageName}`);
          break;
        default:
          break;
      }
    },
    [components?.Edit, components?.View, pageName, setActionModal]
  );

  const items = useMemo((): MenuProps["items"] | undefined => {
    if (actions && Array.isArray(actions)) {
      const items: MenuProps["items"] = actions.reduce((acc, action, index) => {
        acc?.push({
          key: `${index + 1}`,
          label: (
            <button onClick={() => onClickAction(action)}>{action}</button>
          ),
        });
        if (index < actions.length - 1) {
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
      menu={{
        items,
      }}
      placement="bottomLeft"
      rootClassName="w-32 mt-20"
    >
      <EllipsisOutlined />
    </Dropdown>
  );
};

export const XpressTableActions = memo(Component);

XpressTableActions.displayName = "Xpress table actions";

export const DeleteForm = () => (
  <div>
    <span>Delete</span>
  </div>
);

export const ApproveForm = () => (
  <div>
    <span>Details</span>
  </div>
);

export const DisapproveForm = () => (
  <div>
    <span>Edit</span>
  </div>
);
