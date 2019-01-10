import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {getHotspots} from '../../api/API';

HotspotForm.propTypes = {
    onCorrect: PropTypes.func.isRequired,
    expanded: PropTypes.bool
};

function HotspotForm({ onCorrect, correct = false, children }) {
    return (
        <form className="hotspotForm" style={ correct ? { border: '1px solid #ff6976' } : { border: '' } }>
            {children}
            <button onClick={onCorrect}>Save</button>
        </form>
    )
}

export default HotspotForm;
