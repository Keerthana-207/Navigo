import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function Layout({ children }) {
    return (
        <div
            className="min-h-screen flex flex-col"
            style={{
                background: "var(--background)",
            }}
        >
            <Navbar />

            <main
                className="flex-1"
                style={{
                    paddingTop: "80px",
                }}
            >
                {children}
            </main>

            <Footer />
        </div>
    );
}

export default Layout;