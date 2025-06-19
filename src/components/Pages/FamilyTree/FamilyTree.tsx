import { useRef, useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import Tree from 'react-d3-tree';
import PageLayout from '../../PageLayout';
import { useAuthStore } from '../../../stores/useAuthStore';

type FamilyNode = {
    name: string;
    children?: FamilyNode[];
    photo?: string;
    isUser?: boolean;
    id?: string;
};

const treeData: FamilyNode = {
    name: 'You',
    isUser: true,
    id: 'root-user',
    children: [
        {
            name: 'Parent 1',
            id: 'parent1',
            children: [
                {
                    name: 'Grandparent 1',
                    id: 'grandparent1',
                    children: [
                        {
                            name: 'Great-Grandparent 1',
                            id: 'greatgrandparent1',
                            children: [
                                { name: 'Great-Great-Grandparent 1', id: 'gggrandparent1' },
                                { name: 'Great-Great-Grandparent 2', id: 'gggrandparent2' },
                            ],
                        },
                        {
                            name: 'Great-Grandparent 2',
                            id: 'greatgrandparent2',
                            children: [
                                { name: 'Great-Great-Grandparent 3', id: 'gggrandparent3' },
                                { name: 'Great-Great-Grandparent 4', id: 'gggrandparent4' },
                            ],
                        },
                    ],
                },
                {
                    name: 'Grandparent 2',
                    id: 'grandparent2',
                    children: [
                        {
                            name: 'Great-Grandparent 3',
                            id: 'greatgrandparent3',
                            children: [
                                { name: 'Great-Great-Grandparent 5', id: 'gggrandparent5' },
                                { name: 'Great-Great-Grandparent 6', id: 'gggrandparent6' },
                            ],
                        },
                        {
                            name: 'Great-Grandparent 4',
                            id: 'greatgrandparent4',
                            children: [
                                { name: 'Great-Great-Grandparent 7', id: 'gggrandparent7' },
                                { name: 'Great-Great-Grandparent 8', id: 'gggrandparent8' },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: 'Parent 2',
            id: 'parent2',
            children: [
                {
                    name: 'Grandparent 3',
                    id: 'grandparent3',
                    children: [
                        {
                            name: 'Great-Grandparent 5',
                            id: 'greatgrandparent5',
                            children: [
                                { name: 'Great-Great-Grandparent 9', id: 'gggrandparent9' },
                                { name: 'Great-Great-Grandparent 10', id: 'gggrandparent10' },
                            ],
                        },
                        {
                            name: 'Great-Grandparent 6',
                            id: 'greatgrandparent6',
                            children: [
                                { name: 'Great-Great-Grandparent 11', id: 'gggrandparent11' },
                                { name: 'Great-Great-Grandparent 12', id: 'gggrandparent12' },
                            ],
                        },
                    ],
                },
                {
                    name: 'Grandparent 4',
                    id: 'grandparent4',
                    children: [
                        {
                            name: 'Great-Grandparent 7',
                            id: 'greatgrandparent7',
                            children: [
                                { name: 'Great-Great-Grandparent 13', id: 'gggrandparent13' },
                                { name: 'Great-Great-Grandparent 14', id: 'gggrandparent14' },
                            ],
                        },
                        {
                            name: 'Great-Grandparent 8',
                            id: 'greatgrandparent8',
                            children: [
                                { name: 'Great-Great-Grandparent 15', id: 'gggrandparent15' },
                                { name: 'Great-Great-Grandparent 16', id: 'gggrandparent16' },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};

export default function FamilyTree() {
    const treeContainerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 400, height: 400 });
    const user = useAuthStore((state) => state.user);
    const restoreAuth = useAuthStore((state) => state.restoreAuth);
    const fetchUser = useAuthStore((state) => state.fetchUser);

    useEffect(() => {
        restoreAuth();
        fetchUser();
    }, [restoreAuth, fetchUser]);
    useEffect(() => {
        if (treeContainerRef.current) {
            const { offsetWidth, offsetHeight } = treeContainerRef.current;
            setDimensions({ width: offsetWidth, height: offsetHeight });
        }
    }, []);

    const nodeStyle: CSSProperties = {
        textAnchor: 'middle',
        fontSize: 12,
        fill: 'white',
        userSelect: 'none',
    };

    const renderCustomNode = ({ nodeDatum }: any) => {
        const isUserNode = nodeDatum.isUser === true;
        console.log('Node:', nodeDatum.name, 'isUserNode:', nodeDatum.isUser === true, 'User:', user?.character);

        const clipPathId = `clip-${nodeDatum.id || nodeDatum.name.replace(/\s+/g, '-')}`;

        if (isUserNode && user?.character?.photo) {
            return (
                <g>
                    <circle r={30} fill="#7c3aed" />
                    <clipPath id={clipPathId}>
                        <circle r={28} cx={0} cy={0} />
                    </clipPath>
                    <image
                        href={user.character.photo}
                        x={-28}
                        y={-28}
                        width={56}
                        height={56}
                        clipPath={`url(#${clipPathId})`}
                        style={{ pointerEvents: 'none' }}
                    />
                    <text dy={45} x={0} style={{ ...nodeStyle, fill: '#333' }}>
                        {user.character.name}
                    </text>
                </g>
            );
        }

        return (
            <g>
                <circle r={20} fill="#7c3aed" />
                <text dy={-25} x={0} style={nodeStyle}>
                    {nodeDatum.name}
                </text>
            </g>
        );
    };

    return (
        <PageLayout>
            <h1 className="text-2xl font-bold mb-4">Family Tree</h1>
            <div
                ref={treeContainerRef}
                style={{
                    width: '100%',
                    height: '100vh',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    position: 'relative',
                }}
            >
                {dimensions.width > 0 && dimensions.height > 0 && (
                    <Tree
                        data={treeData}
                        orientation="vertical"
                        pathFunc="step"
                        collapsible={false}
                        zoomable={true}
                        translate={{
                            x: dimensions.width / 2,
                            y: 120,
                        }}
                        renderCustomNodeElement={renderCustomNode}
                    />
                )}
            </div>
        </PageLayout>
    );
}
