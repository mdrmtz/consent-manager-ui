import React, { useEffect, useRef } from 'react';
import './dialog.component.css'

const Dialog = ({ title, children, isOpen, onClose }) => {
    const dialogRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target)) {
                onClose();
            }
        };

        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
            document.addEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isOpen, onClose]);

    return (
        <div className={`dialog ${isOpen ? 'open ConsentManager' : ''}`} ref={dialogRef}>
            <div className="dialog-header">
                <h2>{title}</h2>
            </div>
            <div className="dialog-content" >
                <p>{children}</p>
            </div>
            <div className="dialog-footer">
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Dialog;