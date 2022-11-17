import React, { MutableRefObject, useRef } from 'react';

interface TaskImportanceInputProps {
    importance: number;
    setImportance: (value: React.SetStateAction<number>) => void;
    inputId: string;
    disabled?: boolean;
}

const TaskImportanceInput = ({ importance, setImportance, inputId, disabled }: TaskImportanceInputProps) => {
    const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
    return (
        <input
            type="number"
            ref={inputRef}
            min={1}
            max={10}
            disabled={disabled === undefined ? false : disabled}
            id={inputId}
            onClick={() => inputRef.current.select()}
            className="w-16 text-xl font-medium bg-[#ebf5fe] transition-all hover:bg-[#e1f1ff] focus-within:bg-[#e1f1ff] px-2 py-1 rounded-sm text-[#6aaac2]"
            value={importance}
            onChange={(e) => setImportance(Number(e.target.value) <= 10 && Number(e.target.value) >= 0 ? Number(e.target.value) : 1)}
        />
    );
};

export default TaskImportanceInput;
