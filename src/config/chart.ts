import { PieConfig } from "@ant-design/plots";

export namespace OliveChart {
  export const colors = [
    "#FF6D00B2",
    "#CCCCCC",
    "#006F01B2",
    "#FF6D00B2",
    "#CCCCCC",
    "#006F01B2",
  ];

  export const config = (
    data:
      | {
          value: number;
          label: string;
        }[]
      | undefined
  ): PieConfig => {
    return {
      data,
      angleField: "title",
      colorField: "data",
      innerRadius: 0.6,
      label: {
        text: "title",
        style: {
          fontWeight: "bold",
        },
      },
      legend: {
        color: {
          title: false,
          position: "right",
          rowPadding: 5,
        },
      },
    } as PieConfig;
  };
}
