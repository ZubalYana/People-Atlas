import { useEffect, useRef, useState } from "react";
import { Network, DataSet } from "vis-network/standalone";
import type { Node } from "vis-network/standalone";
import type { Edge } from "vis-network/standalone";
import "vis-network/styles/vis-network.css";

import PageLayout from "../../PageLayout";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useAlertStore } from "../../../stores/useAlertStore";
import { Plus } from "lucide-react";
import CharacterCreation from "./CharacterCreation";
import { Button } from "@mui/material";
import axios from "axios";

interface Character {
    _id: string;
    name: string;
    lastName: string;
    nickname: string;
    birthday: string;
    address: string;
    phone: string;
    email: string;
    telegram: string;
    facebook: string;
    instagram: string;
    howDidYouMeet: string;
    interests: string[];
    isUser: boolean;
    tags: string[];
    photo: string;
    notes: string;
    relatedEvents: string;
    otherRelationships: any[];
    __v: number;
}
export default function NetworkPage() {
    const { user, fetchUser } = useAuthStore();
    const { setAlert } = useAlertStore();
    const [modalOpen, setModalOpen] = useState(false);

    const networkContainerRef = useRef<HTMLDivElement>(null);
    const networkRef = useRef<Network | null>(null);

    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
        axios.get("/api/characters")
            .then((res) => setCharacters(res.data))
            .catch((err) => console.error("Fetch error", err));
    }, []);
    console.log(characters)

    useEffect(() => {
        if (!user) fetchUser();
    }, [user, fetchUser]);

    const buildNetworkData = () => {
        if (!user) return { nodes: [], edges: [] };

        const userNode: Node = {
            id: user._id,
            label: user.character?.name || "You",
            shape: "circularImage",
            image: user.character?.photo || "./default-user-icon.png",
            size: 60,
            font: { size: 16, color: "#1E293B", face: "Arial, sans-serif" },
        };

        const otherNodes: Node[] = characters
            .filter((char) => char._id !== user.character?._id)
            .map((char) => ({
                id: char._id,
                label: char.name,
                shape: "circularImage",
                image: char.photo || "./default-user-icon.png",
                size: 40,
                font: { size: 14, color: "#334155", face: "Arial, sans-serif" },
            }));

        const edges: Edge[] = otherNodes.map((charNode) => ({
            from: user._id,
            to: charNode.id,
            color: { color: "#10B981" },
            width: 2,
            smooth: {
                enabled: true,
                type: "cubicBezier",
                roundness: 0.5,
            },
        }));

        return {
            nodes: [userNode, ...otherNodes],
            edges,
        };
    };

    useEffect(() => {
        if (!networkContainerRef.current || !user) return;

        const { nodes, edges } = buildNetworkData();

        const data = {
            nodes: new DataSet(nodes),
            edges: new DataSet(edges),
        };

        const options = {
            nodes: {
                shape: "circularImage",
                borderWidth: 0,
                size: 40,
                color: {
                    border: "transparent",
                    background: "#fff",
                    highlight: {
                        border: "transparent",
                        background: "#fff",
                    },
                    hover: {
                        border: "transparent",
                        background: "#D6F3EA",
                    },
                },
                font: {
                    color: "#1E293B",
                    size: 14,
                    face: "Arial, sans-serif",
                    vadjust: 0,
                    strokeWidth: 0,
                    align: "top",
                },
                shadow: false,
            },
            edges: {
                color: "#10B981",
                smooth: {
                    enabled: true,
                    type: "cubicBezier",
                    roundness: 0.5,
                },
                shadow: false,
            },
            interaction: {
                hover: true,
                tooltipDelay: 200,
                hoverConnectedEdges: false,
                selectConnectedEdges: false,
                zoomView: true,
                dragView: true,
                dragNodes: true,
            },
            physics: {
                stabilization: true,
                barnesHut: {
                    gravitationalConstant: -3000,
                    springLength: 100,
                    springConstant: 0.05,
                    damping: 0.09,
                },
            },

        };

        if (networkRef.current) {
            networkRef.current.destroy();
            networkRef.current = null;
        }

        const network = new Network(networkContainerRef.current, data, options);
        networkRef.current = network;

        network.on("zoom", ({ scale }) => {
            const minZoom = 0.5;
            const maxZoom = 2;

            if (scale < minZoom) {
                network.moveTo({ scale: minZoom });
            } else if (scale > maxZoom) {
                network.moveTo({ scale: maxZoom });
            }
        });

        return () => {
            network.destroy();
            networkRef.current = null;
        };
    }, [user]);

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

    return (
        <PageLayout>
            <div className="relative flex flex-col h-full w-full items-center justify-center">
                <h1 className="text-2xl font-semibold mb-4">Your connections network:</h1>

                <div
                    ref={networkContainerRef}
                    style={{ width: "100%", height: "600px", borderRadius: "10px", border: "1px solid #ccc" }}
                />

                <Button
                    variant="contained"
                    onClick={handleCharacterCreationClick}
                    sx={{
                        backgroundColor: "#10B981",
                        "&:hover": { backgroundColor: "#0f9f75" },
                        position: "absolute",
                        bottom: 20,
                        right: 20,
                        padding: "20px",
                        borderRadius: "50%",
                    }}
                >
                    <Plus strokeWidth={4} size={24} />
                </Button>

                <CharacterCreation
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSave={handleCharacterSave}
                    initialData={{}}
                />
            </div>
        </PageLayout>
    );
}
