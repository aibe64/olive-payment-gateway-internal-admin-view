import { XpressButton } from "@/components";
import { XpressField, XpressForm } from "@/components";
import { APIResponse } from "@/models";
import { FC } from "react";

export const UpdateUser: FC<{
  isCreateUser?: boolean;
  records?: APIResponse.User;
}> = ({ isCreateUser, records }) => {
  return (
    <XpressForm classNames="px-2 gap-0">
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
        <XpressField
          name="firstname"
          label="First name"
          placeholder="Enter first name"
          key={"1"}
          required
          value={records?.firstName}
          readonly={!isCreateUser}
        />
        <XpressField
          name="lastName"
          label="Last Name"
          placeholder="Enter last name"
          key={"1"}
          required
        />
      </div>
      <XpressField
        name="email"
        label="Email Address"
        type="email"
        validator="email"
        placeholder="Enter email address"
        key={"1"}
        required
      />
      <XpressButton.Submit title="Submit" />
    </XpressForm>
  );
};
