import { type Optional } from './optional_helpers.js';

export interface UserModel {
	userId: string;
	name: Optional<string>;
	image: Optional<string>;
	email: string;
}
