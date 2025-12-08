export default function Card({ children }) { 
    return ( 
        <div className="border p-4 rounded shadow-sm bg-white">
            {children}
        </div>
    );
}