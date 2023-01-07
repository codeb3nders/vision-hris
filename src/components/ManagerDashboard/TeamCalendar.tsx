import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";

const groupx =  [
  {
      "id": 9,
      "title": "JACKSON, M."
  },
  {
      "id": 10,
      "title": "JOHN, J."
  }
]


const TeamCalendar = ({ teamMembers, leavesPerTeam }) => {
  console.log({ leavesPerTeam }, { teamMembers });
  return (
    teamMembers.length > 0 ? 
    <Timeline
      groups={teamMembers}
      items={leavesPerTeam}
      defaultTimeStart={moment().subtract(1, 'days')}
      defaultTimeEnd={moment().add(15, 'days')}      
    />: <div>loading.....</div>
  );
};

export default TeamCalendar;
