import React, { useEffect, useRef } from 'react';

const ConsentManager = ({ purposeTypes, initialConsent, onAcceptAll, onDenyAll, onPurposeToggle }) => {
    const consentManagerRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (consentManagerRef.current && !consentManagerRef.current.contains(event.target)) {
                // Logic to close/hide the consent manager UI
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleTogglePurpose = (purposeId) => {
        // Logic to handle toggling of a purpose (accept/deny)
        // Call onPurposeToggle with the updated consent
    };

    return (
        <div className="consent-manager" ref={consentManagerRef}>
            {/* Render the purpose types and consent status */}
            {purposeTypes.map((purpose) => (
                <div key={purpose.id}>
                    <input
                        type="checkbox"
                        checked={initialConsent[purpose.id]}
                        onChange={() => handleTogglePurpose(purpose.id)}
                    />
                    <label>{purpose.name}</label>
                </div>
            ))}

            {/* Render 'Accept All' and 'Deny All' buttons */}
            <button onClick={onAcceptAll}>Accept All</button>
            <button onClick={onDenyAll}>Deny All</button>
        </div>
    );
};

export default ConsentManager;