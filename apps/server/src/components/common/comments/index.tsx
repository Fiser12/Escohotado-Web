import classNames from "classnames";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
      user: string;
      date: string;
      comment: string;
}

export const CommentCard: React.FC<Props> = ({user, date, comment, className, ...rest}) => {
      const divClassname = classNames(
            className,
            "w-full border border-gray-200 p-4 rounded"
      );

      const contentDataClass = classNames(
            'w-full flex flex-col sm:flex-row justify-start sm:justify-between items-start  sm:items-center pb-2'
      );
      return (
            <div className={divClassname} {...rest}>
                  <div className={contentDataClass}>
                        <p className="text-sm font-semibold">{user}</p>
                        <p className="text-xs text-gray-dark">publicado el {date}</p>
                  </div>
                  <div className="article-html-content" dangerouslySetInnerHTML={{__html: comment.replaceAll("https://foro.laemboscadura.com/assets", "/assets")}}></div>
            </div>
      );
}