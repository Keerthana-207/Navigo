import { useEffect, useState } from "react";
import {
    Bell,
    UserCircle,
    MapPin,
    Edit3,
    PlaneTakeoff,
    Globe2,
    Compass,
    Shield,
    Trash2,
} from "lucide-react";

import Layout from "../../components/Layout/Layout";
import { getProfile } from "../../services/userApi";
import { getMyTrips } from "../../services/tripApi";

const defaultUser = {
    name: "",
    email: "",
    phone: "",
    location: "",
    memberSince: "",
    profileImage: "",
    preferences: [],
    countriesVisited: 0,
    travelMiles: 0,
    googleConnected: false,
    appleConnected: false,
};

const cardStyle = {
    padding: "32px",
};

const smallCardStyle = {
    padding: "16px",
};

const pageStyle = {
    padding: "48px 40px",
};

const footerStyle = {
    padding: "48px 40px 28px",
};

function Profile() {
    const [user, setUser] = useState(defaultUser);
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [twoFactor, setTwoFactor] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Load User Profile
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
    async function loadProfile() {
        try {
            setLoading(true);
            setError("");

            const response = await getProfile();

            /*
             * Your backend getProfile controller should return
             * the user object, usually in one of these formats:
             *
             * { success: true, user: {...} }
             * { user: {...} }
             * {...user fields...}
             */

            const backendUser =
                response?.user ||
                response?.data?.user ||
                response?.data ||
                response;

            if (
                !backendUser ||
                typeof backendUser !== "object"
            ) {
                throw new Error(
                    "Invalid profile data received from server."
                );
            }

            /*
             * Map the ACTUAL User.js fields
             * to the fields already used by the UI.
             */
            const updatedUser = {
                ...defaultUser,

                name: backendUser.fullName || "",

                email: backendUser.email || "",

                phone: backendUser.phoneNumber || "",

                location: [
                    backendUser.city,
                    backendUser.country,
                ]
                    .filter(Boolean)
                    .join(", "),

                memberSince: backendUser.createdAt
                    ? new Date(
                          backendUser.createdAt
                      ).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                      })
                    : "",

                profileImage:
                    backendUser.profileImage || "",

                /*
                 * These fields currently do not exist
                 * in your User.js schema.
                 */
                preferences: [],

                countriesVisited: 0,

                travelMiles: 0,

                googleConnected: false,

                appleConnected: false,
            };

            setUser(updatedUser);

            /*
             * Store the latest profile locally.
             */
            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );
        } catch (err) {
            console.error(
                "Failed to load profile:",
                err
            );

            setError(
                err?.message ||
                    "Failed to load profile information."
            );
        } finally {
            setLoading(false);
        }
    }

    loadProfile();
}, []);

    /*
    |--------------------------------------------------------------------------
    | Load Trips
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        async function loadTrips() {
            try {
                const data = await getMyTrips();

                if (data?.success) {
                    setTrips(data.trips || []);
                } else if (
                    Array.isArray(data?.trips)
                ) {
                    setTrips(data.trips);
                } else if (Array.isArray(data)) {
                    setTrips(data);
                }
            } catch (error) {
                console.error(
                    "Failed to load trips:",
                    error
                );
            }
        }

        loadTrips();
    }, []);

    /*
    |--------------------------------------------------------------------------
    | User Data
    |--------------------------------------------------------------------------
    */

    const {
        name,
        email,
        phone,
        location,
        memberSince,
        profileImage,
        preferences = [],
    } = user;

    /*
    |--------------------------------------------------------------------------
    | Statistics
    |--------------------------------------------------------------------------
    */

    const stats = [
        {
            label: "Trips Planned",
            value:
                user.tripsPlanned ??
                user.trips_planned ??
                trips.length ??
                0,
            icon: PlaneTakeoff,
        },
        {
            label: "Countries Visited",
            value:
                user.countriesVisited ??
                user.countries_visited ??
                0,
            icon: Globe2,
        },
        {
            label: "Travel Miles",
            value:
                user.travelMiles ??
                user.travel_miles ??
                0,
            icon: Compass,
        },
    ];

    /*
    |--------------------------------------------------------------------------
    | Loading State
    |--------------------------------------------------------------------------
    */

    if (loading) {
        return (
            <Layout>
                <div
                    className="
                        min-h-screen
                        flex
                        items-center
                        justify-center
                        bg-[var(--bg)]
                        text-[var(--text-primary)]
                    "
                    style={{
                        padding: "40px",
                    }}
                >
                    <div className="flex flex-col items-center gap-4">
                        <div
                            className="
                                w-10
                                h-10
                                rounded-full
                                border-4
                                border-[var(--surface-container-high)]
                                border-t-[var(--primary)]
                                animate-spin
                            "
                        />

                        <p className="text-[var(--text-secondary-plan)]">
                            Loading profile...
                        </p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div
                className="
                    min-h-screen
                    bg-[var(--bg)]
                    text-[var(--text-primary)]
                    transition-colors
                    duration-300
                "
                style={{
                    fontFamily:
                        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                }}
            >
                {/* =====================================================
                    ERROR MESSAGE
                ===================================================== */}

                {error && (
                    <div
                        className="
                            mx-auto
                            max-w-[1450px]
                            rounded-xl
                            border
                            border-[var(--error)]/20
                            bg-[var(--error)]/10
                            text-[var(--error)]
                        "
                        style={{
                            marginTop: "32px",
                            marginLeft: "40px",
                            marginRight: "40px",
                            padding: "14px 18px",
                        }}
                    >
                        {error}
                    </div>
                )}

                {/* =====================================================
                    MAIN
                ===================================================== */}

                <main
                    className="
                        mx-auto
                        w-full
                        max-w-[1450px]
                        flex
                        flex-col
                        gap-16
                    "
                    style={pageStyle}
                >
                    {/* =================================================
                        PROFILE HEADER
                    ================================================= */}

                    <section
                        className="
                            flex
                            flex-col
                            md:flex-row
                            items-center
                            md:items-start
                            gap-8
                        "
                        style={{
                            marginTop: "32px",
                        }}
                    >
                        {/* Profile Image */}

                        <div className="relative group">
                            <img
                                src={
                                    profileImage ||
                                    "/default-avatar.png"
                                }
                                alt={
                                    name ||
                                    "Profile"
                                }
                                className="
                                    w-32
                                    h-32
                                    md:w-40
                                    md:h-40
                                    rounded-full
                                    object-cover
                                    border-4
                                    border-[var(--surface-variant)]
                                    shadow-lg
                                    transition-transform
                                    duration-300
                                    group-hover:scale-105
                                "
                            />

                            <button
                                className="
                                    absolute
                                    bottom-0
                                    right-0
                                    rounded-full
                                    bg-[var(--surface-variant)]
                                    text-[var(--text-primary)]
                                    hover:text-[var(--primary)]
                                    border
                                    border-white/10
                                    shadow-md
                                    transition-colors
                                "
                                style={{
                                    padding: "8px",
                                }}
                                title="Edit profile photo"
                            >
                                <Edit3 size={16} />
                            </button>
                        </div>

                        {/* User Information */}

                        <div
                            className="
                                flex
                                flex-col
                                items-center
                                md:items-start
                                text-center
                                md:text-left
                                gap-2
                            "
                            style={{
                                paddingTop: "8px",
                            }}
                        >
                            <h1
                                className="
                                    text-4xl
                                    md:text-5xl
                                    font-bold
                                    text-[var(--text-primary)]
                                "
                                style={{
                                    margin: 0,
                                }}
                            >
                                {name || "Your Name"}
                            </h1>

                            {location && (
                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        text-[var(--text-secondary-plan)]
                                    "
                                >
                                    <MapPin size={16} />

                                    <span>
                                        {location}
                                    </span>
                                </div>
                            )}

                            {memberSince && (
                                <div
                                    className="
                                        rounded-full
                                        bg-[var(--surface-container)]
                                        border
                                        border-white/5
                                        text-[var(--text-secondary-plan)]
                                        text-xs
                                    "
                                    style={{
                                        padding:
                                            "6px 12px",
                                        marginTop:
                                            "4px",
                                    }}
                                >
                                    Member since{" "}
                                    {memberSince}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* =================================================
                        STATS
                    ================================================= */}

                    <section
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-3
                            gap-6
                        "
                    >
                        {stats.map(
                            ({
                                label,
                                value,
                                icon: Icon,
                            }) => (
                                <div
                                    key={label}
                                    className="
                                        glass-card
                                        rounded-xl
                                        flex
                                        flex-col
                                        items-center
                                        md:items-start
                                        gap-2
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                    "
                                    style={cardStyle}
                                >
                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            text-[var(--primary)]
                                        "
                                        style={{
                                            marginBottom:
                                                "8px",
                                        }}
                                    >
                                        <Icon size={20} />

                                        <span
                                            className="
                                                text-xs
                                                uppercase
                                                tracking-wider
                                                font-medium
                                            "
                                        >
                                            {label}
                                        </span>
                                    </div>

                                    <div
                                        className="
                                            text-3xl
                                            font-bold
                                            text-[var(--text-primary)]
                                        "
                                    >
                                        {value}
                                    </div>
                                </div>
                            )
                        )}
                    </section>

                    {/* =================================================
                        TWO COLUMN LAYOUT
                    ================================================= */}

                    <section
                        className="
                            grid
                            grid-cols-1
                            lg:grid-cols-2
                            gap-8
                        "
                    >
                        {/* =================================================
                            LEFT COLUMN
                        ================================================= */}

                        <div
                            className="
                                flex
                                flex-col
                                gap-8
                            "
                        >
                            {/* PERSONAL INFORMATION */}

                            <div
                                className="
                                    glass-card
                                    rounded-xl
                                    flex
                                    flex-col
                                    gap-6
                                "
                                style={cardStyle}
                            >
                                <div
                                    className="
                                        flex
                                        justify-between
                                        items-center
                                    "
                                    style={{
                                        marginBottom:
                                            "8px",
                                    }}
                                >
                                    <h2
                                        className="
                                            text-2xl
                                            font-semibold
                                            text-[var(--text-primary)]
                                        "
                                        style={{
                                            margin: 0,
                                        }}
                                    >
                                        Personal
                                        Information
                                    </h2>

                                    <button
                                        className="
                                            text-[var(--primary)]
                                            hover:text-[var(--primary-hover)]
                                            text-sm
                                        "
                                    >
                                        Edit
                                    </button>
                                </div>

                                <div
                                    className="
                                        flex
                                        flex-col
                                        gap-6
                                    "
                                >
                                    <ProfileField
                                        label="Full Name"
                                        value={name}
                                    />

                                    <ProfileField
                                        label="Email Address"
                                        value={email}
                                        type="email"
                                    />

                                    <ProfileField
                                        label="Phone Number"
                                        value={phone}
                                        type="tel"
                                    />

                                    <ProfileField
                                        label="Location"
                                        value={location}
                                    />
                                </div>
                            </div>

                            {/* TRAVEL PREFERENCES */}

                            <div
                                className="
                                    glass-card
                                    rounded-xl
                                    flex
                                    flex-col
                                    gap-6
                                "
                                style={cardStyle}
                            >
                                <h2
                                    className="
                                        text-2xl
                                        font-semibold
                                        text-[var(--text-primary)]
                                    "
                                    style={{
                                        marginBottom:
                                            "8px",
                                    }}
                                >
                                    Travel Preferences
                                </h2>

                                <div
                                    className="
                                        flex
                                        flex-wrap
                                        gap-3
                                    "
                                >
                                    {preferences.length >
                                    0 ? (
                                        preferences.map(
                                            (
                                                preference
                                            ) => (
                                                <span
                                                    key={
                                                        preference
                                                    }
                                                    className="
                                                        rounded-full
                                                        border
                                                        border-[var(--primary)]/50
                                                        bg-[var(--primary)]/20
                                                        text-[var(--primary)]
                                                    "
                                                    style={{
                                                        padding:
                                                            "8px 16px",
                                                    }}
                                                >
                                                    {
                                                        preference
                                                    }
                                                </span>
                                            )
                                        )
                                    ) : (
                                        <p
                                            className="
                                                text-sm
                                                text-[var(--text-secondary-plan)]
                                            "
                                            style={{
                                                margin: 0,
                                            }}
                                        >
                                            No travel
                                            preferences
                                            added yet.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* =================================================
                            RIGHT COLUMN
                        ================================================= */}

                        <div
                            className="
                                flex
                                flex-col
                                gap-8
                            "
                        >
                            {/* SECURITY */}

                            <div
                                className="
                                    glass-card
                                    rounded-xl
                                    flex
                                    flex-col
                                    gap-6
                                "
                                style={cardStyle}
                            >
                                <h2
                                    className="
                                        text-2xl
                                        font-semibold
                                        text-[var(--text-primary)]
                                    "
                                    style={{
                                        marginBottom:
                                            "8px",
                                    }}
                                >
                                    Security
                                </h2>

                                <div
                                    className="
                                        flex
                                        flex-col
                                        gap-6
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            justify-between
                                            items-center
                                            rounded-lg
                                            bg-[var(--surface-container-low)]
                                            border
                                            border-white/5
                                        "
                                        style={
                                            smallCardStyle
                                        }
                                    >
                                        <div
                                            className="
                                                flex
                                                flex-col
                                                gap-1
                                            "
                                        >
                                            <span className="text-[var(--text-primary)]">
                                                Password
                                            </span>

                                            <span className="text-sm text-[var(--text-secondary-plan)]">
                                                Keep your
                                                password
                                                secure
                                            </span>
                                        </div>

                                        <button
                                            className="
                                                rounded-full
                                                bg-[var(--surface-variant)]
                                                text-[var(--text-primary)]
                                                hover:bg-[var(--surface-container-high)]
                                                transition-colors
                                            "
                                            style={{
                                                padding:
                                                    "8px 16px",
                                            }}
                                        >
                                            Update
                                        </button>
                                    </div>

                                    <div
                                        className="
                                            flex
                                            justify-between
                                            items-center
                                            rounded-lg
                                            bg-[var(--surface-container-low)]
                                            border
                                            border-white/5
                                        "
                                        style={
                                            smallCardStyle
                                        }
                                    >
                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-3
                                            "
                                        >
                                            <Shield
                                                size={20}
                                                className="text-[var(--primary)]"
                                            />

                                            <div
                                                className="
                                                    flex
                                                    flex-col
                                                    gap-1
                                                "
                                            >
                                                <span className="text-[var(--text-primary)]">
                                                    Two-Factor
                                                    Auth
                                                </span>

                                                <span className="text-sm text-[var(--text-secondary-plan)]">
                                                    Add an
                                                    extra
                                                    layer of
                                                    security
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setTwoFactor(
                                                    !twoFactor
                                                )
                                            }
                                            className={`
                                                relative
                                                h-6
                                                w-11
                                                rounded-full
                                                transition-colors
                                                ${
                                                    twoFactor
                                                        ? "bg-[var(--primary)]"
                                                        : "bg-[var(--surface-variant)]"
                                                }
                                            `}
                                        >
                                            <span
                                                className={`
                                                    absolute
                                                    top-[2px]
                                                    h-5
                                                    w-5
                                                    rounded-full
                                                    bg-white
                                                    transition-transform
                                                    ${
                                                        twoFactor
                                                            ? "translate-x-5"
                                                            : "translate-x-[2px]"
                                                    }
                                                `}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* CONNECTED ACCOUNTS */}

                            <div
                                className="
                                    glass-card
                                    rounded-xl
                                    flex
                                    flex-col
                                    gap-6
                                "
                                style={cardStyle}
                            >
                                <h2
                                    className="
                                        text-2xl
                                        font-semibold
                                        text-[var(--text-primary)]
                                    "
                                    style={{
                                        marginBottom:
                                            "8px",
                                    }}
                                >
                                    Connected Accounts
                                </h2>

                                <div
                                    className="
                                        flex
                                        flex-col
                                        gap-4
                                    "
                                >
                                    <ConnectedAccount
                                        name="Google"
                                        connected={
                                            user.googleConnected ??
                                            false
                                        }
                                        icon={
                                            <span
                                                className="
                                                    font-bold
                                                    text-lg
                                                    text-blue-500
                                                "
                                            >
                                                G
                                            </span>
                                        }
                                    />

                                    <ConnectedAccount
                                        name="Apple"
                                        connected={
                                            user.appleConnected ??
                                            false
                                        }
                                        icon={
                                            <span
                                                className="
                                                    text-lg
                                                    text-black
                                                "
                                            >
                                                
                                            </span>
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* =================================================
                        DANGER ZONE
                    ================================================= */}

                    <section
                        style={{
                            marginTop: "32px",
                        }}
                    >
                        <div
                            className="
                                glass-card
                                rounded-xl
                                flex
                                flex-col
                                md:flex-row
                                justify-between
                                items-center
                                gap-6
                                border
                                border-[var(--error)]/20
                            "
                            style={cardStyle}
                        >
                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-2
                                "
                            >
                                <h2
                                    className="
                                        text-2xl
                                        font-semibold
                                        text-[var(--error)]
                                    "
                                    style={{
                                        margin: 0,
                                    }}
                                >
                                    Delete Account
                                </h2>

                                <p
                                    className="
                                        text-[var(--text-secondary-plan)]
                                        text-sm
                                        max-w-lg
                                    "
                                    style={{
                                        margin: 0,
                                    }}
                                >
                                    Permanently remove
                                    your account and all
                                    of its contents from
                                    the Traveloop platform.
                                    This action cannot be
                                    reversed.
                                </p>
                            </div>

                            <button
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    bg-[var(--error)]/10
                                    text-[var(--error)]
                                    border
                                    border-[var(--error)]/20
                                    hover:bg-[var(--error)]/20
                                    transition-colors
                                    whitespace-nowrap
                                "
                                style={{
                                    padding:
                                        "12px 24px",
                                }}
                            >
                                <Trash2 size={16} />

                                Delete Account
                            </button>
                        </div>
                    </section>
                </main>

                {/* =====================================================
                    FOOTER
                ===================================================== */}

                <footer
                    className="
                        w-full
                        bg-[var(--surface-container-lowest)]
                        border-t
                        border-[var(--outline-variant)]/20
                    "
                    style={footerStyle}
                >
                    <div
                        className="
                            max-w-7xl
                            mx-auto
                            flex
                            flex-col
                            md:flex-row
                            justify-between
                            items-center
                            gap-6
                        "
                    >
                        <div
                            className="
                                text-2xl
                                font-semibold
                                text-[var(--primary)]
                            "
                        >
                            Traveloop
                        </div>

                        <div
                            className="
                                flex
                                flex-wrap
                                justify-center
                                gap-6
                            "
                        >
                            <a
                                href="#"
                                className="
                                    text-[var(--text-secondary-plan)]
                                    hover:text-[var(--primary)]
                                    transition-colors
                                    text-xs
                                "
                            >
                                Privacy Policy
                            </a>

                            <a
                                href="#"
                                className="
                                    text-[var(--text-secondary-plan)]
                                    hover:text-[var(--primary)]
                                    transition-colors
                                    text-xs
                                "
                            >
                                Terms of Service
                            </a>

                            <a
                                href="#"
                                className="
                                    text-[var(--text-secondary-plan)]
                                    hover:text-[var(--primary)]
                                    transition-colors
                                    text-xs
                                "
                            >
                                Support
                            </a>

                            <a
                                href="#"
                                className="
                                    text-[var(--text-secondary-plan)]
                                    hover:text-[var(--primary)]
                                    transition-colors
                                    text-xs
                                "
                            >
                                Contact
                            </a>
                        </div>

                        <div
                            className="
                                text-[var(--primary)]
                                text-xs
                                text-center
                                md:text-right
                            "
                        >
                            © 2026 Traveloop.
                            All rights reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </Layout>
    );
}

/* ============================================================
   PROFILE FIELD
============================================================ */

function ProfileField({
    label,
    value,
    type = "text",
}) {
    return (
        <div className="flex flex-col gap-2">
            <label
                className="
                    text-sm
                    text-[var(--text-secondary-plan)]
                "
            >
                {label}
            </label>

            <input
                type={type}
                value={value || ""}
                readOnly
                className="
                    w-full
                    bg-transparent
                    text-[var(--text-primary)]
                    border-0
                    border-b
                    border-white/10
                    focus:border-[var(--primary)]
                    focus:ring-0
                    outline-none
                "
                style={{
                    padding: "4px 0 8px",
                }}
            />
        </div>
    );
}

/* ============================================================
   CONNECTED ACCOUNT
============================================================ */

function ConnectedAccount({
    name,
    connected,
    icon,
}) {
    return (
        <div
            className="
                flex
                justify-between
                items-center
                rounded-lg
                bg-[var(--surface-container-low)]
                border
                border-white/5
                hover:border-white/10
                transition-colors
            "
            style={{
                padding: "16px",
            }}
        >
            <div
                className="
                    flex
                    items-center
                    gap-3
                "
            >
                <div
                    className="
                        w-10
                        h-10
                        rounded-full
                        flex
                        items-center
                        justify-center
                        bg-white
                    "
                    style={{
                        padding: "8px",
                    }}
                >
                    {icon}
                </div>

                <div
                    className="
                        flex
                        flex-col
                    "
                >
                    <span className="text-[var(--text-primary)]">
                        {name}
                    </span>

                    <span className="text-sm text-[var(--text-secondary-plan)]">
                        {connected
                            ? "Connected"
                            : "Not connected"}
                    </span>
                </div>
            </div>

            <button
                className={
                    connected
                        ? "text-[var(--error)] hover:opacity-80"
                        : "text-[var(--primary)] hover:text-[var(--primary-hover)]"
                }
            >
                {connected
                    ? "Disconnect"
                    : "Connect"}
            </button>
        </div>
    );
}

export default Profile;