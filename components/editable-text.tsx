"use client";

import { useState, useRef, useEffect } from "react";

interface EditableTextProps {
  defaultText: string;
  className?: string;
  isDisabled?: boolean;
  keyName?: string;
  "data-editable-text"?: boolean;
}

export default function EditableText({
  defaultText,
  className = "",
  isDisabled = false,
  keyName,
  "data-editable-text": dataEditableText,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(defaultText);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isEditing && textRef.current && !isDisabled) {
      textRef.current.focus();

      // Place cursor at the end of the text
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(textRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [isEditing, isDisabled]);

  const handleBlur = () => {
    if (textRef.current) {
      setText(textRef.current.textContent || defaultText);
    }
    setIsEditing(false);
  };

  return (
    <span
      ref={textRef}
      contentEditable={!isDisabled}
      suppressContentEditableWarning={true}
      className={`relative inline-block px-1.5 py-0.5 rounded transition-all duration-300 ${
        isDisabled
          ? "bg-transparent cursor-default"
          : isEditing
          ? "bg-red-100 outline-none ring-2 ring-red-300 shadow-sm"
          : "bg-red-50 hover:bg-red-100 cursor-text"
      } ${className}`}
      onFocus={() => !isDisabled && setIsEditing(true)}
      onBlur={handleBlur}
      data-editable-text={dataEditableText}
      data-key={keyName}
    >
      {text}
    </span>
  );
}
