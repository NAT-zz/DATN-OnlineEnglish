// ----------------------------------------------------------------------

export type IChatAttachment = {
  name: string;
  size: number;
  type: string;
  path: string;
  preview: string;
  dateCreated: Date;
  dateModified: Date;
};

export type IChatTextMessage = {
  id: string;
  body: string;
  contentType: 'text';
  attachments: IChatAttachment[];
  createdAt: Date;
  senderId: string;
};

export type IChatImageMessage = {
  id: string;
  body: string;
  contentType: 'image';
  attachments: IChatAttachment[];
  createdAt: Date;
  senderId: string;
};

export type IChatMessage = IChatTextMessage | IChatImageMessage;

// ----------------------------------------------------------------------

export type IChatContact = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  address: string;
  phone: string;
  email: string;
  lastActivity: Date | string | number;
  status: string;
  role: string;
};

export type IChatParticipant = {
  id: number;
  name: string;
  // username: string;
  // avatar: string;
  // address?: string;
  // phone?: string;
  // email?: string;
  // lastActivity?: Date | string | number;
  // status?: 'online' | 'offline' | 'away' | 'busy';
  // role?: string;
};

export type IChatConversation = {
  id: number;
  senderId: number;
  receiverId: number;
  message: string
  createdAt: string
  updatedAt: string
};

export type IChatAI = {
  message: string;
  senderName: string;
}

export type IChatSendMessage = {
  conversationId?: number;
  messageId: string;
  message: string;
  contentType: 'text';
  attachments: string[];
  createdAt: Date | string | number;
  senderId: string;
};

// ----------------------------------------------------------------------

export type IChatContactsState = {
  byId: Record<string, IChatParticipant>;
  allIds: string[];
};

export type IChatConversationsState = {
  byId: Record<string, IChatConversation>;
  allIds: string[];
};

export type IChatState = {
  isLoading: boolean;
  error: Error | string | null;
  contacts: IChatContactsState;
  conversations: IChatConversationsState;
  activeConversationId: null | string;
  participants: IChatParticipant[];
  recipients: IChatParticipant[];
};
