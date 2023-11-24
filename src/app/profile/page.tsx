"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast/headless';
import { useState, useEffect } from 'react'
import Link from 'next/link';


export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState('nothing')
    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logout Successfully');
            router.push('/login');
        } catch (err: any) {
            console.log(err.message)
            toast.error(err.message)
        }
    };

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        setData(res.data.data._id)
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-3xl font-bold">Profile</h1>
            <h2 className='text-xl text-green-500 underline'>{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <button className="border-2 rounded-xl px-4 py-2 mt-2" onClick={logout}>Logout</button>
        </div>
    );
}
