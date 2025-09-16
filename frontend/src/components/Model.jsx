import React from "react";

export default function Model({ children, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <dialog
                open
                className="modal"
                // Prevent modal from closing when clicking inside the dialog
                onClick={(e) => e.stopPropagation()} 
            >
                <button
                    onClick={onClose}
                    className="modal-close"
                    aria-label="Close modal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                {children}
            </dialog>
        </div>
    );
}