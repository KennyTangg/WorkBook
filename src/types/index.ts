export interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export interface KeyFeatureProps {
  headerText: string;
  description: string;
  IconComponent: React.ElementType;
}

export interface TrustMetricsProps {
  numbers: string;
  description: string;
  IconComponent: React.ElementType;
}

export interface BaseBlock {
  id: string;
  page_id: string;
  type: 'heading' | 'paragraph' | 'todo';
  content: string;
  created_at?: string;
}

export interface HeadingBlock extends BaseBlock {
  type: 'heading';
}

export interface ParagraphBlock extends BaseBlock {
  type: 'paragraph';
}

export interface ToDoBlock extends BaseBlock {
  type: 'todo';
}

export type Block = HeadingBlock | ParagraphBlock | ToDoBlock;

export interface BlockComponentProps {
  block: Block;
  onUpdate: (blockId: string, newContent: string) => void;
}

export interface Page {
  id: string;
  title: string;
  user_id: string;
  created_at?: string;
}
