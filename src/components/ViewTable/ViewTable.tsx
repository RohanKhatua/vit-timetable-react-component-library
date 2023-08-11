import React from "react";
import "./ViewTable.css";
import { headerRowTheoryEnd, headerRowTheoryStart } from "./constants";

export interface ViewTableProps {}

interface BlockHeaderProps {
  children: string;
}

function BlockHeaderCategory({ children }: BlockHeaderProps) {
  return (
    <td rowSpan={2} className="header-category">
      {children}
    </td>
  );
}

function BlockHeaderSubCategory({ children }: BlockHeaderProps) {
  return (
    <td colSpan={2} className="header-subcategory">
      {children}
    </td>
  );
}

function BlockTheoryHeader({ children }: BlockHeaderProps) {
  return <td className="theory-header">{children}</td>;
}

function BlockLabHeader({ children }: BlockHeaderProps) {
  return <td className="lab-header">{children}</td>;
}

const ViewTable = ({}: ViewTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <BlockHeaderCategory>{`THEORY`}</BlockHeaderCategory>
          <BlockHeaderSubCategory>{`START`}</BlockHeaderSubCategory>
          {headerRowTheoryStart.map((header, index) => (
            <BlockTheoryHeader key={index}>{header}</BlockTheoryHeader>
          ))}
        </tr>
        <tr>
          <BlockHeaderSubCategory>{`END`}</BlockHeaderSubCategory>
          {headerRowTheoryEnd.map((header, index) => (
            <BlockTheoryHeader key={index}>{header}</BlockTheoryHeader>
          ))}
        </tr>
        <tr>
          <BlockHeaderCategory>{`LAB`}</BlockHeaderCategory>
          <BlockHeaderSubCategory>{`START`}</BlockHeaderSubCategory>
          {/* {headerRowTheoryStart.map((header, index) => ())} */}
        </tr>
        <tr>
          <BlockHeaderSubCategory>{`END`}</BlockHeaderSubCategory>
        </tr>
      </thead>
    </table>
  );
};

export default ViewTable;
