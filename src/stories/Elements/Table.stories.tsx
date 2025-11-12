import { Meta, StoryFn } from "@storybook/react/types-6-0";
import { OliveTable } from "@/components";
import { APIResponse, Props } from "@/models";
import "../../index.css";
import { userDataColumns } from "@/features/Merchant/Columns";
import { useEffect, useState } from "react";

// Define metadata for the story
export default {
  title: "Elements/Table",
  component: OliveTable,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} as Meta;

// Define a template for the story
const Template: StoryFn<Props.TableData<APIResponse.User>> = (
  args: Props.TableData<APIResponse.User>
) => {
  return <OliveTable<APIResponse.User> {...args} />;
};

// Define a template for the story
const TemplateWithAPICall: StoryFn<Props.TableData<APIResponse.User>> = (
  args: Props.TableData<APIResponse.User>
) => {
  const [dataSource, setDataSource] = useState<APIResponse.User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/mock/user.json");
        const apiResponse = await response.json();
        setDataSource(apiResponse?.data);
      } catch {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <OliveTable<APIResponse.User>
      {...args}
      dataSource={dataSource}
      spinning={loading}
    />
  );
};

// Default Button story
export const Default = Template.bind({});
Default.args = {
  dataSource: [], // Initially empty, data will be loaded via API call
  columns: userDataColumns,
  emptyHeadingText: "No Data",
  emptyParagraphText: "There are no data created yet.",
  spinning: false,
};

// Loading state
export const Loading = Template.bind({});
Loading.args = {
  columns: userDataColumns,
  spinning: true,
};

// DataSource story with fetched data
export const DataSource = TemplateWithAPICall.bind({});
DataSource.args = {
  dataSource: [],
  columns: userDataColumns,
  emptyHeadingText: "No Data",
  emptyParagraphText: "There are no data created yet.",
};
