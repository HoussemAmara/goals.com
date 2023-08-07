import React, { useState, useRef, useEffect } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";

const styles = {
    wrap: {
        display: "flex"
    },
    left: {
        marginRight: "10px"
    },
    main: {
        flexGrow: "1"
    }
};
const handleEventDelete = async args => {
    const deletedEventId = args.e.id();
    console.log(deletedEventId)
    if (!window.confirm("Do you really want to delete this meeting?")) {
        args.preventDefault();
    }
    const payload = {
        front_id: deletedEventId,
    }
    try {
        const response = await fetch('http://127.0.0.1:8000/api/orders/deletemeeting/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            throw new Error('Failed to delete meeting');
        }
    } catch (error) {
        console.error(error);
    }

};

const Calendar = ({
    prospectID,
}: {
    prospectID: string,
}) => {
    const [bgColor, setBgColor] = useState("");
    const currentDate = new Date().toISOString().slice(0, 10);
    const calendarRef = useRef();
    const [calendarConfig, setCalendarConfig] = useState({

        viewType: "Week",
        durationBarVisible: true,
        cellDuration: 15,
        timeRangeSelectedHandling: "Enabled",
        onTimeRangeSelected: args => {
            handleTimeRangeSelected(args);
        },
        onBeforeCellRender: args => {
            console.log('hello world ')
            if (args.cell.start < DayPilot.Date.today()) {
                args.cell.backColor = "#dd7e6b";
            }
        },
        eventDeleteHandling: "Update",
        onEventDelete: handleEventDelete,
        onEventClick: async args => {
            const dp = calendarRef.current.control;
            const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
            if (!modal.result) { return; }
            const e = args.e;
            e.data.text = modal.result;
            dp.events.update(e);
            handleEventClick(e.data.text, e.data.id);
        },
    });
    const handleEventClick = async (text: string, frontId: string) => {
        console.log(text, frontId);
        const payload = {
            text: text,
            front_id: frontId
        }
        try {
            const response = await fetch('http://127.0.0.1:8000/api/orders/editmeeting/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                throw new Error('Failed to delete meeting');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleTimeRangeSelected = async args => {
        const dp = calendarRef.current.control;
        const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
        dp.clearSelection();
        if (!modal.result) { return; }
        const newEvent = {
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            text: modal.result,
            prospect: prospectID,
            bgColor: bgColor,
        };
        dp.events.add(newEvent);
        const startTimestamp = new Date(newEvent.start).getTime();
        const endTimestamp = new Date(newEvent.end).getTime();
        const durationInMilliseconds = endTimestamp - startTimestamp;
        const durationInMinutes = durationInMilliseconds / (1000 * 60);
        const payload = {
            prospect: prospectID,
            scheduled_time: newEvent.start.value,
            duration: durationInMinutes,
            text: newEvent.text,
            front_id: newEvent.id,
        }

        try {
            console.log(payload)
            const response = await fetch('http://127.0.0.1:8000/api/orders/meeting/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                throw new Error('Failed to create meeting');
            }
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        const updatedConfig = {
            ...calendarConfig,
            onTimeRangeSelected: handleTimeRangeSelected,
        };

        setCalendarConfig(updatedConfig);
    }, [prospectID]);
    function addMinutes(dateString, minutes) {
        const date = new Date(dateString);
        date.setTime(date.getTime() + minutes * 60000);
        return date.toISOString();
    }

    useEffect(() => {
        const dp = calendarRef.current.control;
        dp.businessBeginsHour = 8;
        dp.businessEndsHour = 18;
        dp.onAfterEventRender = function (args) {
            console.log("hello ist me ")
            const now = new DayPilot.Date();
            // Set the current time cell to gray
            if (args.cell.start <= now && now < args.cell.end) {
                args.cell.properties.backColor = "#333";
            }
        };

        const fetchData = async () => {

            const response = await fetch('http://127.0.0.1:8000/api/orders/getallmeetings/', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', }
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                return data;
            } else {
                throw new Error('Failed to fetch meetings');
            }
        }
        fetchData().then(data => {
            let eventsCount = 0; // Initialize eventsCount variable
            const dp = calendarRef.current.control;

            data.forEach(event => {
                const newEvent = {
                    id: event.front_id,
                    text: event.text,
                    start: event.scheduled_time,
                    end: addMinutes(event.scheduled_time, event.duration),
                    bgColor: event.bgColor,
                };

                dp.events.add(newEvent);
                eventsCount += 1; // Increment eventsCount
                console.log(newEvent);
            });
            const events = [
                {
                    id: 1,
                    text: "Event 1",
                    start: "2023-10-02T10:30:00",
                    end: "2023-10-02T13:00:00"
                },
                {
                    id: 2,
                    text: "Event 2",
                    start: "2023-10-03T09:30:00",
                    end: "2023-10-03T11:30:00",
                    backColor: "#6aa84f"
                },
                {
                    id: 3,
                    text: "Event 3",
                    start: "2023-10-03T12:00:00",
                    end: "2023-10-03T15:00:00",
                    backColor: "#f1c232"
                },
                {
                    id: 4,
                    text: "Event 4",
                    start: "2023-10-01T11:30:00",
                    end: "2023-10-01T14:30:00",
                    backColor: "#cc4125"
                },
            ];
            const startDate = currentDate;
            if (eventsCount === 0) {
                calendarRef.current.control.update({ startDate, events: events });
            } else {
                calendarRef.current.control.update({ startDate, events: dp.events });
            }

        });
    }, []);



    return (
        <div style={styles.wrap}>
            <div style={styles.left}>
                <DayPilotNavigator
                    selectMode={"Week"}
                    showMonths={1}
                    startDate={currentDate}
                    selectionDay={currentDate}
                    onTimeRangeSelected={args => {
                        calendarRef.current.control.update({
                            startDate: args.day,
                        });
                    }}
                />
            </div>
            <div style={styles.main}>
                <DayPilotCalendar
                    {...calendarConfig}
                    ref={calendarRef}
                />
            </div>
        </div>
    )
}

export default Calendar;