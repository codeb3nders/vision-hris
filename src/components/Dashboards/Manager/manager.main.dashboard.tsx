import React from "react";
import ProfilePreview from "../Common/profile.preview";
import Shortcuts from "../Common/shortcuts";
// import LeaveBalances from './leave.balances';
import Announcement from "../Common/sample_announcement";
import LeaveRequests from "./leave.requests";
import Welcome from "../Common/welcome";
import OffsToday from "../Common/offs.today";
import CelebrationsToday from "../Common/celebrations.today";
import Attendance from "./attendance";
import Timeline, { TimelineHeaders, DateHeader } from "react-calendar-timeline";

import moment from "moment";
import DashboardCalendar from "./dashboard-calender";

const groups = [
  { id: 1, title: "group 1" },
  { id: 2, title: "group 2" },
];

const items = [
  {
    id: 1,
    group: 1,
    title: "item 1",
    start_time: moment(),
    end_time: moment().add(1, "hour"),
  },
  {
    id: 2,
    group: 2,
    title: "item 2",
    start_time: moment().add(-0.5, "hour"),
    end_time: moment().add(0.5, "hour"),
  },
  {
    id: 3,
    group: 1,
    title: "item 3",
    start_time: moment().add(2, "hour"),
    end_time: moment().add(3, "hour"),
  },
];

type Props = {
  celebrations: [];
};

const ManagerMainDashboard = (props: Props) => {
  const { celebrations } = props;
  return (
    <main className="grid grid-cols-12 items-start gap-4 mt-4 pb-20 ">
      <Welcome
        profile={<ProfilePreview />}
        announcements={<Announcement />}
        className="col-span-9 tablet:col-span-12 laptop:col-span-9  phone:col-span-12  self-stretch"
      />
      <Shortcuts className="col-span-3 tablet:col-span-4 laptop:col-span-3 phone:col-span-12  self-stretch" />
      <div className="col-span-12">
        <DashboardCalendar/>
      </div>
      <div className="col-span-4 tablet:col-span-6 laptop:col-span-5 phone:col-span-12 desktop:col-span-4 grid space-y-4">
        <LeaveRequests />
        {/* <LeaveBalances className='mb-4' /> */}
      </div>

      <div className="col-span-4 tablet:col-span-6 laptop:col-span-5 phone:col-span-12 desktop:col-span-4 grid space-y-4">
        <Attendance />
      </div>

      <div className="col-span-4 tablet:col-span-6 laptop:col-span-5 phone:col-span-12 desktop:col-span-4 grid space-y-4">
        <CelebrationsToday
          celebrations={celebrations}
          className="col-span-4 tablet:col-span-6 laptop:col-span-5 desktop:col-span-4 phone:col-span-12 self-stretch"
        />
        <OffsToday className="col-span-4 tablet:col-span-6 laptop:col-span-5 desktop:col-span-4 phone:col-span-12 self-stretch" />
      </div>
    </main>
  );
};

export default ManagerMainDashboard;
