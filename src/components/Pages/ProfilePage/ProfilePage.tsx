import { useEffect, useState } from "react";
import { useAuthStore } from "../../../stores/useAuthStore";
import { UserCircle2, LogOut, Pencil, Cake, MapPin } from "lucide-react";
import PageLayout from "../../PageLayout";
import { Button } from "@mui/material";
import UserModification from "./UserModification";
export default function ProfilePage() {
    const { user, fetchUser } = useAuthStore();
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (!user) fetchUser();
    }, [user, fetchUser]);

    const character = user?.character;
    const photoUrl = character?.photo;

    const countAge = () => {
        const today = new Date();
        const birthDate = new Date(character?.birthday || "");
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
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
                            {character?.nickname ? (
                                <h3 className="text-[22px] font-bold text-[#1E293B]">
                                    {character.name} {character.lastName}, AKA {character.nickname}
                                </h3>
                            ) : (
                                <h3 className="text-[22px] font-bold text-[#1E293B]">
                                    {character?.name} {character?.lastName}
                                </h3>
                            )}
                            <p className="text-[16px]">{user?.email}</p>
                        </div>
                    </div>
                    <div className="mt-2">
                        {character?.birthday && (
                            <div className="flex items-end mt-3">
                                <Cake strokeWidth={1.5} size={26} className="mr-2" />
                                <p className="text-[16px]">
                                    Born on <span className="font-semibold text-[#1E293B]">{new Date(character.birthday).toLocaleDateString()}</span>, Age: <span className="font-semibold text-[#1E293B]">{countAge()}</span>
                                </p>
                            </div>
                        )}
                        {character?.address && (
                            <div className="flex items-end mt-3">
                                <MapPin strokeWidth={1.5} size={26} className="mr-2" />
                                <p className="text-[16px]">
                                    Address: <span className="font-semibold text-[#1E293B]">{character.address}</span>
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="w-[380px] flex gap-4 mt-4">
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
                onSave={() => setModalOpen(false)}
                initialData={{}}
            />

        </PageLayout>
    )
}
