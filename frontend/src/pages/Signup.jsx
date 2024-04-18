import { useState, useEffect } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // State to track loading status
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token !== null && token !== "null") {
          // Redirecting to dashboard if token exists and is not null
          navigate("/dashboard");
        }
      }, [navigate]);

    const handleSignUp = async () => {
        setLoading(true); // Setting loading to true when sign-up process starts
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                firstName,
                lastName,
                password
            });
            localStorage.setItem("token", response.data.token);
            navigate("/signin");
            alert("Sign-up successful!");
        } catch (error) {
            setError("Error signing up. Please try again.");
            alert("Error signing up. Please try again.");
        } finally {
            setLoading(false); // Setting loading to false when sign-up process ends (whether success or error)
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign up"} />
                    <SubHeading label={"Enter your information to create an account"} />
                    <InputBox
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="John"
                        label={"First Name"}
                    />
                    <InputBox
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                        label={"Last Name"}
                    />
                    <InputBox
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="example@gmail.com"
                        label={"Email"}
                    />
                    <InputBox
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="123456"
                        label={"Password"}
                    />
                    <div className="pt-4">
                        <Button onClick={handleSignUp} label={loading ? "Signing up..." : "Sign up"} disabled={loading} />
                    </div>
                    {error && <div className="text-red-500">{error}</div>}
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                </div>
            </div>
        </div>
    );
};
