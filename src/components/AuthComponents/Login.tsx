import {
    Button,
    TextField,
    IconButton,
    InputAdornment,
    Alert,
    CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useAlertStore } from '../../stores/useAlertStore';
import { useNavigate } from 'react-router-dom'

type LoginProps = {
    switchToRegister: () => void;
};

export default function Login({ switchToRegister }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { message, severity, setAlert, clearAlert } = useAlertStore();

    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleLogin = async () => {
        clearAlert();
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('token', data.token);
            setAlert('Logged in successfully!', 'success');

            setEmail('');
            setPassword('');
            navigate('/')
        } catch (error: any) {
            setAlert(error.message || 'Something went wrong', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-auto bg-white shadow-xl flex flex-col rounded-xl p-4 text-[#1E293B] lg:w-[500px] lg:p-6">
            <h2 className="text-[24px] lg:text-[28px] font-bold">Welcome back!</h2>
            <p className="text-[14px] lg:text-[14px] font-light mb-[30px]">
                We have missed you already! Please log in to your account.
            </p>

            {message && severity && (
                <Alert severity={severity} className="mb-4">
                    {message}
                </Alert>
            )}


            <div className="flex flex-col gap-4">
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
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
                onClick={handleLogin}
                disabled={loading}
                sx={{
                    mt: 3,
                    backgroundColor: '#10B981',
                    '&:hover': { backgroundColor: '#0f9f75' },
                    textTransform: 'none',
                    fontWeight: 'bold',
                    paddingY: 1.5,
                    fontSize: '16px',
                }}
                startIcon={loading && <CircularProgress size={20} sx={{ color: 'white' }} />}
            >
                {loading ? 'Logging in...' : 'Log in'}
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
        </div>
    );
}
