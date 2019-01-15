import React, {Component} from 'react';
import PropTypes from 'prop-types';

HotspotForm.propTypes = {
    onCorrect: PropTypes.func.isRequired,
    expanded: PropTypes.bool
};

function HotspotForm({ onCorrect, incorrect = false, children }) {
    return (
        <form className="hotspotForm" style={ incorrect ? { border: '1px solid #ff6976' } : { border: '' } }>
            {children}
            <button onClick={ onCorrect }>Save</button>
        </form>
    )
}

export default HotspotForm;
