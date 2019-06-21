import React from 'react';

ProfileForm.propTypes = {
    // onCorrect: PropTypes.func.isRequired,
    // expanded: PropTypes.bool
};

function ProfileForm({ onCorrect, incorrect = false, children }) {
    return (
        <div className="profileForm" style={ incorrect ? { border: '1px solid #ff6976' } : { border: '' } }>
            {children}
            <button onClick={ onCorrect }>Save</button>
        </div>
    )
}

export default ProfileForm;