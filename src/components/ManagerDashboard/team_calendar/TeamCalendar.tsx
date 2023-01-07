import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import { useEffect, useState } from "react";

import InfoLabel from "./info_label";

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
        defaultTimeStart={moment().subtract(1, "days")}
        defaultTimeEnd={moment().add(15, "days")}
      />
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
