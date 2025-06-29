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
  type: 'heading' | 'paragraph' | 'todo';
  content: string;
}

export interface HeadingBlock extends BaseBlock {
    type: 'heading';
}

export interface ParagraphBlock extends BaseBlock {
    type: 'paragraph';
}

export interface ToDoBlock extends BaseBlock {
    type: 'todo';
    checked: boolean;
}

export type Block = HeadingBlock | ParagraphBlock | ToDoBlock;

export interface BlockComponentProps {
  block: BaseBlock; 
}

export interface BlockToDoComponentProps {
  block: ToDoBlock;
  onToggle: (id: string) => void; 
}