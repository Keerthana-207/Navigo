import { Mail } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import {
    SOCIAL_LINKS,
    BRAND,
    FOOTER_LINKS,
    CONTACT
} from "../../constants";

import "./Footer.css";

function Footer() {
    return (
        <footer
            className="
                footer
                w-full
                border-t
                border-[var(--outline-variant)]
                bg-[var(--surface-container-lowest)]
            "
        >
            <div className="max-w-[1450px] mx-auto">

                {/* Top */}

                <div className="footer-top">

                    {/* Brand */}

                    <div className="footer-brand">

                        <h2 className="footer-logo">
                            {BRAND.name}
                        </h2>

                        <p className="footer-description">
                            {BRAND.tagline}
                        </p>

                        <div className="footer-socials">

                            {SOCIAL_LINKS.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="footer-social"
                                    aria-label={item.name}
                                >
                                    {item.name === "Instagram" && (
                                        <FaInstagram size={18} />
                                    )}

                                    {item.name === "Twitter" && (
                                        <FaXTwitter size={18} />
                                    )}
                                </a>
                            ))}

                        </div>

                    </div>

                    {/* Links */}

                    <div className="footer-links-grid">

                        <div>

                            <h3 className="footer-heading">
                                Product
                            </h3>

                            <div className="footer-links">

                                {FOOTER_LINKS.product.map((item) => (
                                    <a
                                        key={item.title}
                                        href={item.href}
                                        className="footer-link"
                                    >
                                        {item.title}
                                    </a>
                                ))}

                            </div>

                        </div>

                        <div>

                            <h3 className="footer-heading">
                                Company
                            </h3>

                            <div className="footer-links">

                                {FOOTER_LINKS.company.map((item) => (
                                    <a
                                        key={item.title}
                                        href={item.href}
                                        className="footer-link"
                                    >
                                        {item.title}
                                    </a>
                                ))}

                            </div>

                        </div>

                        <div>

                            <h3 className="footer-heading">
                                Support
                            </h3>

                            <div className="footer-links">

                                {FOOTER_LINKS.support.map((item) => (
                                    <a
                                        key={item.title}
                                        href={item.href}
                                        className="footer-link"
                                    >
                                        {item.title}
                                    </a>
                                ))}

                                <a
                                    href={`mailto:${CONTACT.email}`}
                                    className="footer-link footer-mail"
                                >
                                    <Mail size={15} />
                                    Email
                                </a>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Bottom */}

                <div className="footer-bottom">

                    <p>
                        {BRAND.copyright}
                    </p>

                    <p>
                        {BRAND.madeWith}
                    </p>

                </div>

            </div>
        </footer>
    );
}

export default Footer;