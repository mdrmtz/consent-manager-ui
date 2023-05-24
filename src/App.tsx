import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import type {TranscendAPI} from './@types/airgap.js';
import Dialog from "./components/dialog/dialog.component";
import {consentManagerConfigDefaults} from "./ui/config";
import EssentialList from "./components/essential-list/essential-list.component";

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
