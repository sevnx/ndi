'use client'

import badge_captcha from '@/assets/badges/badge_captcha.svg'
import badge_cookie_fail from '@/assets/badges/badge_cookie_fail.svg'
import badge_cookie_win from '@/assets/badges/badge_cookie_win.svg'
import badge_quiz_main from '@/assets/badges/badge_quiz_main.svg'
import badge_quiz_pod_1 from '@/assets/badges/badge_quiz_pod_1.svg'
import badge_quiz_pod_2 from '@/assets/badges/badge_quiz_pod_2.svg'
import badge_read from '@/assets/badges/badge_read.svg'
import badge_retro from '@/assets/badges/badge_retro.svg'
import Image from 'next/image';

interface Badge {   
    title: string;
    icon: string;
}

const badges = [
    { title: 'Captcha', icon: badge_captcha },
    { title: 'Cookie Fail', icon: badge_cookie_fail },
    { title: 'Cookie Win', icon: badge_cookie_win },
    { title: 'Quiz Main', icon: badge_quiz_main },
    { title: 'Quiz Pod 1', icon: badge_quiz_pod_1 },
    { title: 'Quiz Pod 2', icon: badge_quiz_pod_2 },
    { title: 'Read', icon: badge_read },
    { title: 'Retro', icon: badge_retro },
];
const badgeNames = badges.map(b => b.title);

const addBadge = (badge: string) => {
    if (!badgeNames.includes(badge)) {
        return;
    }
    const badges = JSON.parse(localStorage.getItem('badges') || '[]');
    if (!badges.includes(badge)) {
        badges.push(badge);
        localStorage.setItem('badges', JSON.stringify(badges));
    }
}

const BadgeHeader = () => {
    const loadBadgesFromStorage = () => {
        return JSON.parse(localStorage.getItem('badges') || '[]');
    }

    const badgesEarned = loadBadgesFromStorage();

    return (
        <div className="badge-header">
            {badges.map((badge: Badge, index: number) => {
                const isEarned = badgesEarned.includes(badge.title);
                return (
                    <div key={index} className={`badge inline-flex items-center ${isEarned ? 'opacity-100' : 'opacity-40'}`}>
                        <Image 
                            src={badge.icon} 
                            alt={badge.title}
                            width={24}  // You can adjust these values
                            height={24} // to match your desired size
                            className="object-contain"
                        />
                    </div>
                );
            })}
        </div>
    );
}

export { addBadge, badgeNames };
export default BadgeHeader;