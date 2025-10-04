import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, Video, Paperclip, AlertTriangle, Clock, Check, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'owner' | 'walker';
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'emergency' | 'instruction';
  status: 'sent' | 'delivered' | 'read';
  attachments?: string[];
}

interface MessagingSystemProps {
  bookingId: string;
  currentUserId: string;
  currentUserType: 'owner' | 'walker';
  otherUserName: string;
  dogName: string;
}

export const MessagingSystem: React.FC<MessagingSystemProps> = ({
  bookingId,
  currentUserId,
  currentUserType,
  otherUserName,
  dogName
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Messages prédéfinis pour les instructions spéciales
  const quickInstructions = [
    "Rex aime jouer avec les autres chiens",
    "Attention, il tire sur la laisse",
    "Il a peur des gros chiens",
    "Donner de l'eau toutes les 30 minutes",
    "Il adore les friandises",
    "Éviter les zones avec beaucoup de circulation"
  ];

  // Simulation de messages existants
  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: '1',
        senderId: currentUserType === 'owner' ? 'other' : currentUserId,
        senderName: currentUserType === 'owner' ? otherUserName : 'Vous',
        senderType: currentUserType === 'owner' ? 'walker' : 'owner',
        content: `Bonjour ! Je suis en route pour récupérer ${dogName}. J'arrive dans 10 minutes.`,
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        type: 'text',
        status: 'read'
      },
      {
        id: '2',
        senderId: currentUserId,
        senderName: 'Vous',
        senderType: currentUserType,
        content: `Parfait ! ${dogName} vous attend. Il est très excité !`,
        timestamp: new Date(Date.now() - 240000), // 4 minutes ago
        type: 'text',
        status: 'read'
      }
    ];
    setMessages(initialMessages);
  }, [currentUserId, currentUserType, otherUserName, dogName]);

  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulation de frappe
  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => setIsTyping(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  const sendMessage = (content: string, type: 'text' | 'emergency' | 'instruction' = 'text') => {
    if (!content.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: 'Vous',
      senderType: currentUserType,
      content,
      timestamp: new Date(),
      type,
      status: 'sent'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulation de réponse automatique
    if (type === 'emergency') {
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          senderId: 'other',
          senderName: otherUserName,
          senderType: currentUserType === 'owner' ? 'walker' : 'owner',
          content: "Message d'urgence reçu ! Je vous rappelle immédiatement.",
          timestamp: new Date(),
          type: 'emergency',
          status: 'sent'
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }

    // Simulation de statut de livraison
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, status: 'delivered' } : msg
      ));
    }, 1000);

    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, status: 'read' } : msg
      ));
    }, 3000);
  };

  const sendQuickInstruction = (instruction: string) => {
    sendMessage(instruction, 'instruction');
  };

  const sendEmergencyMessage = () => {
    setEmergencyMode(true);
    sendMessage("🚨 URGENCE - Besoin d'aide immédiatement !", 'emergency');
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'emergency': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'instruction': return <Clock className="w-4 h-4 text-blue-500" />;
      default: return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered': return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read': return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                Conversation avec {otherUserName}
              </CardTitle>
              <CardDescription>
                Promenade de {dogName} - {new Date().toLocaleDateString('fr-FR')}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4 mr-2" />
                Appeler
              </Button>
              <Button variant="outline" size="sm">
                <Video className="w-4 h-4 mr-2" />
                Vidéo
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Zone de messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.senderId === currentUserId
                    ? message.type === 'emergency'
                      ? 'bg-red-500 text-white'
                      : 'bg-primary text-white'
                    : message.type === 'emergency'
                    ? 'bg-red-100 text-red-800 border border-red-200'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-start gap-2">
                  {getMessageIcon(message.type)}
                  <div className="flex-1">
                    <p className="text-sm">{message.content}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString('fr-FR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                      {message.senderId === currentUserId && (
                        <div className="ml-2">
                          {getStatusIcon(message.status)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Instructions rapides */}
        {currentUserType === 'owner' && (
          <div className="border-t p-4">
            <p className="text-sm font-medium mb-2">Instructions rapides :</p>
            <div className="flex flex-wrap gap-2">
              {quickInstructions.slice(0, 3).map((instruction, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => sendQuickInstruction(instruction)}
                  className="text-xs"
                >
                  {instruction}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Zone de saisie */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Tapez votre message..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(newMessage);
                  }
                }}
                className="pr-10"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
              >
                <Paperclip className="w-4 h-4" />
              </Button>
            </div>
            <Button
              onClick={() => sendMessage(newMessage)}
              disabled={!newMessage.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
            <Button
              variant="destructive"
              onClick={sendEmergencyMessage}
              className="px-3"
            >
              <AlertTriangle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Alerte d'urgence */}
      {emergencyMode && (
        <Card className="mt-4 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <div>
                <p className="font-medium text-red-800">Mode urgence activé</p>
                <p className="text-sm text-red-600">
                  Votre message d'urgence a été envoyé. Le promeneur va vous contacter immédiatement.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEmergencyMode(false)}
              >
                Fermer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
