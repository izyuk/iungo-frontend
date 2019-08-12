import React from 'react';

SettingsForm.propTypes = {
    // onCorrect: PropTypes.func.isRequired,
    // expanded: PropTypes.bool
};

function SettingsForm({ onCorrect, incorrect = false, children, onTest }) {
    return (
        <div className="settingsForm" style={ incorrect ? { border: '1px solid #ff6976' } : { border: '' } }>
                {children}
            <div className="controlsRow">
                {Boolean(onTest) && <button className="testBtn" onClick={ onTest }>Test</button>}
                <button onClick={ onCorrect }>Save</button>
            </div>
        </div>
    )
}

export default SettingsForm;