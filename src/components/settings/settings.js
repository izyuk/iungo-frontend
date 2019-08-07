import React, {Component} from 'react';
import ProfileDetails from "./profileDetails";
import MailerliteDetails from './mailerliteDetails';
import RuckusDetails from './ruckusDetails';
import HorizontalTabs from '../additional/horizontalTabs';

class Settings extends Component {
    state = {
    };


    
    render () {
        const param = this.props.match.params;
        console.log('props.match.params:', this.props.match.params);
        return (
            <div>

                <div className="container containerFix">
                    <div className="wrap wrapFix2">
                        <div className="info">
                            <h3>Settings</h3>
                        </div>
                        <HorizontalTabs items={[
                                {id: 1, path: '/settings/profile', class: '', title: 'Profile'},
                                {id: 2, path: '/settings/mailerlite', class: '', title: 'MailerLite'},
                                {id: 3, path: '/settings/ruckus', class: '', title: 'Ruckus'}
                            ]} />
                    {(() => {
                        switch(param.page) {
                            case 'profile':
                                return <ProfileDetails />;
                            case 'mailerlite':
                                return <MailerliteDetails />;
                            case 'ruckus':
                                return <RuckusDetails />;
                            default:
                                return null;
                        }
                    })()}

                    </div>
                </div>
            </div>
        )
    }
}

export default Settings;