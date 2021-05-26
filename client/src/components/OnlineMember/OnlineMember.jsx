import React from 'react';

import onlineIcon from '../../Icons/onlineIcon.png';

import './OnlineMember.css';

const OnlineMember = ({ users }) => (
  <div className="textContainer">
    {
      users
        ? (
          <div>
            <div className="activeContainer">
              <div className="activeBox">
                {users.map(({name}) => (
                  <p key={name} className="activeItem">
                   <img alt="Online Icon" src={onlineIcon}/>
                    {name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default OnlineMember;