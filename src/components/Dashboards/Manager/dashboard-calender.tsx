import TeamCalendar from "components/ManagerDashboard/team_calendar/TeamCalendar";
import { useLeave } from "./useLeaves";

const DashboardCalendar = () => {
  const { teamCalendarValue } = useLeave();
  return <TeamCalendar {...teamCalendarValue} />;
};

export default DashboardCalendar;
