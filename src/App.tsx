import { TreeView } from '@carbon/react';
import { DndContext, DragEndEvent, DragStartEvent, PointerSensor, useSensor } from '@dnd-kit/core';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { useState } from 'react';
import { Wrapper } from './Wrapper';

interface Node {
    value: string;
    isDir: boolean;
    childNodes?: Node[];
}
function App() {
    const rootNode: Node = {
        value: 'Root Folder',
        isDir: true,
        childNodes: [
            {value: 'Folder 1', isDir: true},
            {value: 'Folder 2', isDir: true},
            {value: 'File 1', isDir: false},
            {value: 'File 2', isDir: false},
            {value: 'File 3', isDir: false},
            {value: 'File 4', isDir: false},
        ]
    }
    
    const [activeNode, setActiveNode] = useState<string>('');

    const [activeId, setActiveId] = useState<string | null>(null);

    const pointerSensor = useSensor(PointerSensor, {activationConstraint: { distance: 4 }});

    const handleDragEnd = (e: DragEndEvent) => {
        console.log(activeId);
        setActiveId(null);

        if (e.over) {
            console.log(e.active.id, e.over.id);
        }
    };

    const handleDragStart = (e: DragStartEvent) => {
        if (!e.active) {
            return;
        }

        setActiveId(e.active.id.toString());
    };

    const handleDragCancel = () => {
        setActiveId(null);
    };

    return (
        <>
            <DndContext
                sensors={[pointerSensor]}
                modifiers={[restrictToParentElement, restrictToVerticalAxis]}
                onDragStart={handleDragStart}
                onDragCancel={handleDragCancel}
                onDragEnd={handleDragEnd}
            >
                <TreeView key={activeNode} label={'Tree'} active={activeNode} selected={[activeNode]}>
                        <Wrapper id={rootNode.value} key={rootNode.value} isDirectory={rootNode.isDir} active={activeNode} setActive={setActiveNode}>
                            {rootNode.childNodes && rootNode.childNodes.map(cNode => (
                                <Wrapper id={cNode.value} key={cNode.value} isDirectory={cNode.isDir} active={activeNode} setActive={setActiveNode}>
                                    {cNode.value}
                                </Wrapper>
                            ))}
                        </Wrapper>
                </TreeView>
            </DndContext>
        </>
    )
}

export default App
