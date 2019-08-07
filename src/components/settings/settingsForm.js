import React from 'react';

SettingsForm.propTypes = {
    // onCorrect: PropTypes.func.isRequired,
    // expanded: PropTypes.bool
};

function SettingsForm({ onCorrect, incorrect = false, children }) {
    return (
        <div className="settingsForm" style={ incorrect ? { border: '1px solid #ff6976' } : { border: '' } }>
                {children}
            <button onClick={ onCorrect }>Save</button>
        </div>
    )
}

export default SettingsForm;