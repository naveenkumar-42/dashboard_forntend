import { useState, useEffect } from 'react';
import './profile.scss';

const ProfileDisplay = () => {
    const [profileData, setProfileData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/profile')
            .then((response) => response.json())
            .then((data) => setProfileData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
         <div className="profile-display">
            <div className="profile-data">
                {profileData.map((profile) => (
                    <div key={profile.id} className="profile-item">
                        <div className='profile_start'>
                            <img className='profile_img' src={`data:image/jpeg;base64,${profile.image}`} alt={profile.name} />
                            <div className='profile_status'>{profile.status}</div>
                        </div>

                        <div className='profile_middle'>
                            <div className='profile_bold' >{profile.name}</div>
                            <div>{profile.id}</div>
                            <div>{profile.email}</div>
                            <div>{profile.department}</div>
                            <div>{profile.number}</div>
                            <div>{profile.address}</div>
                        </div>

                        <div className='profile_end'>
                            <div>{profile.semester}</div>
                            <div>Special lab:{profile.spl_lab}</div>
                            <div>Mentor:{profile.mentor}</div>
                            <div>Boarding:{profile.boarding}</div>
                            <div>Warden:{profile.warden}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileDisplay;
