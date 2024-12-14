import { useEffect, useRef } from 'react';
// @types
import { IChatAI } from '../../../../../@types/chat';
//
import Scrollbar from '../../../../../components/scrollbar';
//
import ChatMessageItemAI from './ChatMessageItemAI';

// ----------------------------------------------------------------------

type Props = {
  conversation: IChatAI[];
};

export default function ChatMessageList({ conversation }: Props) {
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
      {conversation.map((messageVal) => (
        <ChatMessageItemAI message={messageVal.message} senderName={messageVal.senderName} />
      ))}
    </Scrollbar>
  );
}
