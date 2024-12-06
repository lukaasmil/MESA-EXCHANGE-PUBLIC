import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MessageSquare, Send } from "lucide-react";
import { useToast } from "./ui/use-toast";

export const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hey, anyone trading BTC?", sender: "user1" },
    { text: "Looking to buy some ETH", sender: "user2" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: "user1" }]);
      setNewMessage("");
      toast({
        description: "Message sent successfully",
      });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="glass-card w-80 h-96 flex flex-col rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold">Trading Chat</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <MessageSquare className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user1" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    msg.sender === "user1"
                      ? "bg-[#00E396] text-black font-medium"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border">
            <form className="flex gap-2" onSubmit={handleSendMessage}>
              <Input 
                placeholder="Message traders..." 
                className="flex-1"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button type="submit" size="icon" className="bg-[#00F5A0] hover:bg-[#00F5A0]/80">
                <Send className="h-4 w-4 text-black" />
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-12 w-12 shadow-lg bg-[#00F5A0] hover:bg-[#00F5A0]/80"
        >
          <MessageSquare className="h-6 w-6 text-black" />
        </Button>
      )}
    </div>
  );
};