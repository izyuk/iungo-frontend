import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

export default class HorizontalTabs extends Component {
    renderItem(item, i) {
        return (
            <NavLink key={item.id} to={item.path} activeClassName={'active'}>
                <span>
                    {item.title}
                </span>
            </NavLink>
        )
      }
    
      render() {
        return (
            <div className="tabsLine">
                <div className="row">
                    <div className="line">
                        {this.props.items.map(this.renderItem)}
                    </div>
                </div>
            </div>
        )
    }
}
