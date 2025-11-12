import { useDeviceType } from "@/hooks";
import { useModalStore, useFormStore } from "@/store";
import { Divider, Drawer, Modal } from "antd";
import { close_button, CloseIcon } from "@/assets";
import { memo, useCallback } from "react";
const Component = () => {
  const {
    closable,
    toggle,
    open,
    width,
    title,
    setModalState,
    clearPayloadOnClose,
    showCloseButton,
    body,
  } = useModalStore();
  const { setFormState, form } = useFormStore();
  const { isMobile } = useDeviceType();

  const onCloseButton = useCallback(() => {
    if (!clearPayloadOnClose) {
      setModalState("open", false);
    } else {
      setFormState("payload", undefined);
      form?.resetFields();
      setModalState("open", false);
    }
  }, [form, setFormState, clearPayloadOnClose, setModalState]);

  return !isMobile ? (
    <Modal
      open={open}
      onCancel={() => (closable ? toggle() : {})}
      width={width}
      closable={false}
      footer={null}
      centered={true}
      className="relative"
    >
      <section className={`flex flex-col gap-2 `}>
        <header className="flex justify-between items-center">
          <div className="">{title}</div>
          {showCloseButton && (
            <div
              className="cursor-pointer rounded-full p-1 border-[#ff0000] border-[1px] absolute top-5 right-4"
              onClick={onCloseButton}
            >
              <CloseIcon width={8} height={8} color={"red"} />
            </div>
          )}
        </header>
        <Divider className="w-[110%] -mx-[5%] mb-0 mt-0" />
        <main className="mt-2"> {body ?? <></>}</main>
      </section>
    </Modal>
  ) : (
    <Drawer
      placement={"bottom"}
      onClose={() => toggle()}
      open={open}
      closable={false}
      className="rounded-3xl"
    >
      <section className="flex flex-col gap-2">
        <header className="flex justify-between items-end">
          <div>{title}</div>
          {showCloseButton && (
            <img
              onClick={() => toggle()}
              src={close_button}
              alt=""
              width={25}
              className="cursor-pointer"
            />
          )}
        </header>
        <Divider
          className="absolute left-0 mt-6 top-[10%]"
          style={{ width: width }}
        />
        <main className="mt-5"> {body ?? <></>}</main>
      </section>
    </Drawer>
  );
};

export const OliveModal = memo(Component);
