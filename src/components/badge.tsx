'use client'

import badge_captcha from '@/assets/badges/badge_captcha.svg'
import badge_cookie_fail from '@/assets/badges/badge_cookie_fail.svg'
import badge_quiz_main from '@/assets/badges/badge_quiz_main.svg'
import badge_quiz_pod_1 from '@/assets/badges/badge_quiz_pod_1.svg'
import badge_quiz_pod_2 from '@/assets/badges/badge_quiz_pod_2.svg'
import badge_read from '@/assets/badges/badge_read.svg'
import badge_retro from '@/assets/badges/badge_retro.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export type BadgeName = 'Captcha' | 'Cookie Fail' | 'Quiz Main' | 'Quiz Pod 1' | 'Quiz Pod 2' | 'Read' | 'Retro'

interface Badge {
    title: BadgeName;
    icon: string;
}

const BADGES: Badge[] = [
    { title: 'Captcha', icon: badge_captcha },
    { title: 'Cookie Fail', icon: badge_cookie_fail },
    { title: 'Quiz Main', icon: badge_quiz_main },
    { title: 'Quiz Pod 1', icon: badge_quiz_pod_1 },
    { title: 'Quiz Pod 2', icon: badge_quiz_pod_2 },
    { title: 'Read', icon: badge_read },
    { title: 'Retro', icon: badge_retro },
]

export const addBadge = (badge: BadgeName): void => {
    try {
        const badges = JSON.parse(localStorage.getItem('badges') || '[]') as BadgeName[];
        if (!badges.includes(badge)) {
            badges.push(badge);
            localStorage.setItem('badges', JSON.stringify(badges));
        }
    } catch (error) {
        console.error('Error adding badge:', error);
    }
}

const BadgeHeader = () => {
    const [earnedBadges, setEarnedBadges] = useState<BadgeName[]>([]);

    useEffect(() => {
        try {
            const storedBadges = JSON.parse(localStorage.getItem('badges') || '[]') as BadgeName[];
            setEarnedBadges(storedBadges);
        } catch (error) {
            console.error('Error loading badges:', error);
            setEarnedBadges([]);
        }
    }, []);

    return (
        <div className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded-lg">
            {BADGES.map((badge) => {
                const isEarned = earnedBadges.includes(badge.title);
                return (
                    <div 
                        key={badge.title} 
                        className={`flex flex-col items-center p-2 rounded ${
                            isEarned ? 'opacity-100' : 'opacity-40'
                        }`}
                    >
                        <Image 
                            src={badge.icon} 
                            alt={`${badge.title} badge`}
                            width={48}
                            height={48}
                            className="w-12 h-12"
                        />
                        <span className="mt-1 text-sm font-medium text-gray-700">
                            {badge.title}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

export default BadgeHeader;