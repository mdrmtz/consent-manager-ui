import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {config, consentManagerConfigDefaults} from './config';
import {getAirgap} from './init';
import './ui.css';
import {AiOutlineClose, AiOutlineInfoCircle} from 'react-icons/ai';

let initialized = false;
// UI root node in DOM
let root: Element | undefined;

const setupConsentManagerUI = async (): Promise<void> => {
    console.log('Initializing Consent Manager UI...');

    const airgap = await getAirgap();
    console.log('Purpose types config:', airgap.getPurposeTypes());
    console.log('Consent Manager UI config:', config);

    // TODO: Setup your consent manager UI DOM here
    const App: React.FC = () => {
        const sections = config.body.split('\n');
        const purposeTypes = airgap.getPurposeTypes();
        const configurableOptions = Object.entries(purposeTypes).filter(([key, value]) => value.configurable);
        const essentials = Object.entries(purposeTypes).filter(([key, value]) => value.essential);
        const [consentOptions, setConsentOptions] = useState({});

        const handleToggle = (key, value) => {
            setConsentOptions((prevOptions) => ({
                ...prevOptions,
                [key]: value,
            }));
        };

        return (
            <section id="consent-manager">
                <header className='header'>
                    <h1>{consentManagerConfigDefaults.learnMoreLink}</h1>

                    <AiOutlineClose className='close-icon'
                                    aria-label={consentManagerConfigDefaults.closeButtonAriaLabel}
                                    onClick={() => console.log('Close button clicked')}/>
                </header>
                <section>
                    <div className="centered">
                        <h2>{consentManagerConfigDefaults.consentManagerTitle}</h2>
                    </div>
                    {sections.map((sentence, index) => (
                        <p key={index}>{sentence}</p>
                    ))}
                </section>
                <section    >
                    {configurableOptions.map(([key, value]) => (
                        <div key={key} className="container" >
                            <input
                                type="checkbox"
                                id={key}
                                checked={consentOptions[key] || false}
                                onChange={(e) => handleToggle(key, e.target.checked)}
                            />
                            <div className="content">
                                <label htmlFor={key}>{value.name}</label>
                                <AiOutlineInfoCircle className="info-icon" size={18} title={value.description}/>
                            </div>
                        </div>
                    ))}
                </section>
                <p>{consentManagerConfigDefaults.requiredDisclosuresHeader}</p>

                <ul>
                    {essentials.map(([key, value]) => (
                        <div key={key}>
                            {value.description !== "" ? (
                                <li>
                                    <span className="bold">{value.name}:</span>
                                    {value.description}
                                </li>
                            ) : null}
                        </div>
                    ))}
                </ul>

                <section  className="centered">
                    <button className='blue-button'>
                        {consentManagerConfigDefaults.primaryButtonLabel}
                    </button>
                </section>
            </section>
        );

    };

    root = document.createElement('div');
    root.className = 'ConsentManager';
    ReactDOM.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>,
        root
    );
    document.body.firstElementChild?.before(root);
    // END: TODO: Setup your consent manager UI DOM here

    initialized = true;
    console.log('Consent Manager UI initialized');
};

const showConsentManagerUI = async () => {
    const airgap = await getAirgap();
    console.log('Current consent:', airgap.getConsent());

    // TODO: Display your consent manager UI here
};

export const showConsentManager = async () => {
    console.log('transcend.showConsentManager() called');
    if (!initialized) {
        await setupConsentManagerUI();
    }
    await showConsentManagerUI();


};
