export { notNull, notNullAsync, type Optional } from './domain/optional_helpers';
export type { UserModel } from './domain/user-model';
export type { MenuItem, MenuSection } from './domain/header_submenu_model';
export * from './mockData/user.model'
export type { Interval, IntervalOptions } from './domain/interval_options';
import './domain/optional_helpers'; 
export type { Comment, CommentsSectionModel } from './domain/types/Comment';
export { mapAnyToComment } from './domain/types/Comment';
export { convertContentModelToCard } from "./domain/content_model";
export type { ContentCardModel, ContentHeaderModel, ArticleHeaderModel, BookHeaderModel, ContentHeaderBaseModel, QuoteHeaderModel, VideoHeaderModel } from "./domain/content_model";
export { evaluateExpression } from "./domain/evaluateExpression";