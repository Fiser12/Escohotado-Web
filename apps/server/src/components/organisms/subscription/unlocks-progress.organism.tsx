
'use client';

import type { BaseUser } from 'payload-access-control';
import { useEffect, useState } from 'react';
import { countWeeklyUnlocksQuery, getNextUnlockDateQuery } from 'payload-stripe-inventory';

interface UnlocksProgressProps {
    user: BaseUser;
    maxUnlocks?: number;
    className?: string;
}

export const UnlocksProgress: React.FC<UnlocksProgressProps> = ({
    user,
    maxUnlocks = 3, // Valor predeterminado
    className = '',
}) => {
    const [weeklyUnlocks, setWeeklyUnlocks] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const nextUnlockDate = getNextUnlockDateQuery(user);

    useEffect(() => {
        const unlocks = countWeeklyUnlocksQuery(user);
        setWeeklyUnlocks(unlocks);
        setPercentage(Math.min((unlocks / maxUnlocks) * 100, 100));
    }, [user, maxUnlocks]);

    return (
        <div className={`unlocks-progress ${className}`}>
            <div className="text-sm font-medium mb-1">
                Desbloqueos semanales: {weeklyUnlocks} de {maxUnlocks}
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>

            {weeklyUnlocks < maxUnlocks ? (
                <div className="text-xs text-gray-600 mt-1">
                    Te quedan {maxUnlocks - weeklyUnlocks} desbloqueos esta semana
                </div>
            ) : (<>
                <div className="text-xs text-red-600 mt-1">
                    Has alcanzado el límite de desbloqueos para esta semana
                </div>
                <div className="text-xs text-gray-600 mt-1">
                    Próximo desbloqueo: {nextUnlockDate.toLocaleDateString()}
                </div>
            </>
            )}
        </div>
    );
}; 