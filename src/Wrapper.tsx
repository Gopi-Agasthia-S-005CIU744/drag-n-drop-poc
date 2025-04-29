import { TreeNode } from '@carbon/react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities'
import React from 'react';

interface WrapperProps {
    id: string;
    isDirectory: boolean;
    children: React.ReactNode;
}

export function Wrapper ({ id, isDirectory }: WrapperProps) {
    const {attributes, listeners, setNodeRef: DraggableRef, transform} = useDraggable({
        id: `${id}-drag`,
    });
    const { setNodeRef: DroppableRef } = useDroppable({
        id: `${id}-drop`,
    });

    const style = {
        // Outputs `translate3d(x, y, 0)`
        transform: CSS.Translate.toString(transform),
    };

    if (isDirectory) {
        return (
            <TreeNode
                ref={DroppableRef}
                key={id}
                label={id}
                // selected={[]}  //When this line is uncommented the code works fine
            />
        );
    } else {
        return (
            <TreeNode
                ref={DraggableRef}
                {...listeners}
                {...attributes}
                style={style}
                key={id}
                label={id}
                // selected={[]}  //When this line is uncommented the code works fine
            />
        )
    }

}