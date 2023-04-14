import { commentPropType } from "@/types/commentType";
import classes from "./commentList.module.css";

function CommentList({ comments }: { comments: commentPropType[] }) {
  return (
    <ul className={classes.comments}>
      {comments?.map((el, idx) => {
        return (
          <li key={idx}>
            <p>{el.text}</p>
            <div>
              By <address>{el.name}</address>
            </div>
          </li>
        );
      })}
      {/* <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li> */}
    </ul>
  );
}

export default CommentList;
