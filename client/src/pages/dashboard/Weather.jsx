import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
    Sun,
    CloudSun,
    CloudRain,
    CloudSnow,
    Cloud,
    CloudLightning,
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
    Clock,
    Loader2,
    RefreshCw,
} from "lucide-react";
import Layout from "../../components/Layout/Layout";

const GEOCODING_API =
    "https://geocoding-api.open-meteo.com/v1/search";

const WEATHER_API =
    "https://api.open-meteo.com/v1/forecast";

/* =================================================
   WEATHER CODE → UI INFORMATION
================================================= */

const getWeatherInfo = (code) => {
    if (code === 0) {
        return {
            label: "Clear Sky",
            icon: Sun,
        };
    }

    if (code === 1) {
        return {
            label: "Mainly Clear",
            icon: Sun,
        };
    }

    if (code === 2) {
        return {
            label: "Partly Cloudy",
            icon: CloudSun,
        };
    }

    if (code === 3) {
        return {
            label: "Overcast",
            icon: Cloud,
        };
    }

    if (code === 45 || code === 48) {
        return {
            label: "Foggy",
            icon: Cloud,
        };
    }

    if (code >= 51 && code <= 57) {
        return {
            label: "Drizzle",
            icon: CloudRain,
        };
    }

    if (code >= 61 && code <= 67) {
        return {
            label: "Rain",
            icon: CloudRain,
        };
    }

    if (code >= 71 && code <= 77) {
        return {
            label: "Snow",
            icon: CloudSnow,
        };
    }

    if (code >= 80 && code <= 82) {
        return {
            label: "Rain Showers",
            icon: CloudRain,
        };
    }

    if (code >= 85 && code <= 86) {
        return {
            label: "Snow Showers",
            icon: CloudSnow,
        };
    }

    if (code >= 95 && code <= 99) {
        return {
            label: "Thunderstorm",
            icon: CloudLightning,
        };
    }

    return {
        label: "Unknown",
        icon: Cloud,
    };
};

/* =================================================
   HELPER: FORMAT DATE
================================================= */

const formatDate = (dateString, options = {}) => {
    if (!dateString) return "";

    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-US", options);
};

/* =================================================
   HELPER: FORMAT TIME
================================================= */

const formatTime = (timeString) => {
    if (!timeString) return "--";

    const date = new Date(timeString);

    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });
};

/* =================================================
   WEATHER PAGE
================================================= */

function Weather({ destination: destinationProp }) {
    const routerLocation = useLocation();

    const destination =
        destinationProp ||
        routerLocation.state?.destination ||
        routerLocation.state?.trip?.destination ||
        "";

    const [weather, setWeather] = useState(null);
    const [weatherLocation, setWeatherLocation] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    /* =================================================
       DEBUG
    ================================================= */

    console.log(
        "Weather location state:",
        routerLocation.state
    );

    console.log(
        "Weather trip:",
        routerLocation.state?.trip
    );

    console.log(
        "Weather destination:",
        destination
    );

    /* =================================================
       FETCH WEATHER
    ================================================= */

    const fetchWeather = async () => {
        if (!destination || !destination.trim()) {
            setWeather(null);
            setWeatherLocation(null);
            setError("Trip destination is not available.");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError("");

            /* ============================================
               STEP 1: GEOCODING
            ============================================ */

            const locationResponse = await fetch(
                `${GEOCODING_API}?name=${encodeURIComponent(
                    destination.trim()
                )}&count=10&language=en&format=json`
            );

            if (!locationResponse.ok) {
                throw new Error("Unable to find destination.");
            }

            const locationData = await locationResponse.json();

            if (
                !locationData.results ||
                locationData.results.length === 0
            ) {
                throw new Error(
                    `Could not find weather location for "${destination}".`
                );
            }

            // Prefer an exact city/name match first
            let place = locationData.results.find(
                (result) =>
                    result.name?.toLowerCase() ===
                    destination.trim().toLowerCase()
            );

            // For Goa specifically, prefer India
            if (!place && destination.trim().toLowerCase() === "goa") {
                place = locationData.results.find(
                    (result) =>
                        result.country_code?.toLowerCase() === "in" ||
                        result.country?.toLowerCase() === "india"
                );
            }

            // Otherwise use the first result
            if (!place) {
                place = locationData.results[0];
            }

            console.log("Selected weather location:", place);

            const latitude = place.latitude;
            const longitude = place.longitude;

            setWeatherLocation({
                name: place.name,
                country: place.country,
                latitude,
                longitude,
            });

            /* ============================================
               STEP 2: WEATHER
            ============================================ */

            const weatherResponse = await fetch(
                `${WEATHER_API}?latitude=${latitude}&longitude=${longitude}` +
                    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,` +
                    `precipitation,rain,weather_code,wind_speed_10m,visibility,surface_pressure` +
                    `&hourly=temperature_2m,weather_code,precipitation_probability` +
                    `&daily=weather_code,temperature_2m_max,temperature_2m_min,` +
                    `precipitation_probability_max,sunrise,sunset` +
                    `&timezone=auto` +
                    `&forecast_days=7`
            );

            if (!weatherResponse.ok) {
                throw new Error(
                    "Unable to fetch weather data."
                );
            }

            const weatherData =
                await weatherResponse.json();

            setWeather(weatherData);
        } catch (err) {
            console.error(
                "Weather fetch error:",
                err
            );

            setWeather(null);

            setError(
                err.message ||
                    "Unable to load weather."
            );
        } finally {
            setLoading(false);
        }
    };

    /* =================================================
       FETCH WHEN DESTINATION CHANGES
    ================================================= */

    useEffect(() => {
        fetchWeather();
    }, [destination]);

    /* =================================================
       LOADING
    ================================================= */

    if (loading) {
        return (
            <div
                className="
                    min-h-screen
                    w-full
                    bg-[var(--background)]
                    text-[var(--on-background)]
                    font-sans
                    flex
                    items-center
                    justify-center
                "
                style={{
                    paddingTop: "80px",
                }}
            >
                <div
                    className="
                        flex
                        items-center
                        gap-3
                        text-[var(--on-surface-variant)]
                    "
                >
                    <Loader2
                        size={24}
                        className="animate-spin text-[var(--primary)]"
                    />

                    <span>
                        Loading weather for{" "}
                        {destination || "your destination"}...
                    </span>
                </div>
            </div>
        );
    }

    /* =================================================
       ERROR
    ================================================= */

    if (error) {
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
                    <div
                        className="
                            rounded-[var(--radius-xl)]
                            border
                            border-[var(--outline-variant)]
                            bg-[var(--surface-container)]
                            text-center
                        "
                        style={{
                            padding: "48px",
                        }}
                    >
                        <p
                            className="
                                font-semibold
                                text-[var(--on-background)]
                            "
                            style={{
                                fontSize: "20px",
                                marginBottom: "8px",
                            }}
                        >
                            Weather Unavailable
                        </p>

                        <p
                            className="
                                text-[var(--on-surface-variant)]
                            "
                            style={{
                                fontSize: "14px",
                                marginBottom: "20px",
                            }}
                        >
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={fetchWeather}
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                bg-[var(--primary)]
                                text-[var(--on-primary)]
                                font-medium
                            "
                            style={{
                                padding: "10px 16px",
                            }}
                        >
                            <RefreshCw size={16} />
                            Retry
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    if (
        !weather ||
        !weather.current ||
        !weather.daily ||
        !weatherLocation
    ) {
        return null;
    }

    /* =================================================
       CURRENT WEATHER
    ================================================= */

    const current = weather.current;

    const currentWeatherInfo =
        getWeatherInfo(current.weather_code);

    const CurrentWeatherIcon =
        currentWeatherInfo.icon;

    /* =================================================
       DAILY DATA
    ================================================= */

    const daily = weather.daily;

    /* =================================================
       DATE RANGE
    ================================================= */

    const firstDate = daily.time?.[0];
    const lastDate =
        daily.time?.[daily.time.length - 1];

    const dateRange =
        firstDate && lastDate
            ? `${formatDate(firstDate, {
                  day: "numeric",
                  month: "long",
              })}–${formatDate(lastDate, {
                  day: "numeric",
                  month: "long",
              })}`
            : "";

    /* =================================================
       HOURLY DATA

       Take current hour and next 6 hours.
    ================================================= */

    const currentHourIndex =
        weather.hourly?.time?.findIndex(
            (time) =>
                new Date(time) >=
                new Date(current.time)
        ) ?? -1;

    const hourlyWeather =
        currentHourIndex >= 0
            ? weather.hourly.time
                  .slice(
                      currentHourIndex,
                      currentHourIndex + 7
                  )
                  .map((time, index) => {
                      const actualIndex =
                          currentHourIndex + index;

                      const code =
                          weather.hourly.weather_code[
                              actualIndex
                          ];

                      const info =
                          getWeatherInfo(code);

                      return {
                          time:
                              index === 0
                                  ? "Now"
                                  : formatTime(time),
                          icon: info.icon,
                          temperature:
                              Math.round(
                                  weather.hourly
                                      .temperature_2m[
                                      actualIndex
                                  ]
                              ) + "°",
                      };
                  })
            : [];

    /* =================================================
       SUNRISE / SUNSET
    ================================================= */

    const sunrise =
        daily.sunrise?.[0];

    const sunset =
        daily.sunset?.[0];

    /* =================================================
       PACKING ADVICE
    ================================================= */

    const currentTemperature =
        Math.round(current.temperature_2m);

    const rainProbability =
        daily.precipitation_probability_max?.[0] ??
        0;

    let packingTip =
        "Pack comfortable clothing suitable for the expected weather.";

    if (currentTemperature <= 0) {
        packingTip =
            "Temperatures are expected to remain around freezing. Pack warm layers, thermal clothing, gloves, and suitable footwear.";
    } else if (currentTemperature <= 10) {
        packingTip =
            "Cool conditions are expected. Pack warm layers, a light jacket, and comfortable footwear.";
    } else if (rainProbability >= 60) {
        packingTip =
            "Rain is likely during your stay. Pack a waterproof jacket or umbrella and suitable footwear.";
    } else if (currentTemperature >= 30) {
        packingTip =
            "Warm conditions are expected. Pack lightweight clothing, sunscreen, sunglasses, and stay hydrated.";
    } else if (rainProbability >= 30) {
        packingTip =
            "There is some chance of rain. Consider carrying a light rain jacket or compact umbrella.";
    }

    /* =================================================
       7 DAY FORECAST
    ================================================= */

    const forecast = daily.time.map(
        (date, index) => {
            const info = getWeatherInfo(
                daily.weather_code[index]
            );

            return {
                day:
                    index === 0
                        ? "Today"
                        : formatDate(date, {
                              weekday: "short",
                          }),

                date: formatDate(date, {
                    month: "short",
                    day: "numeric",
                }),

                icon: info.icon,

                condition: info.label,

                temperature:
                    Math.round(
                        daily.temperature_2m_max[
                            index
                        ]
                    ) + "°C",

                high:
                    Math.round(
                        daily.temperature_2m_max[
                            index
                        ]
                    ) + "°C",

                low:
                    Math.round(
                        daily.temperature_2m_min[
                            index
                        ]
                    ) + "°C",

                precipitation:
                    `${
                        daily
                            .precipitation_probability_max?.[
                            index
                        ] ?? 0
                    }%`,
            };
        }
    );

    /* =================================================
       PAGE
    ================================================= */

    return (
        <>
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
                            {weatherLocation.name}
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
                            {dateRange}
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
                                    <CurrentWeatherIcon
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
                                            {Math.round(
                                                current.temperature_2m
                                            )}
                                            °C
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
                                            {
                                                currentWeatherInfo.label
                                            }
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
                                    {Math.round(
                                        current.apparent_temperature
                                    )}
                                    °C
                                </p>

                                <p
                                    style={{
                                        fontSize: "13px",
                                        marginTop: "4px",
                                    }}
                                >
                                    {currentWeatherInfo.label}
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
                                Current conditions in{" "}
                                {weatherLocation.name}. Check the
                                forecast below to plan your activities
                                and travel accordingly.
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
                                value={`${current.relative_humidity_2m}%`}
                            />

                            <WeatherDetail
                                icon={Wind}
                                label="Wind"
                                value={`${Math.round(
                                    current.wind_speed_10m
                                )} km/h`}
                            />

                            <WeatherDetail
                                icon={Eye}
                                label="Visibility"
                                value={
                                    current.visibility != null
                                        ? `${(
                                              current.visibility /
                                              1000
                                          ).toFixed(1)} km`
                                        : "N/A"
                                }
                            />

                            <WeatherDetail
                                icon={Gauge}
                                label="Pressure"
                                value={
                                    current.surface_pressure != null
                                        ? `${Math.round(
                                              current.surface_pressure
                                          )} hPa`
                                        : "N/A"
                                }
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
                        value={formatTime(sunrise)}
                        subtitle="Start of daylight"
                    />

                    <WeatherInfoCard
                        icon={Sunset}
                        title="Sunset"
                        value={formatTime(sunset)}
                        subtitle="End of daylight"
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
                        {hourlyWeather.map((hour) => {
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
                        {forecast.map((day, index) => {
                            const ForecastIcon = day.icon;

                            return (
                                <div
                                    key={`${day.day}-${day.date}`}
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
                                {packingTip}
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            </Layout>
        </div>
        </>
    );
}

/* =================================================
   REUSABLE WEATHER DETAIL
================================================= */

function WeatherDetail({
    icon: Icon,
    label,
    value,
}) {
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
                size={22}
                className="text-[var(--tertiary)]"
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

/* =================================================
   SUNRISE / SUNSET CARD
================================================= */

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

/* =================================================
   SMALL CLOCK ICON
================================================= */

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
            <Clock size={20} />
        </div>
    );
}

export default Weather;