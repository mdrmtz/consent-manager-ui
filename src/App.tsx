/*import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import type {TranscendAPI} from './@types/airgap.js';
import Dialog from "./ui/dialog/dialog.component";
import {consentManagerConfigDefaults} from "./ui/config";
import EssentialList from "./ui/essential-list/essential-list.component";

const App: React.FC = () => {
    let onButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        window?.transcend?.ready?.((transcend: TranscendAPI) =>
            transcend.showConsentManager()
        )
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <div className="App">
            <header className="App-header">
                <button className="consent-manager-button"
                        onClick={openDialog}>Data Collection Preferences
                </button>
                {isDialogOpen && (
                    <Dialog
                        isOpen={isDialogOpen}
                        title={consentManagerConfigDefaults.consentManagerTitle}
                        onClose={closeDialog}>
                        <EssentialList />
                    </Dialog>
                )}

                <br/>
                <button
                    className="consent-manager-button"
                    onClick={onButtonClick}
                >Data Collection Preferences from UI
                </button>
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
            </header>
        </div>
    );
};

export default App;
*/
import React from 'react';
import transcend from './transcend';
import ConsentManager from "./ui/consent-manager/ConsentManager";

const App = () => {

    const purposeTypes = transcend.getPurposeTypes(); // Fetch purpose types from Transcend Consent Manager
    const initialConsent = transcend.getConsent(); // Fetch initial consent from Transcend Consent Manager

    const handleAcceptAll = () => {
        // Logic to handle 'Accept All' button click
        transcend.optIn(); // Update consent in Transcend Consent Manager
    };

    const handleDenyAll = () => {
        // Logic to handle 'Deny All' button click
        transcend.optOut(); // Update consent in Transcend Consent Manager
    };

    const handlePurposeToggle = (updatedConsent) => {
        // Logic to handle toggling of a purpose (accept/deny)
        transcend.setConsent(updatedConsent); // Update consent in Transcend Consent Manager
    };

    const showConsentManager = () => {
        transcend.showConsentManager(); // Show the consent manager UI
    };

    return (
        <div>
            <h1>My App</h1>
            <button onClick={showConsentManager}>Open Consent Manager</button>
            <ConsentManager
                purposeTypes={purposeTypes}
                initialConsent={initialConsent}
                onAcceptAll={handleAcceptAll}
                onDenyAll={handleDenyAll}
                onPurposeToggle={handlePurposeToggle}
            />
        </div>
    );
};

export default App;