import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AppNav from './AppNav';

function User({ component: Component, userDetails, setUserDetails, ...rest }) {
    const navigate = useNavigate();
    const [fetched, setFetched] = useState(userDetails !== null);

    const fetchUserDetails = async () => {
        if(fetched)
            return;
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/getDetails`);
            setUserDetails(res.data.data);
            setFetched(true);
        } catch (e) {
            
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            delete axios.defaults.headers.common["auth-token"];
        } else {
            axios.defaults.headers.common["auth-token"] = token;
        }
        fetchUserDetails();
    }, [])

    return (
        <>
            <AppNav />
            {fetched && <Component {...rest} userDetails={userDetails} setUserDetails={setUserDetails}/>}
        </>
    )
}

export default User