"use client";

import { useEffect, useState } from 'react';
import classNames from 'classnames';

type Props = {
	title: string
	selectedTags: string[];
	tags: Record<string, string>;
	onSelectedTagsChange: (selectedTags: string[]) => void;
};

export const FilterBar = (props: Props): JSX.Element => {
	const onSelectedTagsChange = props.onSelectedTagsChange;
	const [isOpen, setIsOpen] = useState(false);
	const [selectedTags, setSelectedTags] = useState<string[]>(props.selectedTags);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleTagChange = (key: string) => {
		setSelectedTags((prev) =>
			prev.includes(key) ? prev.filter((tag) => tag !== key) : [...prev, key]
		);
	};

	useEffect(() => {
		onSelectedTagsChange(selectedTags);
	}, [selectedTags]);

	return (
		<div>
			<button
				onClick={toggleDropdown}
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			> {props.title}
				<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
					<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
				</svg>
			</button>

			<div
				className={classNames(
					"z-10 w-48 bg-white rounded-lg shadow dark:bg-gray-700 absolute mt-2",
					{ hidden: !isOpen, block: isOpen }
				)}
			>
				<ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownBgHoverButton">
					{Object.entries(props.tags).map(([key, value]) => (
						<li key={key}>
							<div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
								<input
									id={`checkbox-item-${key}`}
									type="checkbox"
									value={key}
									checked={selectedTags.includes(key)}
									onChange={() => handleTagChange(key)}
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
								/>
								<label
									htmlFor={`checkbox-item-${key}`}
									className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
								>
									{value}
								</label>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};