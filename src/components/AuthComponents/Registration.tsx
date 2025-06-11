import { useState } from 'react';
import { Button, TextField, InputAdornment, IconButton, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAlertStore } from '../../stores/useAlertStore';

type RegistrationProps = {
    switchToLogin: () => void;
};

export default function Registration({ switchToLogin }: RegistrationProps) {
    const [step, setStep] = useState<'form' | 'verify'>('form');
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    const { message, severity, setAlert, clearAlert } = useAlertStore();

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const isPasswordStrong = (pwd: string) =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(pwd);

    const handleSubmit = async () => {
        clearAlert();

        if (!isPasswordStrong(password)) {
            setAlert('Password must be at least 8 characters long and include letters and numbers.', 'error');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setAlert('Verification code sent to your email.', 'success');
            setStep('verify');
        } catch (err: any) {
            setAlert(err.message || 'Registration failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async () => {
        clearAlert();
        setLoading(true);
        try {
            const res = await fetch('/api/auth/verify-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            localStorage.setItem('token', data.token);
            setAlert('Verification successful! Redirecting...', 'success');
            setTimeout(() => (window.location.href = '/'), 1500);
        } catch (err: any) {
            setAlert(err.message || 'Verification failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-auto bg-white shadow-2xl flex flex-col rounded-xl p-4 text-[#1E293B] lg:w-[500px] lg:p-6">
            <h2 className="text-[24px] lg:text-[28px] font-bold">Let's get you an account!</h2>
            <p className="text-[14px] lg:text-[14px] font-light mb-[30px]">
                {step === 'form' ? (
                    <>
                        Ready to create and showcase your own network of connections? As the saying goes,{' '}
                        <span className="font-normal italic">“It’s a small world”</span> — let’s explore just how wide your net really is!
                    </>
                ) : (
                    'We’ve sent you a 6-digit code. Enter it below to verify your account.'
                )}
            </p>

            {message && <Alert severity={severity!} sx={{ mb: 2 }}>{message}</Alert>}

            {step === 'form' ? (
                <div className="flex flex-col gap-4">
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading}
                    />
                    <TextField
                        label="Your email"
                        variant="outlined"
                        fullWidth
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />
                    <TextField
                        label="Create a password"
                        variant="outlined"
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={togglePasswordVisibility}
                                        edge="end"
                                        aria-label="toggle password visibility"
                                        disabled={loading}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleSubmit}
                        disabled={loading}
                        sx={{
                            mt: 2,
                            backgroundColor: '#10B981',
                            '&:hover': { backgroundColor: '#0f9a6e' },
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            py: 1.5,
                            borderRadius: 2,
                            boxShadow: 'none',
                        }}
                    >
                        {loading ? 'Sending code...' : 'Create account'}
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    <TextField
                        label="Verification Code"
                        variant="outlined"
                        fullWidth
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        disabled={loading}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleVerify}
                        disabled={loading}
                        sx={{
                            mt: 2,
                            backgroundColor: '#10B981',
                            '&:hover': { backgroundColor: '#0f9a6e' },
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            py: 1.5,
                            borderRadius: 2,
                            boxShadow: 'none',
                        }}
                    >
                        {loading ? 'Verifying...' : 'Verify & Continue'}
                    </Button>
                </div>
            )}

            <p className="text-[14px] font-light mt-4">
                Already a user?{' '}
                <span onClick={switchToLogin} className="font-normal cursor-pointer text-[#10B981] hover:underline">
                    Login
                </span>
            </p>
        </div>
    );
}
