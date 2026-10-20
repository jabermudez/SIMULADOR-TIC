export type CloudFileType = 'folder' | 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'image';

export type AccessLevel = 'reader' | 'commenter' | 'editor';

export interface CloudItem {
  id: string;
  name: string;
  type: CloudFileType;
  parentId: string | null; // null represents root "Mi Unidad"
  sizeKB: number;
  updatedAt: string;
  starred?: boolean;
  inTrash?: boolean;
  shared?: {
    accessLevel: AccessLevel;
    isPublic: boolean;
    sharedWith: string[];
    shareLink: string;
  };
  content?: string; // Text preview or mock content
}

export interface GuidedMission {
  id: string;
  order: number;
  title: string;
  description: string;
  objective: string;
  hints: string[];
  points: number;
  badgeName: string;
  isCompleted: boolean;
  checkCondition: (items: CloudItem[], history: string[]) => boolean;
}
