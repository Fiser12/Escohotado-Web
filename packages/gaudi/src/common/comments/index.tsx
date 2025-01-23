import classNames from "classnames";

export type Props = {
      user: string;
      date: string;
      comment: string;
}

export const CommentCard = (props: Props): JSX.Element => {

      const contentData = classNames(
            'w-full flex flex-col sm:flex-row justify-start sm:justify-between items-start  sm:items-center pb-2'
      );

      return(
            <div className="w-full border border-gray-200 p-4 rounded">
                  <div className={contentData}>
                        <p className="text-sm font-semibold">{props.user}</p>
                        <p className="text-xs text-gray-dark">publicado el {props.date}</p>
                  </div>
                  <p className="text-gray-700">{props.comment}</p>
            </div>
      );
}