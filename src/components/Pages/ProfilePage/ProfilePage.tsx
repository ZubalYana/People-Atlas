import { useEffect, useState } from "react";
import { useAuthStore } from "../../../stores/useAuthStore";
import { UserCircle2 } from "lucide-react";
import PageLayout from "../../PageLayout";
export default function ProfilePage() {
    const { user, fetchUser } = useAuthStore();
    useEffect(() => {
        if (!user) fetchUser();
    }, [user, fetchUser]);

    const character = user?.character;
    const photoUrl = character?.photo;
    return (
        <PageLayout>
            <div className="w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold">Your Profile:</h1>
                <div className="w-full flex lg:h-[90%]">
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
                        <div>
                            <h3>{character?.name} {character?.lastName} {character?.patronymic}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}
