import React,  { useMemo, useState } from 'react';
import { Navbar } from '../NavBar/NavBar';
import { Scheduler } from '../Scheduler/Schduler'


export const Main = () => {
    let [therapists, setTherapists] = useState([])

    useMemo(() => {
        // PUT request using fetch inside useEffect React hook
        fetch('https://jsonplaceholder.typicode.com/posts/')
            .then(response => response.json())
            .then(data => setTherapists(data));   
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
    return (
        <div>
            <Navbar />
            <div>
                <Scheduler therapists={therapists} />
            </div>
        </div>
    )
}