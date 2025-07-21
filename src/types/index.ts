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
  position: number;
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
  onDelete: (id: string) => void;
}

export interface Page {
  id: string;
  title: string;
  user_id: string;
  created_at?: string;
}

export interface HomePage extends Page {
  updated_at: string;
}

export interface HomeContentProps {
  pages: HomePage[];
  userId: {
    id: string;
    username: string;
  };
}

export type EditorProps = { 
  page: Page; 
  blocks: Block[]; 
  profile: {
      subscription_tier?: string;
      daily_call_count?: number;
  }};

export interface AIToolsProps {
  blocks: Block[];
  profile: {
    subscription_tier?: string;
    daily_call_count?: number;
  };
}

export interface SupabaseUser {
  id: string;
  email: string | null;
  user_metadata?: {
    username?: string;
    full_name?: string;
  };
}

export interface UserProfile {
  id: string;
  username?: string;
  subscription_tier?: string;
  daily_call_count?: number;
}