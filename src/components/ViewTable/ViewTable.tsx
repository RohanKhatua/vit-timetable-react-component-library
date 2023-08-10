import React from "react";

export interface ViewTableProps {
  label: string;
}

const ViewTable = (props: ViewTableProps) => {
  return <button>{`${props.label}`}</button>;
};

export default ViewTable;
