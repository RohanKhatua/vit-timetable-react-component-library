import React from "react";
import "./ViewTable.css";
import {
  headerRowTheoryEnd,
  headerRowTheoryStart,
  headerRowLabStart,
  headerRowLabEnd,
  theorySlotMap,
  labSlotMap,
  daysOfWeek,
} from "./constants";

export interface ViewTableProps {}

interface BlockHeaderProps {
  children: string;
}

interface CourseProps {
  code: string;
  slot: string;
  type: string;
  venue: string;
}

interface EmptyCourseProps {
  children: string;
}

interface dayOfWeekProps {
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

function CourseComponent({ code, slot, type, venue }: CourseProps) {
  var data: string = code + slot + type + venue;
  return <td className="course-component">{data}</td>;
}

function EmptyCourseComponent({ children }: EmptyCourseProps) {
  return <td className="empty-course">{children}</td>;
}

function FullDayComponent({ children }: dayOfWeekProps) {
  return (
    <>
      <tr>
        <BlockHeaderCategory>{children}</BlockHeaderCategory>
        <BlockHeaderSubCategory>{"Theory"}</BlockHeaderSubCategory>
        {theorySlotMap.get(children)?.map((slot, index) => (
          <EmptyCourseComponent key={index}>{slot}</EmptyCourseComponent>
        ))}
      </tr>
      <tr>
        <BlockHeaderSubCategory>{"Lab"}</BlockHeaderSubCategory>        
        {labSlotMap.get(children)?.map((slot, index) => (
          <EmptyCourseComponent key={index}>{slot}</EmptyCourseComponent>
        ))}
      </tr>
    </>
  );
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
          {headerRowLabStart.map((header, index) => (
            <BlockLabHeader key={index}>{header}</BlockLabHeader>
          ))}
        </tr>
        <tr>
          <BlockHeaderSubCategory>{`END`}</BlockHeaderSubCategory>
          {headerRowLabEnd.map((header, index) => (
            <BlockLabHeader key={index}>{header}</BlockLabHeader>
          ))}
        </tr>
      </thead>      
      <tbody>
        {daysOfWeek.map((day, index) => (
          <FullDayComponent key={index}>{day}</FullDayComponent>
        ))}
      </tbody>
    </table>
  );
};

export default ViewTable;
