import { useState } from 'react';
import { Button, TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
type RegistrationProps = {
    switchToLogin: () => void;
};
export default function Registration({ switchToLogin }: RegistrationProps) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(prev => !prev);

    return (
        <div className="w-full h-auto bg-white shadow-2xl flex flex-col rounded-xl p-4 text-[#1E293B] lg:w-[500px] lg:p-6">
            <h2 className='text-[24px] lg:text-[28px] font-bold'>
                Let's get you an account!
            </h2>
            <p className='text-[14px] lg:text-[14px] font-light mb-[30px]'>
                Ready to create and showcase your own network of connections?
                As the saying goes, <span className='font-normal italic'>“It’s a small world”</span> — let’s explore just how wide your net really is!
            </p>
            <div className='flex flex-col gap-4'>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    label="Your email"
                    variant="outlined"
                    fullWidth
                    type="email"
                />
                <TextField
                    label="Create a password"
                    variant="outlined"
                    fullWidth
                    type={showPassword ? "text" : "password"}
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
                        )
                    }}
                />
            </div>
            <Button
                variant="contained"
                fullWidth
                sx={{
                    mt: 3,
                    backgroundColor: '#10B981',
                    '&:hover': {
                        backgroundColor: '#0f9a6e',
                    },
                    textTransform: 'none',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    py: 1.5,
                    borderRadius: 2,
                    boxShadow: 'none',
                }}
            >
                Create account
            </Button>
            <p className="text-[14px] font-light mt-4">
                Already a user?{' '}
                <span
                    onClick={switchToLogin}
                    className="font-normal cursor-pointer text-[#10B981] hover:underline"
                >
                    Login
                </span>
            </p>
        </div>
    );
}
