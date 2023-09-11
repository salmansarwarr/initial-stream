import { useEffect, useState } from "react";
import {AiOutlineArrowUp} from 'react-icons/ai'

const ScrollToTopButton = () => {
    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        setShowButton(scrollY > 300); // Show the button when scrollY is greater than 300 pixels
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to the top of the page
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <button
            className={`fixed bottom-4 left-4 px-4 py-2 bg-blue-500 text-white rounded-lg ${
                showButton ? "flex items-center gap-2" : "hidden"
            }`}
            onClick={scrollToTop}
        >
            <span>Scroll to Top</span>
            <AiOutlineArrowUp/>
        </button>
    );
};

export default ScrollToTopButton;
