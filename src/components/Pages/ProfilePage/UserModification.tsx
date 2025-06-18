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
import dayjs from 'dayjs';

interface CharacterData {
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
    tags?: string[];
    otherRelationships?: string[];
    interests?: string[];
    relatedEvents?: string;
    howDidYouMeet?: string;
    notes?: string;
    [key: string]: any;
}

interface UserModificationProps {
    open: boolean;
    onClose: () => void;
    initialData?: CharacterData;
    onSave: (data: CharacterData) => void;
}

const steps = ["Basic Info", "Contact", "Additional", "Details"];

export default function UserModification({
    open,
    onClose,
    initialData = {},
    onSave,
}: UserModificationProps) {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState<CharacterData>(() => ({
        name: "",
        lastName: "",
        nickname: "",
        phone: "",
        email: "",
        instagram: "",
        telegram: "",
        facebook: "",
        address: "",
        tags: [],
        otherRelationships: [],
        birthday: "",
        interests: [],
        relatedEvents: "",
        howDidYouMeet: "",
        notes: "",
        ...initialData,
    }));

    useEffect(() => {
        if (open && initialData) {
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
                tags: [],
                otherRelationships: [],
                birthday: "",
                interests: [],
                relatedEvents: "",
                howDidYouMeet: "",
                notes: "",
                ...initialData,
            });

            if (initialData.photo) {
                setPhotoPreview(typeof initialData.photo === "string" ? initialData.photo : null);
            }
        }
    }, [initialData, open]);

    const [error, setError] = useState("");
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const defaultTags = [
        "Friend",
        "Relative",
        "Acquaintance",
        "Classmate",
        "Romantic",
    ];

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


    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep((prev) => prev + 1);
        } else {
            if (!formData.name) {
                setError("Name is required");
                return;
            }
            setError("");
            onSave(formData);
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
                tags: [],
                otherRelationships: [],
                birthday: "",
                interests: [],
                relatedEvents: "",
                howDidYouMeet: "",
                notes: "",
            });

            console.log(formData)

            setActiveStep(0);
            setPhotoPreview(null);
            onClose();
        }
    };

    const handleBack = () => setActiveStep((prev) => prev - 1);

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
                                slotProps={{ textField: { fullWidth: true, sx: { mt: 2, mb: 2 } } }}
                            />
                        </LocalizationProvider>
                        <Autocomplete
                            multiple
                            freeSolo
                            options={defaultTags}
                            value={formData.tags || []}
                            onChange={(_, newValue) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    tags: newValue,
                                }))
                            }
                            renderTags={(value: readonly string[], getTagProps) =>
                                value.map((option: string, index: number) => {
                                    const { key, ...tagProps } = getTagProps({ index });
                                    return (
                                        <Chip
                                            key={key}
                                            label={option}
                                            variant="outlined"
                                            {...tagProps}
                                            sx={{ borderRadius: "8px" }}
                                        />
                                    );
                                })
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Tags"
                                    placeholder="Add a tag"
                                />
                            )}
                        />
                        <TextField
                            label="Other Relationships"
                            fullWidth
                            value={formData.otherRelationships || ""}
                            onChange={handleChange("otherRelationships")}
                            sx={{ mt: 2 }}
                        />
                    </>
                )}

                {activeStep === 3 && (
                    <>
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
                            label="Related Events"
                            fullWidth
                            value={formData.relatedEvents || ""}
                            onChange={handleChange("relatedEvents")}
                            sx={{ mt: 2 }}
                        />
                        <TextField
                            label="How you met"
                            fullWidth
                            value={formData.howDidYouMeet || ""}
                            onChange={handleChange("howDidYouMeet")}
                            sx={{ mt: 2 }}
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
