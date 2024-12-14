import { useEffect, useRef } from 'react';
// @types
import { IChatConversation } from '../../../../@types/chat';
//
import Scrollbar from '../../../../components/scrollbar';
//
import ChatMessageItem from './ChatMessageItem';

// ----------------------------------------------------------------------

type Props = {
  conversation: IChatConversation[];
  senderName: string;
  currentId: number;
};

export default function ChatMessageList({ conversation, currentId, senderName }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
  }, [conversation]);

  return (
    <Scrollbar
      scrollableNodeProps={{
        ref: scrollRef,
      }}
      sx={{ p: 3, height: 1 }}
    >
      {conversation.map((message) => (
        <ChatMessageItem
          key={message.createdAt}
          message={message.message}
          createdAt={message.createdAt}
          senderId={message.senderId}
          currentId={currentId}
          senderName={senderName}
        />
      ))}
    </Scrollbar>
  );
}
