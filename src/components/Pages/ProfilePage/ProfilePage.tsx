import { useEffect, useState } from "react";
import { useAuthStore } from "../../../stores/useAuthStore";
import { UserCircle2, LogOut, Pencil } from "lucide-react";
import PageLayout from "../../PageLayout";
import { Button } from "@mui/material";
import UserModification from "./UserModification";
import { useAlertStore } from "../../../stores/useAlertStore";
export default function ProfilePage() {
    const { user, fetchUser } = useAuthStore();
    const [modalOpen, setModalOpen] = useState(false);
    const { message, severity, setAlert, clearAlert } = useAlertStore();

    useEffect(() => {
        if (!user) fetchUser();
    }, [user, fetchUser]);

    const handleCharacterCreationClick = () => {
        setModalOpen(true);
    };

    const handleCharacterSave = async (data: any) => {
        try {
            const formData = new FormData();

            if (data.photo) {
                formData.append("photo", data.photo);
            }

            const fields = [
                "name",
                "lastName",
                "nickname",
                "phone",
                "email",
                "instagram",
                "telegram",
                "facebook",
                "address",
                "birthday",
                "relatedEvents",
                "howDidYouMeet",
                "notes",
            ];

            fields.forEach((field) => {
                if (data[field]) {
                    formData.append(field, data[field]);
                }
            });

            const arrayFields = ["tags", "interests", "otherRelationships"];
            arrayFields.forEach((field) => {
                if (Array.isArray(data[field])) {
                    data[field].forEach((value: string) => {
                        formData.append(field, value);
                    });
                }
            });

            const response = await fetch("http://localhost:5000/api/characters", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setAlert("Character created successfully", "success");
                setModalOpen(false);
            } else {
                setAlert(result.message || "Server error while creating character", "error");
            }
        } catch (error) {
            setAlert("Failed to create character. Please try again.", "error");
        }
    };

    const character = user?.character;
    const photoUrl = character?.photo;
    return (
        <PageLayout>
            <div className="w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold">Your Profile:</h1>
                <div className="w-full flex flex-col lg:h-[90%]">
                    <div className="flex">
                        <div className="w-[90px] h-[90px] rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
                            {photoUrl ? (
                                <img
                                    src={photoUrl}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <UserCircle2 className="w-full h-full text-[#10B981]" strokeWidth={1.5} />
                            )}
                        </div>
                        <div className="pt-2 ml-3">
                            <h3 className="text-[22px] font-bold text-[#1E293B]">{character?.name} {character?.lastName}</h3>
                            <p className="text-[16px]">{user?.email}</p>
                        </div>
                    </div>
                    <div className="w-[380px] flex gap-4 mt-3">
                        <Button
                            onClick={() => setModalOpen(true)}
                            variant="outlined"
                            fullWidth
                            sx={{
                                px: 3,
                                py: 1.2,
                                borderRadius: 2,
                                borderColor: '#3237d5',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                textTransform: 'none',
                                boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                                color: '#3237d5',
                                '&:hover': {
                                    borderColor: '#242898',
                                    color: '#242898',
                                    backgroundColor: 'rgba(213, 50, 50, 0.04)',
                                },
                                '&.Mui-disabled': {
                                    backgroundColor: '#ccc',
                                },
                            }}
                        >
                            <Pencil strokeWidth={1.5} className="mr-2" />
                            Edit
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            sx={{
                                px: 3,
                                py: 1.2,
                                borderRadius: 2,
                                borderColor: '#d53232',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                textTransform: 'none',
                                boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                                color: '#d53232',
                                '&:hover': {
                                    borderColor: '#a82828',
                                    color: '#a82828',
                                    backgroundColor: 'rgba(213, 50, 50, 0.04)',
                                },
                                '&.Mui-disabled': {
                                    backgroundColor: '#ccc',
                                },
                            }}
                        >
                            <LogOut strokeWidth={1.5} className="mr-2" />
                            Log out
                        </Button>
                    </div>
                </div>
            </div>

            <UserModification
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleCharacterSave}
                initialData={{}}
            />
        </PageLayout>
    )
}
