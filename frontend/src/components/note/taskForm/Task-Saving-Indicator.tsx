import React from 'react';
import { IoMdCheckmark } from 'react-icons/io';

interface TaskSavingIndicatorProps {
    saving: boolean;
}

const TaskSavingIndicator = ({ saving }: TaskSavingIndicatorProps) => {
    return (
        <div className="absolute right-0 bottom-3 italic text-lg fl text-blue-900">
            {saving ? (
                'Saving...'
            ) : (
                <>
                    <span className="text-[1.75rem] text-blue-600">
                        <IoMdCheckmark />
                    </span>
                    Saved
                </>
            )}
        </div>
    );
};

export default TaskSavingIndicator;
