import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function Layout({ children }) {
    return (
        <>
            <Navbar />

            <main
                className="min-h-screen"
                style={{
                    paddingTop: "80px"
                }}
            >
                {children}
            </main>

            <Footer />
        </>
    );
}

export default Layout;