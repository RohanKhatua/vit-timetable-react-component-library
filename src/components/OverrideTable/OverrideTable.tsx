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

export interface OverrideCourseProp {
  day: string;
  slot: string;
  code: string;
  type: string;
  venue: string;
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

function OverrideFullDayComponent({
  day,
  slotDayToCourse,
}: OverrideFullDayComponentProps) {
  return (
    <>
      <tr>
        <BlockHeaderCategory>{day}</BlockHeaderCategory>
        <BlockHeaderSubCategory>{"Theory"}</BlockHeaderSubCategory>

        {theorySlotMap.get(day)?.map((slot, index) => {
          const uci: uniqueCellIdentifier = {
            day: day,
            slot: slot,
          };
          // console.log(slotDayToCourse);
          // console.log(uci);

          if (slotDayToCourse.has(uci.day)) {
            const cell = slotDayToCourse.get(uci.day);

            if (cell?.has(uci.slot)) {
              const code = cell?.get(uci.slot)?.code || "";
              const type = cell?.get(uci.slot)?.type || "";
              const venue = cell?.get(uci.slot)?.venue || "";

              return (
                <CourseComponent
                  key={index}
                  slot={slot}
                  code={code}
                  type={type}
                  venue={venue}
                />
              );
            } else {
              return <EmptyCourseComponent key={index} children={slot} />;
            }
          } else {
            return <EmptyCourseComponent key={index} children={slot} />;
          }
        })}
      </tr>
      <tr>
        <BlockHeaderSubCategory>{"Lab"}</BlockHeaderSubCategory>

        {labSlotMap.get(day)?.map((slot, index) => {
          const uci: uniqueCellIdentifier = {
            day: day,
            slot: slot,
          };
          // console.log(slotDayToCourse);
          // console.log(uci);

          if (slotDayToCourse.has(uci.day)) {
            const cell = slotDayToCourse.get(uci.day);

            if (cell?.has(uci.slot)) {
              const code = cell?.get(uci.slot)?.code || "";
              const type = cell?.get(uci.slot)?.type || "";
              const venue = cell?.get(uci.slot)?.venue || "";

              return (
                <CourseComponent
                  key={index}
                  slot={slot}
                  code={code}
                  type={type}
                  venue={venue}
                />
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
