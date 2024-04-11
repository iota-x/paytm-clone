import { useEffect, useState } from "react";
import axios from "axios";

export const Balance = () => {
    const [balance, setBalance] = useState(null); // Initialize balance state with null

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

    return (
        <div>
            <div className="m-8 font-bold text-md pt-1 px-4 pb-4">
                {balance !== null && <div>Available balance: {balance} ₹</div>} {/* Render balance */}
            </div>
        </div>
    );
};

export default Balance; // Don't forget to export the component
