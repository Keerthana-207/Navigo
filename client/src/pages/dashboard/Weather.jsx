import React from "react";
import {
    Sun,
    CloudSun,
    CloudRain,
    CloudSnow,
    Cloud,
    Wind,
    Droplets,
    Thermometer,
    Eye,
    Gauge,
    Sunrise,
    Sunset,
    MapPin,
    Umbrella,
    Navigation,
    CalendarDays,
} from "lucide-react";

import Layout from "../../components/Layout/Layout";

const FORECAST = [
    {
        day: "Today",
        date: "Aug 8",
        icon: CloudSnow,
        condition: "Snowy",
        temperature: "-2°C",
        high: "1°C",
        low: "-6°C",
        precipitation: "70%",
    },
    {
        day: "Sun",
        date: "Aug 9",
        icon: CloudSnow,
        condition: "Light Snow",
        temperature: "-1°C",
        high: "2°C",
        low: "-5°C",
        precipitation: "60%",
    },
    {
        day: "Mon",
        date: "Aug 10",
        icon: CloudSun,
        condition: "Partly Cloudy",
        temperature: "2°C",
        high: "5°C",
        low: "-2°C",
        precipitation: "20%",
    },
    {
        day: "Tue",
        date: "Aug 11",
        icon: Sun,
        condition: "Sunny",
        temperature: "5°C",
        high: "8°C",
        low: "0°C",
        precipitation: "10%",
    },
    {
        day: "Wed",
        date: "Aug 12",
        icon: Cloud,
        condition: "Cloudy",
        temperature: "3°C",
        high: "6°C",
        low: "-1°C",
        precipitation: "30%",
    },
    {
        day: "Thu",
        date: "Aug 13",
        icon: CloudRain,
        condition: "Rain",
        temperature: "4°C",
        high: "7°C",
        low: "1°C",
        precipitation: "65%",
    },
    {
        day: "Fri",
        date: "Aug 14",
        icon: CloudSun,
        condition: "Mostly Cloudy",
        temperature: "6°C",
        high: "9°C",
        low: "2°C",
        precipitation: "25%",
    },
];

/*
|--------------------------------------------------------------------------
| Hourly Weather
|--------------------------------------------------------------------------
*/

const HOURLY_WEATHER = [
    {
        time: "Now",
        icon: CloudSnow,
        temperature: "-2°",
    },
    {
        time: "12 PM",
        icon: CloudSnow,
        temperature: "-2°",
    },
    {
        time: "2 PM",
        icon: Cloud,
        temperature: "-1°",
    },
    {
        time: "4 PM",
        icon: CloudSun,
        temperature: "0°",
    },
    {
        time: "6 PM",
        icon: CloudSnow,
        temperature: "-2°",
    },
    {
        time: "8 PM",
        icon: CloudSnow,
        temperature: "-4°",
    },
    {
        time: "10 PM",
        icon: CloudSnow,
        temperature: "-5°",
    },
];

/*
|--------------------------------------------------------------------------
| Weather Page
|--------------------------------------------------------------------------
*/

function Weather() {
    return (
        <div
            className="
                min-h-screen
                w-full
                bg-[var(--background)]
                text-[var(--on-background)]
                font-sans
            "
            style={{
                paddingTop: "80px",
            }}
        >
            <Layout>
                <main
                    className="
                        w-full
                        max-w-[1440px]
                        mx-auto
                    "
                    style={{
                        padding: "48px 40px 80px",
                    }}
                >
                    {/* =================================================
                        PAGE HEADER
                    ================================================= */}

                    <section
                        className="
                            flex
                            flex-col
                            md:flex-row
                            md:items-end
                            md:justify-between
                        "
                        style={{
                            marginBottom: "40px",
                            gap: "24px",
                        }}
                    >
                        <div>
                            <div
                                className="
                                    flex
                                    items-center
                                    text-[var(--on-surface-variant)]
                                "
                                style={{
                                    gap: "8px",
                                    marginBottom: "12px",
                                }}
                            >
                                <MapPin
                                    size={18}
                                    className="text-[var(--primary)]"
                                />

                                <span
                                    className="
                                        uppercase
                                        tracking-wider
                                        font-medium
                                    "
                                    style={{
                                        fontSize: "12px",
                                    }}
                                >
                                    Your Destination
                                </span>
                            </div>

                            <h1
                                className="
                                    font-bold
                                    tracking-tight
                                    text-[var(--on-background)]
                                "
                                style={{
                                    fontSize:
                                        "clamp(36px, 5vw, 48px)",
                                    lineHeight: "1.1",
                                    marginBottom: "10px",
                                }}
                            >
                                Alpine Escape
                            </h1>

                            <p
                                className="
                                    text-[var(--on-surface-variant)]
                                "
                                style={{
                                    fontSize: "16px",
                                    lineHeight: "1.6",
                                }}
                            >
                                Weather conditions for your destination
                            </p>
                        </div>

                        <div
                            className="
                                flex
                                items-center
                                rounded-full
                                border
                                border-[var(--outline-variant)]
                                bg-[var(--surface-container)]
                                text-[var(--on-surface)]
                            "
                            style={{
                                padding: "10px 16px",
                                gap: "8px",
                            }}
                        >
                            <CalendarDays
                                size={18}
                                className="text-[var(--primary)]"
                            />

                            <span
                                className="font-medium"
                                style={{
                                    fontSize: "14px",
                                }}
                            >
                                8–14 August
                            </span>
                        </div>
                    </section>

                    {/* =================================================
                        CURRENT WEATHER
                    ================================================= */}

                    <section
                        className="
                            grid
                            grid-cols-1
                            lg:grid-cols-[1.5fr_1fr]
                        "
                        style={{
                            gap: "24px",
                            marginBottom: "40px",
                        }}
                    >
                        {/* Main Weather Card */}

                        <div
                            className="
                                rounded-[var(--radius-xl)]
                                border
                                border-[var(--outline-variant)]
                                bg-[var(--surface-container)]
                                overflow-hidden
                            "
                            style={{
                                padding: "32px",
                            }}
                        >
                            <div
                                className="
                                    flex
                                    flex-col
                                    sm:flex-row
                                    sm:items-center
                                    sm:justify-between
                                "
                                style={{
                                    gap: "32px",
                                }}
                            >
                                <div>
                                    <p
                                        className="
                                            text-[var(--on-surface-variant)]
                                            uppercase
                                            tracking-wider
                                            font-medium
                                        "
                                        style={{
                                            fontSize: "12px",
                                            marginBottom: "12px",
                                        }}
                                    >
                                        Current Weather
                                    </p>

                                    <div
                                        className="
                                            flex
                                            items-center
                                        "
                                        style={{
                                            gap: "18px",
                                        }}
                                    >
                                        <CloudSnow
                                            size={76}
                                            strokeWidth={1.5}
                                            className="
                                                text-[var(--tertiary)]
                                            "
                                        />

                                        <div>
                                            <div
                                                className="
                                                    font-bold
                                                    text-[var(--on-background)]
                                                "
                                                style={{
                                                    fontSize: "64px",
                                                    lineHeight: "1",
                                                }}
                                            >
                                                -2°C
                                            </div>

                                            <p
                                                className="
                                                    text-[var(--on-surface-variant)]
                                                "
                                                style={{
                                                    fontSize: "16px",
                                                    marginTop: "8px",
                                                }}
                                            >
                                                Snowy
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="
                                        rounded-xl
                                        bg-[var(--primary-container)]
                                        text-[var(--on-primary-container)]
                                    "
                                    style={{
                                        padding: "18px 22px",
                                        minWidth: "180px",
                                    }}
                                >
                                    <p
                                        className="
                                            uppercase
                                            tracking-wider
                                            font-medium
                                        "
                                        style={{
                                            fontSize: "11px",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        Feels Like
                                    </p>

                                    <p
                                        className="font-bold"
                                        style={{
                                            fontSize: "28px",
                                        }}
                                    >
                                        -5°C
                                    </p>

                                    <p
                                        style={{
                                            fontSize: "13px",
                                            marginTop: "4px",
                                        }}
                                    >
                                        Cold conditions
                                    </p>
                                </div>
                            </div>

                            <div
                                className="
                                    border-t
                                    border-[var(--outline-variant)]
                                "
                                style={{
                                    marginTop: "32px",
                                    paddingTop: "24px",
                                }}
                            >
                                <p
                                    className="
                                        text-[var(--on-surface-variant)]
                                    "
                                    style={{
                                        fontSize: "14px",
                                        lineHeight: "1.6",
                                    }}
                                >
                                    Snow is expected throughout the day.
                                    Dress warmly and prepare for icy
                                    conditions if you're heading outdoors.
                                </p>
                            </div>
                        </div>

                        {/* Weather Details */}

                        <div
                            className="
                                rounded-[var(--radius-xl)]
                                border
                                border-[var(--outline-variant)]
                                bg-[var(--surface-container)]
                            "
                            style={{
                                padding: "28px",
                            }}
                        >
                            <h2
                                className="font-semibold"
                                style={{
                                    fontSize: "24px",
                                    lineHeight: "1.2",
                                    marginBottom: "24px",
                                }}
                            >
                                Weather Details
                            </h2>

                            <div
                                className="
                                    grid
                                    grid-cols-2
                                "
                                style={{
                                    gap: "20px",
                                }}
                            >
                                <WeatherDetail
                                    icon={Droplets}
                                    label="Humidity"
                                    value="82%"
                                />

                                <WeatherDetail
                                    icon={Wind}
                                    label="Wind"
                                    value="18 km/h"
                                />

                                <WeatherDetail
                                    icon={Eye}
                                    label="Visibility"
                                    value="7 km"
                                />

                                <WeatherDetail
                                    icon={Gauge}
                                    label="Pressure"
                                    value="1018 hPa"
                                />
                            </div>
                        </div>
                    </section>

                    {/* =================================================
                        SUNRISE / SUNSET
                    ================================================= */}

                    <section
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                        "
                        style={{
                            gap: "24px",
                            marginBottom: "40px",
                        }}
                    >
                        <WeatherInfoCard
                            icon={Sunrise}
                            title="Sunrise"
                            value="6:18 AM"
                            subtitle="First light at 5:45 AM"
                        />

                        <WeatherInfoCard
                            icon={Sunset}
                            title="Sunset"
                            value="7:42 PM"
                            subtitle="Last light at 8:10 PM"
                        />
                    </section>

                    {/* =================================================
                        HOURLY FORECAST
                    ================================================= */}

                    <section
                        className="
                            rounded-[var(--radius-xl)]
                            border
                            border-[var(--outline-variant)]
                            bg-[var(--surface-container)]
                        "
                        style={{
                            padding: "28px",
                            marginBottom: "40px",
                        }}
                    >
                        <div
                            className="
                                flex
                                items-center
                                justify-between
                            "
                            style={{
                                marginBottom: "24px",
                            }}
                        >
                            <div>
                                <h2
                                    className="font-semibold"
                                    style={{
                                        fontSize: "24px",
                                        lineHeight: "1.2",
                                    }}
                                >
                                    Hourly Forecast
                                </h2>

                                <p
                                    className="
                                        text-[var(--on-surface-variant)]
                                    "
                                    style={{
                                        fontSize: "14px",
                                        marginTop: "6px",
                                    }}
                                >
                                    Today's weather conditions
                                </p>
                            </div>

                            <ClockIcon />
                        </div>

                        <div
                            className="
                                grid
                                grid-cols-3
                                sm:grid-cols-4
                                lg:grid-cols-7
                            "
                            style={{
                                gap: "12px",
                            }}
                        >
                            {HOURLY_WEATHER.map((hour) => {
                                const HourIcon = hour.icon;

                                return (
                                    <div
                                        key={hour.time}
                                        className="
                                            rounded-xl
                                            text-center
                                            bg-[var(--surface-container-high)]
                                            border
                                            border-[var(--outline-variant)]
                                            transition-all
                                            duration-300
                                            hover:-translate-y-1
                                        "
                                        style={{
                                            padding: "16px 10px",
                                        }}
                                    >
                                        <p
                                            className="
                                                text-[var(--on-surface-variant)]
                                                font-medium
                                            "
                                            style={{
                                                fontSize: "12px",
                                                marginBottom: "14px",
                                            }}
                                        >
                                            {hour.time}
                                        </p>

                                        <HourIcon
                                            size={28}
                                            className="
                                                mx-auto
                                                text-[var(--tertiary)]
                                            "
                                        />

                                        <p
                                            className="font-semibold"
                                            style={{
                                                fontSize: "18px",
                                                marginTop: "12px",
                                            }}
                                        >
                                            {hour.temperature}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* =================================================
                        7 DAY FORECAST
                    ================================================= */}

                    <section>
                        <div
                            className="
                                flex
                                items-center
                                justify-between
                            "
                            style={{
                                marginBottom: "24px",
                            }}
                        >
                            <div>
                                <h2
                                    className="font-semibold"
                                    style={{
                                        fontSize: "28px",
                                        lineHeight: "1.2",
                                    }}
                                >
                                    7-Day Forecast
                                </h2>

                                <p
                                    className="
                                        text-[var(--on-surface-variant)]
                                    "
                                    style={{
                                        fontSize: "14px",
                                        marginTop: "6px",
                                    }}
                                >
                                    Plan your activities around the weather
                                </p>
                            </div>

                            <Umbrella
                                size={28}
                                className="text-[var(--primary)]"
                            />
                        </div>

                        <div
                            className="
                                flex
                                flex-col
                            "
                            style={{
                                gap: "12px",
                            }}
                        >
                            {FORECAST.map((day, index) => {
                                const ForecastIcon = day.icon;

                                return (
                                    <div
                                        key={day.day}
                                        className={`
                                            grid
                                            grid-cols-[1fr_1fr]
                                            sm:grid-cols-[1fr_1fr_1fr_1fr]
                                            lg:grid-cols-[1.2fr_1fr_1.2fr_1fr_1fr]
                                            items-center
                                            rounded-xl
                                            border
                                            border-[var(--outline-variant)]
                                            transition-all
                                            duration-300
                                            hover:-translate-y-0.5
                                            ${
                                                index === 0
                                                    ? "bg-[var(--primary-container)]"
                                                    : "bg-[var(--surface-container)]"
                                            }
                                        `}
                                        style={{
                                            padding: "18px 20px",
                                            gap: "16px",
                                        }}
                                    >
                                        {/* Day */}

                                        <div>
                                            <p
                                                className="
                                                    font-semibold
                                                "
                                                style={{
                                                    fontSize: "16px",
                                                }}
                                            >
                                                {day.day}
                                            </p>

                                            <p
                                                className="
                                                    text-[var(--on-surface-variant)]
                                                "
                                                style={{
                                                    fontSize: "12px",
                                                    marginTop: "3px",
                                                }}
                                            >
                                                {day.date}
                                            </p>
                                        </div>

                                        {/* Weather */}

                                        <div
                                            className="
                                                flex
                                                items-center
                                            "
                                            style={{
                                                gap: "10px",
                                            }}
                                        >
                                            <ForecastIcon
                                                size={28}
                                                className="
                                                    text-[var(--tertiary)]
                                                "
                                            />

                                            <span
                                                className="
                                                    text-[var(--on-surface-variant)]
                                                "
                                                style={{
                                                    fontSize: "14px",
                                                }}
                                            >
                                                {day.condition}
                                            </span>
                                        </div>

                                        {/* Temperature */}

                                        <div
                                            className="
                                                font-semibold
                                                text-[var(--on-background)]
                                            "
                                        >
                                            <span
                                                style={{
                                                    fontSize: "20px",
                                                }}
                                            >
                                                {day.temperature}
                                            </span>

                                            <span
                                                className="
                                                    text-[var(--on-surface-variant)]
                                                "
                                                style={{
                                                    fontSize: "13px",
                                                    marginLeft: "8px",
                                                }}
                                            >
                                                {day.high} / {day.low}
                                            </span>
                                        </div>

                                        {/* Precipitation */}

                                        <div
                                            className="
                                                flex
                                                items-center
                                                text-[var(--on-surface-variant)]
                                            "
                                            style={{
                                                gap: "7px",
                                            }}
                                        >
                                            <Droplets
                                                size={16}
                                                className="
                                                    text-[var(--tertiary)]
                                                "
                                            />

                                            <span
                                                style={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {day.precipitation}
                                            </span>
                                        </div>

                                        {/* Navigation */}

                                        <div
                                            className="
                                                hidden
                                                lg:flex
                                                justify-end
                                            "
                                        >
                                            <Navigation
                                                size={18}
                                                className="
                                                    text-[var(--on-surface-variant)]
                                                "
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* =================================================
                        PACKING ADVICE
                    ================================================= */}

                    <section
                        className="
                            rounded-[var(--radius-xl)]
                            border
                            border-[var(--primary-container)]
                            bg-[var(--surface-container)]
                        "
                        style={{
                            padding: "28px",
                            marginTop: "40px",
                        }}
                    >
                        <div
                            className="
                                flex
                                flex-col
                                sm:flex-row
                                sm:items-center
                            "
                            style={{
                                gap: "18px",
                            }}
                        >
                            <div
                                className="
                                    w-12
                                    h-12
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    bg-[var(--primary-container)]
                                    text-[var(--primary)]
                                    shrink-0
                                "
                            >
                                <Thermometer size={24} />
                            </div>

                            <div>
                                <h3
                                    className="font-semibold"
                                    style={{
                                        fontSize: "18px",
                                        marginBottom: "5px",
                                    }}
                                >
                                    Weather Packing Tip
                                </h3>

                                <p
                                    className="
                                        text-[var(--on-surface-variant)]
                                    "
                                    style={{
                                        fontSize: "14px",
                                        lineHeight: "1.6",
                                    }}
                                >
                                    Temperatures are expected to remain
                                    below freezing. Pack thermal layers,
                                    waterproof outerwear, warm socks,
                                    gloves, and suitable hiking boots.
                                </p>
                            </div>
                        </div>
                    </section>
                </main>
            </Layout>
        </div>
    );
}

/*
|--------------------------------------------------------------------------
| Reusable Weather Detail
|--------------------------------------------------------------------------
*/

function WeatherDetail({ icon: Icon, label, value }) {
    return (
        <div
            className="
                rounded-xl
                bg-[var(--surface-container-high)]
                border
                border-[var(--outline-variant)]
            "
            style={{
                padding: "16px",
            }}
        >
            <Icon
                size={20}
                className="text-[var(--primary)]"
            />

            <p
                className="
                    text-[var(--on-surface-variant)]
                "
                style={{
                    fontSize: "12px",
                    marginTop: "10px",
                    marginBottom: "4px",
                }}
            >
                {label}
            </p>

            <p
                className="font-semibold"
                style={{
                    fontSize: "16px",
                }}
            >
                {value}
            </p>
        </div>
    );
}

/*
|--------------------------------------------------------------------------
| Sunrise / Sunset Card
|--------------------------------------------------------------------------
*/

function WeatherInfoCard({
    icon: Icon,
    title,
    value,
    subtitle,
}) {
    return (
        <div
            className="
                flex
                items-center
                rounded-[var(--radius-xl)]
                border
                border-[var(--outline-variant)]
                bg-[var(--surface-container)]
            "
            style={{
                padding: "22px 24px",
                gap: "18px",
            }}
        >
            <div
                className="
                    w-12
                    h-12
                    rounded-full
                    flex
                    items-center
                    justify-center
                    bg-[var(--primary-container)]
                    text-[var(--primary)]
                    shrink-0
                "
            >
                <Icon size={24} />
            </div>

            <div>
                <p
                    className="
                        text-[var(--on-surface-variant)]
                    "
                    style={{
                        fontSize: "12px",
                        marginBottom: "4px",
                    }}
                >
                    {title}
                </p>

                <p
                    className="font-semibold"
                    style={{
                        fontSize: "22px",
                    }}
                >
                    {value}
                </p>

                <p
                    className="
                        text-[var(--on-surface-variant)]
                    "
                    style={{
                        fontSize: "12px",
                        marginTop: "3px",
                    }}
                >
                    {subtitle}
                </p>
            </div>
        </div>
    );
}

/*
|--------------------------------------------------------------------------
| Small Clock Icon
|--------------------------------------------------------------------------
*/

function ClockIcon() {
    return (
        <div
            className="
                w-10
                h-10
                rounded-full
                flex
                items-center
                justify-center
                bg-[var(--primary-container)]
                text-[var(--primary)]
            "
        >
            <CalendarDays size={18} />
        </div>
    );
}

export default Weather;