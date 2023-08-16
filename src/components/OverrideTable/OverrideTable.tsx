import React from "react";
import "./OverrideTable.css";
import {
  headerRowTheoryStart,
  headerRowTheoryEnd,
  headerRowLabStart,
  headerRowLabEnd,
  theorySlotMap,
  labSlotMap,
  daysOfWeek,
} from "../ViewTable/constants";

import {
  BlockHeaderCategory,
  BlockHeaderSubCategory,
  BlockLabHeader,
  BlockTheoryHeader,
  CourseComponent,
  EmptyCourseComponent,
} from "../ViewTable/ViewTable";

interface OverrideCourseProp {
  day: string;
  slot: string;
  code: string;
  type: string;
  venue: string;
  CustomCourseComponent?: React.ReactNode | undefined;
}

export interface OverrideTableProps {
  children: OverrideCourseProp[];
}

interface uniqueCellIdentifier {
  day: string;
  slot: string;
}

interface OverrideFullDayComponentProps {
  day: string;
  slotDayToCourse: Map<string, Map<string, OverrideCourseProp>>;
}

interface OverrideFullDayRowProps {
  day: string;
  typeSlotMap: Map<string, string[]>;
  rowName: string;
  slotDayToCourse: Map<string, Map<string, OverrideCourseProp>>;
}

function OverrideFullDayRowComponent({
  day,
  typeSlotMap,
  rowName,
  slotDayToCourse,
}: OverrideFullDayRowProps) {
  return (
    <>
      <tr>
        <BlockHeaderCategory>{day}</BlockHeaderCategory>
        <BlockHeaderSubCategory>{rowName}</BlockHeaderSubCategory>

        {typeSlotMap.get(day)?.map((slot, index) => {
          const uci: uniqueCellIdentifier = {
            day: day,
            slot: slot,
          };
          // console.log(slotDayToCourse);
          // console.log(uci);

          if (slotDayToCourse.has(uci.day)) {
            const cell = slotDayToCourse.get(uci.day);

            if (cell?.has(uci.slot)) {
              const CustomCourseComponent =
                cell?.get(uci.slot)?.CustomCourseComponent || null;
              return CustomCourseComponent ? (
                <td key={index}>
                  <div>{CustomCourseComponent}</div>
                </td>
              ) : (
                <td key={index}>
                  <div>
                    <CourseComponent
                      code={cell?.get(uci.slot)?.code || ""}
                      type={cell?.get(uci.slot)?.type || ""}
                      venue={cell?.get(uci.slot)?.venue || ""}
                      slot={slot}
                    />
                  </div>
                </td>
              );
            } else {
              return <EmptyCourseComponent key={index} children={slot} />;
            }
          } else {
            return <EmptyCourseComponent key={index} children={slot} />;
          }
        })}
      </tr>
    </>
  );
}

function OverrideFullDayComponent({
  day,
  slotDayToCourse,
}: OverrideFullDayComponentProps) {
  return (
    <>
      <OverrideFullDayRowComponent
        day={day}
        typeSlotMap={theorySlotMap}
        rowName={"THEORY"}
        slotDayToCourse={slotDayToCourse}
      />
      <OverrideFullDayRowComponent
        day={day}
        typeSlotMap={labSlotMap}
        rowName={"LAB"}
        slotDayToCourse={slotDayToCourse}
      />
    </>
  );
}

const OverrideTable = ({ children }: OverrideTableProps) => {
  const slotDayToCourse = new Map<string, Map<string, OverrideCourseProp>>();
  children.forEach((child) => {
    const uci: uniqueCellIdentifier = {
      day: child.day,
      slot: child.slot,
    };

    if (slotDayToCourse.has(uci.day)) {
      const cell = slotDayToCourse.get(uci.day);
      cell?.set(uci.slot, child);
    } else {
      const cell = new Map<string, OverrideCourseProp>();
      cell.set(uci.slot, child);
      slotDayToCourse.set(uci.day, cell);
    }
  });
  // console.log(slotDayToCourse);
  return (
    <>
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
            <OverrideFullDayComponent
              key={index}
              day={day}
              slotDayToCourse={slotDayToCourse}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default OverrideTable;
