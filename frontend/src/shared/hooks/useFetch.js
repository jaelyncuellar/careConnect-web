import { useState, useEffect } from "react"; 

export default function useFetch(fn) { 
    // creates place to store the data - start with nothing - do to avoid sharing data 
    const [data,setData] = useState(null); // later - actual fetched data 

    useEffect(()=> { 
        fn().then(setData); 
    }, []); 

    return data; 
}