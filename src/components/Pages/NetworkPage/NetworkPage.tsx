import { useEffect } from "react";
import PageLayout from "../../PageLayout";
import { useAuthStore } from "../../../stores/useAuthStore";
import { UserCircle2 } from "lucide-react";

export default function NetworkPage() {
    const { user, fetchUser } = useAuthStore();

    useEffect(() => {
        if (!user) fetchUser();
    }, [user, fetchUser]);

    const photoUrl = user?.character?.photo;

    return (
        <PageLayout>
            <div className="w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold">Your connections network:</h1>

                <div className="w-full flex justify-center items-center lg:h-[90%]">

                    <div className="w-[60px] flex flex-col items-center">
                        <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center bg-gray-100 ">
                            {photoUrl ? (
                                <img
                                    src={photoUrl}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <UserCircle2 className="w-full h-full text-[#10B981] cursor-pointer" strokeWidth={1.5} />
                            )}
                        </div>
                        <p className="text-[#1E293B] text-[12px] font-semibold">{user?.character?.name}</p>
                    </div>

                </div>
            </div>
        </PageLayout>
    );
}
