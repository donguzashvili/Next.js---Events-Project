export type newCommentPropType = {
    onAddComment(props: commentPropType): void;
  };
  
export  type commentPropType = {
    email: string;
    name: string;
    text: string;
  };