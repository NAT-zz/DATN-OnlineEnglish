import { Helmet } from 'react-helmet-async';
// sections
import { ChatAI } from '../../sections/@dashboard/chat';

// ----------------------------------------------------------------------

export default function ChatAIPage() {
  return (
    <>
      <Helmet>
        <title> Chat </title>
      </Helmet>

      <ChatAI />
    </>
  );
}
