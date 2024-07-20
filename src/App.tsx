import { useState } from 'react';
import './App.css'
import { Watch } from './components/Watch'
import { Form } from './components/Form';
import { IWatchData, IForm } from './types';


function App() {

    const [watchItems, setWatchItems] = useState<IWatchData[]>([
        {title: 'Moscow', timezone: 3},
        {title: 'New York', timezone: -4},
        {title: 'Tokyo', timezone: 9},
        {title: 'Тында', timezone: 9},
    ])

    const closeWatch = (name: string): void => {
        setWatchItems((prev) => prev.filter(i => i.title !== name))
    }

    const addWatch = (item: IForm): void => {

        if ( watchItems.map(i => i.title).includes(item.title) ) {
            alert(`${item.title} уже существует`)
            return;
        };

        setWatchItems((prev) => [...prev, item]);
    }


    return (
        <>
            <Form handle={ addWatch }/>
                <div className="watches-container">
                    { watchItems.map(item => <Watch key={ item.title } item={ item } handle={ closeWatch }/>) }
                </div>
        </>
    )

}


export default App
