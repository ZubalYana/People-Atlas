import { useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
export default function ProfilePage() {
    return (
        <PageLayout>
            <div className="w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold">Your Profile:</h1>
            </div>
        </PageLayout>
    )
}
