import classNames from "classnames";
import "./style.css";
import { Tag } from "../../../../common/tag/tag";
import { CategoryModel, OrigenModel } from "hegel";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
      quote: string;
      author: string;
      origen?: OrigenModel | null;
      categories: CategoryModel[];
}

export const FeaturedQuote: React.FC<Props> = ({ className, quote, author, categories, origen, ...rest }) => {
      const containerClass = classNames(
            className,
            'w-full h-full max-h-[350px] flex flex-col gap-5 px-5 py-8 justify-between'
      );

      const quoteClass = classNames(
            'text-primary-900 font-handwritten text-xl line-clamp-5'
      );

      return (<div className={`base-container-axis-quote ${containerClass}`} {...rest}>
            <p className={`dynamic-text-quote ${quoteClass}`}>{quote}</p>
            <div className="flex flex-col gap-2">
                  { origen &&
                        <Tag text={origen.title} variant="primary" href={origen.detailHref}/>
                  }
                  <div className="flex flex-row gap-2 flex-wrap">
                        { categories.map((category, index) => (
                              <Tag key={index} text={category.singular_name} variant="disabled"/>
                        ))}
                  </div>
            </div>
      </div>);
};