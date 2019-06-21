import React, {Component} from 'react';
import ProfileDetails from "./profileDetails";

class Profile extends Component {
    state = {};

    render () {
        return (
            <div className="container containerFix">
                <div className="wrap wrapFix2">
                    <div className="info profile">
                        <h3>Company profile</h3>
                    </div>
                    <ProfileDetails/>
                </div>
            </div>
        )
    }
}

export default Profile;