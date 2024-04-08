
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerUser } from "@/utils/actions"
import { useState } from "react"
import { Spinner } from "../Spinner/Spinner"
import { redirect } from 'next/navigation'
import styles from './RegisterWindow.module.css';


export function RegisterWindow() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [shake, setShake] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const result = await registerUser(formData);


        if (result === true) {
            setMessage('Registration successful');
            setFormData({ username: '', password: '' });
            setLoading(false);
            setShowMessage(true);
            setIsSuccess(true);
            setTimeout(() => {
                redirect('/login')
            }, 3000);
        } else {
            setShake(true);
            setIsSuccess(false);
            setTimeout(() => setShake(false), 500);
            setShowMessage(true);
            setMessage(result);
            setLoading(false);
        }
    };

    return (
        <Card className={`mx-auto max-w-sm ${shake ? styles.shake : ''}`}>
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                placeholder="Cecilio"
                                required
                                value={formData.username}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? <Spinner /> : 'Create an account'}
                        </Button>

                        {showMessage && isSuccess && (
                            <div className={`mt-4 w-3/4 mx-auto text-center bg-green-500 text-white font-bold py-2 px-4 rounded shadow-lg text-sm ${styles.slideDown}`}>
                                {message}
                            </div>
                        )}
                        {showMessage && !isSuccess && (
                            <div className={`mt-4 w-3/4 mx-auto text-center bg-red-500 text-white font-bold py-2 px-4 rounded shadow-lg text-sm ${styles.slideDown}`}>
                                {message}
                            </div>
                        )}
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Sign in
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
