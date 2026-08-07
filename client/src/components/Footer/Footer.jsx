function Footer() {
    return(
        <>
        <footer className="w-full py-section-gap px-container-padding flex flex-col md:flex-row justify-between items-center max-w-[1440px] mx-auto bg-surface border-t border-slate-200 mt-auto font-body-md text-body-md">
                <div className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-primary mb-4 md:mb-0">
                    Navigo
                </div>
                <div className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
                    <a href="#" className="text-slate-500 hover:text-primary transition-colors font-label-sm text-label-sm">Privacy Policy</a>
                    <a href="#" className="text-slate-500 hover:text-primary transition-colors font-label-sm text-label-sm">Terms of Service</a>
                    <a href="#" className="text-slate-500 hover:text-primary transition-colors font-label-sm text-label-sm">Help Center</a>
                    <a href="#" className="text-slate-500 hover:text-primary transition-colors font-label-sm text-label-sm">Contact Us</a>
                </div>
                <div className="text-slate-500 text-sm text-center md:text-right">
                    © 2024 Navigo. Engineering the art of exploration.
                </div>
        </footer>
        </>
    )
}

export default Footer