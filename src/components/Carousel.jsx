/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

function HomeCaruosel({ children: slides, autoSlideInterval = 5000 }) {
    const [current, setCurrent] = useState(0);

    const prev = () => {
        setCurrent(current === 0 ? slides.length - 1 : current - 1);
    }

    const next = () => {
        setCurrent(current === slides.length - 1 ? 0 : current + 1);
    }

    useEffect(() => {
        const interval = setInterval(next, autoSlideInterval);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className="overflow-hidden relative rounded-xl">
            <div className="flex transition-transform ease-out duration-500"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {slides}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
                <button onClick={prev}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-white drop-shadow-lg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <button onClick={next}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-white drop-shadow-lg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default HomeCaruosel;