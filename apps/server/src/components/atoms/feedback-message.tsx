import classNames from 'classnames';
import React from 'react';

interface FeedbackMessageProps {
    type: 'success' | 'error';
    message: string;
    className?: string;
}

export const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ type, message, className }) => {
    return (
        <p className={classNames(
            'text-sm',
            {
                'text-green-600': type === 'success',
                'text-red-600': type === 'error',
            },
            className,
        )}>
            {message}
        </p>
    );
}; 