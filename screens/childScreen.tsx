import { FC, useState, useEffect } from 'react';
import AnalogAM from '../components/AnalogAMClock';
import AnalogPM from '../components/AnalogPMClock';

const ChildScreen: FC = () => {
    const now = new Date();
    const [AMactive, setAMactive] = useState(now.getHours() < 12);

    const [time, setTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
        AMactive: AMactive,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setTime({
                hours: now.getHours(),
                minutes: now.getMinutes(),
                seconds: now.getSeconds(),
                AMactive
            });

            if (now.getHours() >= 12) setAMactive(false)
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <AnalogAM time={time} />
            <AnalogPM time={time} />
        </>
    );
};

export default ChildScreen;