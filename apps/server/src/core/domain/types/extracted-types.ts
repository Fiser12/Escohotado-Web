import { HomePage } from "payload-types";

export type ButtonType = NonNullable<NonNullable<HomePage['hero']>['buttons']>[number];
