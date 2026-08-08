export function fmtMoney(value) {
    return (
        "₹" +
        Number(value || 0).toLocaleString("en-IN")
    );
}

export function parseTimeHour(time) {

    const match =
        /(\d+):(\d+)\s*(AM|PM)/i.exec(
            time || ""
        );

    if (!match) return 12;

    let hour = parseInt(match[1], 10);

    const isPM =
        /pm/i.test(match[3]);

    if (isPM && hour !== 12) {
        hour += 12;
    }

    if (!isPM && hour === 12) {
        hour = 0;
    }

    return hour;
}

export function periodOf(place) {

    if (!place.time) {
        return "Unscheduled";
    }

    const hour =
        parseTimeHour(place.time);

    if (hour < 12) {
        return "Morning";
    }

    if (hour < 17) {
        return "Afternoon";
    }

    return "Evening";
}