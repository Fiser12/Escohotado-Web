import classNames from 'classnames';
import { twMerge } from 'tailwind-merge'

export const classMerge = (...args: classNames.ArgumentArray): string => {
    return twMerge(classNames(...args));
}