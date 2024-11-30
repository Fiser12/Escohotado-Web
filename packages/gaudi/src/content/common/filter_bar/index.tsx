"use client";

import { useEffect, useState } from 'react';
import classNames from 'classnames';

type Props = {
	title: string
	multiple?: boolean;
	selectedTags: string[];
	tags: Record<string, string>;
	onSelectedTagsChange: (selectedTags: string[]) => void;
	color: 'white' | 'primary';
	icon?: React.ReactNode;
};

export const FilterBar = (props: Props): JSX.Element => {
	const multiple = props.multiple ?? true;
	const onSelectedTagsChange = props.onSelectedTagsChange;
	const [isOpen, setIsOpen] = useState(false);
	const [selectedTags, setSelectedTags] = useState<string[]>(props.selectedTags);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleTagChange = (key: string) => {
		setSelectedTags((prev) =>
			!multiple ? [key] :
				prev.includes(key) ? prev.filter((tag) => tag !== key) : [...prev, key]
		);
	};

	useEffect(() => {
		if (process.env.STORYBOOK) return;
		onSelectedTagsChange(selectedTags);
	}, [selectedTags]);

	const buttonClass = classNames(
		'h-[40px] max-w-[300px] rounded px-5 py-2 text-primary-500 font-body text-sm text-center flex items-center gap-2 hover:bg-primary-100 focus:ring-1 focus:outline-none focus:ring-primary-200',
		{
			'bg-primary-50': props.color === 'primary',
			'bg-white': props.color === 'white',
		},
	);

	const menuContainerClass = classNames(
		"z-10 w-55 bg-white rounded shadow-md absolute mt-2 divide-y divide-gray-100",
		{ hidden: !isOpen, block: isOpen }
	);

	return (
		<div>
			<button
				onClick={toggleDropdown}
				className={buttonClass}
			>
				{props.icon && <span className="text-primary-900">{props.icon}</span>}
				{props.title}
				<svg width="7" height="5" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M3.5359 5L0.0717969 -6.05683e-07L7 0L3.5359 5Z" fill="#222222" />
				</svg>
			</button>
			<div className={menuContainerClass}>
				<ul className="max-h-[150px] overflow-scroll space-y-0.5 text-sm font-body" aria-labelledby="dropdownBgHoverButton">
					{Object.entries(props.tags).map(([key, value]) => (
						<li key={key}>
							<div className={classNames("flex items-center h-10 py-4 pl-4 pr-5 hover:bg-gray-100", { "bg-gray-100": selectedTags.includes(key) })}>
								<label
									htmlFor={`item-${key}`}
									className="w-full ms-2 text-sm font-medium text-black rounded"
								>
									{value}
								</label>
								<input
									id={`item-${key}`}
									type={multiple ? "checkbox" : "radio"}
									value={key}
									checked={selectedTags.includes(key)}
									onChange={() => handleTagChange(key)}
									className="w-4 h-4 accent-primary-400 bg-gray-100 border-gray-300 rounded focus:ring-primary-300 focus:ring-1"
								/>
							</div>
						</li>
					))}
				</ul>
				<button
					className="w-full px-6 py-4 hover:bg-gray-100 text-sm text-left text-gray-700"
					onClick={() => { setSelectedTags([]) }}
				>
					Ver todos
				</button>
			</div>
		</div>
	);
};