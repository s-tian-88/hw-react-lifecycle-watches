import classes from './watch.module.css';
import { IWatchData, IWatchState } from '../../types';
import React, { useEffect, useState } from 'react';

export interface IWatchProps {
    item: IWatchData;
    handle: (name: string) => void;
}
export const Watch: React.FC<IWatchProps> = (props) => {

    const { item, handle } = props;
    const { title, timezone } = item;

    const [watchState, setWatchState] = useState<IWatchState>({
        loaded: false,
        hour: '',
        minute: '',
        second: '',
    })

    const watchHandle = (event: React.MouseEvent<HTMLButtonElement>) => {
        handle(event.currentTarget.name)

    }

    let loadDataInterval: ReturnType<typeof setInterval>;

    const loadData = () => {

        loadDataInterval = setInterval(() => {

            const ts = Date.now();
            const utcTs = ts + (new Date().getTimezoneOffset() * 60 * 1000)
            const titleTs = utcTs + (timezone * 60 * 60 * 1000)
            const d = new Date(titleTs);

            const hr = d.getHours(), min = d.getMinutes(), sec = d.getSeconds()

            const hrRotate = hr * 30 + 0.5 * min, minRotate = min * 6, secRotate = sec * 6;

            setWatchState({
                ...watchState,
                loaded: true,
                hour: hrRotate.toString(),
                minute: minRotate.toString(),
                second: secRotate.toString(),
            })

        }, 1000);

    }

    useEffect(() => {

        loadData();

        return () => {
            window.clearTimeout(loadDataInterval);
        }
    }, []);


    const reactEl = (
        <div className={ classes["watch-container"]} >
            <div className={ classes["watch-title"] }>{ title }</div>
            { watchState.loaded && <>
                <div className={ classes["hour"] } style={{ transform: `rotate(${watchState.hour}deg)` }}></div>
                <div className={ classes["minute"] } style={{ transform: `rotate(${watchState.minute}deg)` }}></div>
                <div className={ classes["second"] } style={{ transform: `rotate(${watchState.second}deg)` }}></div>
            </> || <div className={ classes["loading"] }>Loading...</div>
            }
            <div className={ classes["close"] }>
                <button 
                    name={ title }
                    className={ classes["close-btn"] }
                    onClick={ watchHandle }
                ></button>
            </div>
        </div>
    )

    return reactEl;
}
