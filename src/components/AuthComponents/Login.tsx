import { Button, TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

type LoginProps = {
    switchToRegister: () => void;
};
export default function Login({ switchToRegister }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <div className="w-full h-auto bg-white shadow-xl flex flex-col rounded-xl p-4 text-[#1E293B] lg:w-[500px] lg:p-6">
            <h2 className="text-[24px] lg:text-[28px] font-bold">Welcome back!</h2>
            <p className="text-[14px] lg:text-[14px] font-light mb-[30px]">
                We have missed you already! Please log in to your account.
            </p>
            <div className="flex flex-col gap-4">
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={togglePasswordVisibility}
                                    edge="end"
                                    aria-label="toggle password visibility"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <Button
                variant="contained"
                sx={{
                    mt: 3,
                    backgroundColor: '#10B981',
                    '&:hover': { backgroundColor: '#0f9f75' },
                    textTransform: 'none',
                    fontWeight: 'bold',
                    paddingY: 1.5,
                    fontSize: '16px'
                }}
            >
                Log in
            </Button>
            <p className="text-[14px] font-light mt-4">
                Don't have an account?{' '}
                <span
                    onClick={switchToRegister}
                    className="font-normal cursor-pointer text-[#10B981] hover:underline"
                >
                    Register
                </span>
            </p>
        </div >
    );
}
