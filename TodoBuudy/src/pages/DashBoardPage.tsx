import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../redux/store";
import { logout } from "../redux/authSlice";
import Button from "../components/Button";
import DashboardHeader from "../components/Header";

const DashboardPage: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
//making changes to push branch on github
    return (
        <>
            <DashboardHeader/>
            <div className="p-6">
                <h1 className="text-xl font-bold">Welcome to Dashboard</h1>
                <p className="mt-2">ID: {user?.user}</p>
                <p>Role: {user?.role}</p>
                <Button
                    variant="danger"
                    onClick={() => {
                        dispatch(logout());
                    }}
                    className="mt-4"
                >
                    Logout
                </Button>
            </div>
        </>
    );
};

export default DashboardPage;
