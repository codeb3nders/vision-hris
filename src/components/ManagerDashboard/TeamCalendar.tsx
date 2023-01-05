import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment';

const groups = [{ id: 1, title: 'group 1' }, { id: 2, title: 'group 2' }]

const items = [
  {
    id: 1,
    group: 1,
    title: 'item 1',
    start_time: moment(),
    end_time: moment().add(1, 'hour')
  },
  {
    id: 2,
    group: 2,
    title: 'item 2',
    start_time: moment().add(-0.5, 'hour'),
    end_time: moment().add(0.5, 'hour')
  },
  {
    id: 3,
    group: 1,
    title: 'item 3',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour')
  }
]

const TeamCalendar = ({teamMembers, leavesPerTeam}) => {
// console.log({leavesPerTeam}, {teamMembers})
  return <Timeline
    groups={teamMembers}
    items={leavesPerTeam}
    defaultTimeStart={moment().add(-12, 'hour')}
    defaultTimeEnd={moment().add(12, 'hour')}
    // defaultTimeStart={moment("2023-02-08").startOf("day")}
    // defaultTimeEnd={moment("2023-02-08").startOf("day").add(12, 'hour')}
  />
}

export default TeamCalendar;