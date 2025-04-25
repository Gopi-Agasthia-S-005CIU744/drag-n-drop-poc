import {useDraggable, useDroppable} from '@dnd-kit/core';

interface WrapperProps {
    id: string;
    isDirectory: boolean;
    children: React.ReactNode;
}

export function Wrapper ({ id, isDirectory, children }: WrapperProps) {
    const {attributes, listeners, setNodeRef: DraggableRef} = useDraggable({
        id: id,
    });
    const { setNodeRef: DroppableRef } = useDroppable({
        id: id,
    });

    const getContent = () => {
        if (isDirectory) {
            return children;
        } else {
            return (
                <div ref={DraggableRef} {...listeners} {...attributes}>
                    {children}
                </div>
            )
        }
    }

    return (
        <div ref={DroppableRef}>
            {getContent()}
        </div>
    );
}