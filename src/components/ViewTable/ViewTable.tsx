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

interface BlockHeaderProps {
  children: string;
}

export interface Course {
  code: string;
  slot: string;
  type: string;
  venue: string;
}

// An array of Course is passed to ViewTable
export interface ViewTableProps {
  children: Course[];
}

interface EmptyCourse {
  children: string;
}

interface dayOfWeekProps {
  day: string;
  slotToCourse: Map<string, Course>;
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

function CourseComponent({ code, slot, type, venue }: Course) {
  return (
    <td className="course-component">
      <div>{code}</div>
      <div>{slot}</div>
      <div>{type}</div>
      <div>{venue}</div>
    </td>
  );
}

function EmptyCourseComponent({ children }: EmptyCourse) {
  return <td className="empty-course">{children}</td>;
}

function FullDayComponent({ day, slotToCourse }: dayOfWeekProps) {
  return (
    <>
      <tr>
        <BlockHeaderCategory>{day}</BlockHeaderCategory>
        <BlockHeaderSubCategory>{"Theory"}</BlockHeaderSubCategory>
        {theorySlotMap.get(day)?.map((slot, index) => {
          if (slotToCourse.has(slot)) {
            const course = slotToCourse.get(slot);
            const code = course?.code || "";
            const type = course?.type || "";
            const venue = course?.venue || "";
            return (
              <CourseComponent
                code={code}
                slot={slot}
                type={type}
                venue={venue}
                key={index}
              ></CourseComponent>
            );
          } else
            return (
              <EmptyCourseComponent
                key={index}
                children={slot}
              ></EmptyCourseComponent>
            );
        })}
      </tr>
      <tr>
        <BlockHeaderSubCategory>{"Lab"}</BlockHeaderSubCategory>
        {labSlotMap.get(day)?.map((slot, index) => {
          if (slotToCourse.has(slot)) {
            const course = slotToCourse.get(slot);
            const code = course?.code || "";
            const type = course?.type || "";
            const venue = course?.venue || "";
            return (
              <CourseComponent
                code={code}
                slot={slot}
                type={type}
                venue={venue}
                key={index}
              ></CourseComponent>
            );
          } else
            return (
              <EmptyCourseComponent
                key={index}
                children={slot}
              ></EmptyCourseComponent>
            );
        })}
      </tr>
    </>
  );
}

const ViewTable = ({ children }: ViewTableProps) => {
  //create a map which maps the slot to the course
  var slotToCourse = new Map<string, Course>();

  for (const course of children) {
    slotToCourse.set(course.slot, course);
  }

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
          <FullDayComponent
            key={index}
            day={day}
            slotToCourse={slotToCourse}
          ></FullDayComponent>
        ))}
      </tbody>
    </table>
  );
};

export default ViewTable;
