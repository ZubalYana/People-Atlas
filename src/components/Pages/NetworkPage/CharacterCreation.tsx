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
} from "@mui/material";
import { useState } from "react";

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
    interests?: string;
    relatedEvents?: string;
    howDidYouMeet?: string;
    notes?: string;
    [key: string]: any;
}

interface CharacterCreationProps {
    open: boolean;
    onClose: () => void;
    initialData?: CharacterData;
    onSave: (data: CharacterData) => void;
}

const steps = ["Basic Info", "Contact", "Additional", "Details"];

export default function CharacterCreation({
    open,
    onClose,
    initialData = {},
    onSave,
}: CharacterCreationProps) {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState<CharacterData>(initialData);
    const [error, setError] = useState("");

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
            onClose();
        }
    };

    const handleBack = () => setActiveStep((prev) => prev - 1);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle><h2> Create Character</h2></DialogTitle>
            <DialogContent>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

                {activeStep === 0 && (
                    <>
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
                            label="Patronymic"
                            fullWidth
                            value={formData.patronymic || ""}
                            onChange={handleChange("patronymic")}
                            sx={{ mt: 2 }}
                        />
                        <TextField
                            label="AKA ( nickname )"
                            fullWidth
                            value={formData.nickname || ""}
                            onChange={handleChange("nickname")}
                            sx={{ mt: 2 }}
                        />
                    </>
                )}

                {activeStep === 1 && (
                    <>
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
                            label="Instagram"
                            fullWidth
                            value={formData.instagram || ""}
                            onChange={handleChange("instagram")}
                            sx={{ mt: 2 }}
                        />
                        <TextField
                            label="Telegram"
                            fullWidth
                            value={formData.telegram || ""}
                            onChange={handleChange("telegram")}
                            sx={{ mt: 2 }}
                        />
                        <TextField
                            label="Facebook"
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
                    </>
                )}

                {activeStep === 2 && (
                    <>
                        <TextField
                            label="Birthday"
                            fullWidth
                            value={formData.birthday || ""}
                            onChange={handleChange("birthday")}
                            sx={{ mt: 2 }}
                        />
                        <TextField
                            label="Tags"
                            fullWidth
                            value={formData.tags || ""}
                            onChange={handleChange("tags")}
                            sx={{ mt: 2 }}
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
                        <TextField
                            label="Interests"
                            fullWidth
                            value={formData.interests || ""}
                            onChange={handleChange("interests")}
                            sx={{ mt: 2 }}
                            multiline
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
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                {activeStep > 0 && <Button onClick={handleBack}>Back</Button>}
                <Button onClick={handleNext} variant="contained">
                    {activeStep === steps.length - 1 ? "Save" : "Next"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
