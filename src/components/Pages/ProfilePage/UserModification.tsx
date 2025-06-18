import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel,
    Alert,
    Autocomplete,
    Chip
} from "@mui/material";
import { useState, useEffect } from "react";
import { UserCircle2 } from "lucide-react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useAuthStore } from "../../../stores/useAuthStore";
import { useAlertStore } from "../../../stores/useAlertStore";
import dayjs from 'dayjs';

interface UserCharacterData {
    name?: string;
    lastName?: string;
    patronymic?: string;
    nickname?: string;
    email?: string;
    phone?: string;
    instagram?: string;
    telegram?: string;
    facebook?: string;
    address?: string;
    birthday?: string;
    interests?: string[];
    notes?: string;
    photo?: File | string;
}

interface UserModificationProps {
    open: boolean;
    onClose: () => void;
    initialData?: UserCharacterData;
    onSave: (data: UserCharacterData) => void;
}

const steps = ["Basic Info", "Contact", "Other"];

export default function UserModification({
    open,
    onClose,
    initialData = {},
    onSave,
}: UserModificationProps) {
    const [activeStep, setActiveStep] = useState(0);
    const { user, fetchUser } = useAuthStore();
    const token = localStorage.getItem('token');
    const [formData, setFormData] = useState<UserCharacterData>({
        name: "",
        lastName: "",
        nickname: "",
        phone: "",
        email: "",
        instagram: "",
        telegram: "",
        facebook: "",
        address: "",
        birthday: "",
        interests: [],
        notes: "",
    });

    useEffect(() => {
        if (open) {
            const userChar = user?.character;

            setFormData({
                name: initialData?.name ?? userChar?.name ?? "",
                lastName: initialData?.lastName ?? userChar?.lastName ?? "",
                nickname: initialData?.nickname ?? userChar?.nickname ?? "",
                phone: initialData?.phone ?? userChar?.phone ?? "",
                email: initialData?.email ?? userChar?.email ?? "",
                instagram: initialData?.instagram ?? userChar?.instagram ?? "",
                telegram: initialData?.telegram ?? userChar?.telegram ?? "",
                facebook: initialData?.facebook ?? userChar?.facebook ?? "",
                address: initialData?.address ?? userChar?.address ?? "",
                birthday: initialData?.birthday ?? userChar?.birthday ?? "",
                interests: Array.isArray(initialData?.interests)
                    ? initialData.interests
                    : Array.isArray(userChar?.interests)
                        ? userChar.interests
                        : userChar?.interests
                            ? [userChar.interests]
                            : [],
                notes: initialData?.notes ?? userChar?.notes ?? "",
                photo: initialData?.photo ?? userChar?.photo ?? undefined,
            });

            const preview = initialData?.photo ?? userChar?.photo;
            if (typeof preview === "string") {
                setPhotoPreview(preview);
            }
        }
    }, [open, user, initialData]);

    const [error, setError] = useState("");
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const { setAlert } = useAlertStore();
    const defaultInterests = [
        "Music",
        "Art",
        "Travel",
        "Books",
        "Tech",
        "Gaming",
        "Fitness",
        "Cooking",
        "Photography",
        "Nature",
        "Science",
        "History",
        "Fashion",
        "Movies",
        "Writing",
        "Politics",
        "Volunteering",
    ];

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleNext = async () => {
        if (activeStep < steps.length - 1) {
            setActiveStep((prev) => prev + 1);
        } else {
            if (!formData.name) {
                setError("Name is required");
                return;
            }

            try {
                setError("");
                const updatedChar = await updateUserCharacter(formData);
                await fetchUser();
                onSave(updatedChar);
                setAlert("Profile updated successfully", "success");
                setFormData({
                    name: "",
                    lastName: "",
                    nickname: "",
                    phone: "",
                    email: "",
                    instagram: "",
                    telegram: "",
                    facebook: "",
                    address: "",
                    birthday: "",
                    interests: [],
                    notes: "",
                });
                setPhotoPreview(null);
                setActiveStep(0);
                onClose();
            } catch (err) {
                setError("Could not update profile. Please try again.");
                setAlert("Failed to update profile", "error");
            }
        }
    };


    const handleBack = () => setActiveStep((prev) => prev - 1);

    const updateUserCharacter = async (data: UserCharacterData) => {
        const form = new FormData();
        for (const key in data) {
            const value = data[key as keyof UserCharacterData];
            if (value !== undefined && value !== null) {
                form.append(key, value as any);
            }
        }

        try {
            const response = await fetch("http://localhost:5000/api/user", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: form,
            });

            if (!response.ok) {
                throw new Error("Failed to update user character");
            }

            const updated = await response.json();
            return updated;
        } catch (err) {
            console.error("Update error:", err);
            throw err;
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            PaperProps={{
                sx: {
                    maxWidth: '650px',
                    width: '100%',
                },
            }}
        >
            <DialogTitle>Modify Your Profile</DialogTitle>
            <DialogContent>
                <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    sx={{
                        "& .MuiStepIcon-root.Mui-completed": { color: "#10B981" },
                        "& .MuiStepIcon-root.Mui-active": { color: "#10B981" },
                    }}
                >

                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

                {activeStep === 0 && (
                    <div className="flex">
                        <div className="w-[380px] h-[210px] flex items-center justify-center mt-2">
                            <div className="relative w-[160px] h-[160px] rounded-full overflow-hidden border border-gray-300">
                                {photoPreview ? (
                                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <UserCircle2 className="w-full h-full text-[#10B981]" strokeWidth={1.5} />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setPhotoPreview(URL.createObjectURL(file));
                                            setFormData({ ...formData, photo: file });
                                        }
                                    }}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>

                        </div>
                        <div className="h-full">
                            <TextField
                                label="Name"
                                fullWidth
                                value={formData.name || ""}
                                onChange={handleChange("name")}
                                sx={{ mt: 2 }}
                                required
                            />
                            <TextField
                                label="Last Name"
                                fullWidth
                                value={formData.lastName || ""}
                                onChange={handleChange("lastName")}
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                label="AKA ( nickname )"
                                fullWidth
                                value={formData.nickname || ""}
                                onChange={handleChange("nickname")}
                                sx={{ mt: 2 }}
                            />
                        </div>

                    </div>
                )}

                {activeStep === 1 && (
                    <div className="flex gap-3">
                        <div className="w-[50%]">
                            <TextField
                                label="Email"
                                fullWidth
                                value={formData.email || ""}
                                onChange={handleChange("email")}
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                label="Phone"
                                fullWidth
                                value={formData.phone || ""}
                                onChange={handleChange("phone")}
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                label="Instagram ( only username )"
                                fullWidth
                                value={formData.instagram || ""}
                                onChange={handleChange("instagram")}
                                sx={{ mt: 2 }}
                            />
                        </div>
                        <div className="w-[50%]">
                            <TextField
                                label="Telegram ( username if exists )"
                                fullWidth
                                value={formData.telegram || ""}
                                onChange={handleChange("telegram")}
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                label="Facebook ( only username )"
                                fullWidth
                                value={formData.facebook || ""}
                                onChange={handleChange("facebook")}
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                label="Address"
                                fullWidth
                                value={formData.address || ""}
                                onChange={handleChange("address")}
                                sx={{ mt: 2 }}
                            />
                        </div>
                    </div>
                )}

                {activeStep === 2 && (
                    <>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Birthday"
                                value={formData.birthday ? dayjs(formData.birthday) : null}
                                onChange={(newValue) => {
                                    setFormData({ ...formData, birthday: newValue?.format("YYYY-MM-DD") });
                                }}
                                slotProps={{ textField: { fullWidth: true, sx: { mt: 2 } } }}
                            />
                        </LocalizationProvider>
                        <Autocomplete
                            multiple
                            freeSolo
                            options={defaultInterests}
                            value={formData.interests || []}
                            onChange={(_, newValue) => {
                                setFormData({ ...formData, interests: newValue });
                            }}
                            renderTags={(value: readonly string[], getTagProps) =>
                                value.map((option: string, index: number) => {
                                    const { key, ...tagProps } = getTagProps({ index });
                                    return (
                                        <Chip
                                            key={key}
                                            variant="outlined"
                                            label={option}
                                            {...tagProps}
                                            sx={{ borderRadius: "8px" }}
                                        />
                                    );
                                })

                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Interests"
                                    placeholder="Type or select interests"
                                    sx={{ mt: 2 }}
                                />
                            )}
                        />
                        <TextField
                            label="Notes"
                            fullWidth
                            value={formData.notes || ""}
                            onChange={handleChange("notes")}
                            sx={{ mt: 2 }}
                        />
                    </>
                )}
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button
                    onClick={onClose}
                    sx={{ backgroundColor: '#1E293B', color: '#fff', '&:hover': { backgroundColor: '#0e141e' } }}
                >
                    Cancel
                </Button>
                {activeStep > 0 && <Button onClick={handleBack} sx={{ color: '#1E293B' }}>Back</Button>}
                <Button
                    onClick={handleNext}
                    variant="contained"
                    sx={{ backgroundColor: '#10B981', '&:hover': { backgroundColor: '#0f9f75' } }}
                >
                    {activeStep === steps.length - 1 ? "Save" : "Next"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
