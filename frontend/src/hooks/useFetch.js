import { useState, useEffect } from "react"; 

export default function useFetch(fn) { 
    const [data,setData] = useState(null); 

    useEffect(()=> { 
        fn().then(setData); 
    }, []); 

    return data; 
}