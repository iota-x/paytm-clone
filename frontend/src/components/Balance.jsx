import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Balance = () => {
    const [balance, setBalance] = useState(null); // Initialize balance state with null
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setBalance(response.data.balance.toFixed(2));
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        fetchBalance();
    }, []);


    const handleSignOut = () => {
        localStorage.setItem('token', null);
        navigate("/signin");
        alert("You have been successfully signed out");
    };

    return (
        <div className="flex justify-between">
            <div className="m-8 font-bold text-md pt-1 px-4 pb-4">
                {balance !== null && <div>Available balance: {balance} ₹</div>}
            </div>
            <div className="m-8 font-bold text-md pt-1 px-4 pb-4">
            <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Sign Out
            </button>
            </div>
        </div>
    );
};

export default Balance;