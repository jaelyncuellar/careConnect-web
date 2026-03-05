

import { useState, useEffect } from "react"; 

export default function useFetch(fn) { 
    // creates place to store the data - start with nothing - do to avoid sharing data 
    const [data,setData] = useState(null); // later - actual fetched data 

    useEffect(()=> { 
        fn().then(setData); // then - when ur done, run this 
        // call the fn 
        // when done, do something else with result (eg then(setData)) - store result in data using setData
    }, []); // empty[] means run only once when the comp appears 

    return data; 
}