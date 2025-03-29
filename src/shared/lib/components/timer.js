import { useState, useEffect } from "react";
import styles from "./timer.module.sass";

export const Timer = ({ initialMinutes = 0, initialSeconds = 10 }) => {
    const totalTime = initialMinutes * 60 + initialSeconds;
    const [timeLeft, setTimeLeft] = useState(totalTime);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const interval = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const percentage = (timeLeft / totalTime) * 100;
    const strokeDashoffset = 251 - (251 * percentage) / 100;

    return (
        <div className={styles.timerContainer}>
            <svg className={styles.svgTimer} viewBox="0 0 100 100">
                <circle className={styles.circleBackground} r="40" cx="50" cy="50" />
                <circle
                    className={styles.circleProgress}
                    strokeDasharray="251"
                    strokeDashoffset={strokeDashoffset}
                    r="40"
                    cx="50"
                    cy="50"
                />
            </svg>
            <div className={styles.timeText}>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
            <p className={styles.label}>Qolgan vaqt</p>
        </div>
    );
}
