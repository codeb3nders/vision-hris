import Timeline, {TimelineHeaders, DateHeader} from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import moment from 'moment-timezone'
import { useEffect, useState } from "react";
import InfoLabel from "./info_label";

moment.tz.setDefault("Asia/Manila")

const TeamCalendar = ({ teamMembers, leavesPerTeam }) => {


  const [mousePos, setMousePos] = useState({});

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("click", handleMouseMove);

    return () => {
      window.removeEventListener("click", handleMouseMove);
    };
  }, []);

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue]: any = useState();

  const handleClickOpen = (item) => {
    setSelectedValue(leavesPerTeam[item]);
    setOpen(true);
    console.log({item})
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue({});
  };

  return teamMembers.length > 0 ? (
    <>
      <Timeline
        groups={teamMembers}
        items={leavesPerTeam}
        onItemDoubleClick={handleClickOpen}
        defaultTimeStart={moment().subtract(1, "days").startOf("day")}
        defaultTimeEnd={moment().add(30, "days").startOf("day")}
        // lineHeight={50}
      >
        {/* <TimelineHeaders >
          <DateHeader unit="primaryHeader" />
          <DateHeader
            // unit="hour"
            // labelFormat="hh:mm"
            style={{color: '#999999'}}
          />
        </TimelineHeaders> */}
      </Timeline>
      {open && (
        <InfoLabel
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
      )}
    </>
  ) : (
    <div>loading.....</div>
  );
};

export default TeamCalendar;
