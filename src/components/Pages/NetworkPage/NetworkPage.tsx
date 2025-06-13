import { useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
import { useAuthStore } from "../../../stores/useAuthStore";
import { UserCircle2 } from "lucide-react";
import CharacterCreation from "./CharacterCreation";

export default function NetworkPage() {
    const { user, fetchUser } = useAuthStore();
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (!user) fetchUser();
    }, [user, fetchUser]);

    const character = user?.character;
    const photoUrl = character?.photo;

    const handleCharacterClick = () => {
        setModalOpen(true);
    };

    const handleCharacterSave = (data: any) => {
        console.log("Saved character data:", data);
    };

    return (
        <PageLayout>
            <div className="w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold">Your connections network:</h1>

                <div className="w-full flex justify-center items-center lg:h-[90%]">
                    <div
                        className="w-[60px] flex flex-col items-center cursor-pointer"
                        onClick={handleCharacterClick}
                    >
                        <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
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
                        <p className="text-[#1E293B] text-[12px] font-semibold">
                            {character?.name}
                        </p>
                    </div>
                </div>

                <CharacterCreation
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSave={handleCharacterSave}
                    initialData={character}
                />
            </div>
        </PageLayout>
    );
}
