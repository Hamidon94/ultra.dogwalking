import React, { useState, useRef, useEffect } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff,
  Camera,
  CameraOff,
  Settings,
  MessageCircle,
  Share,
  Users,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Participant {
  id: string;
  name: string;
  avatar?: string;
  role: 'owner' | 'walker' | 'vet';
  isOnline: boolean;
  hasVideo: boolean;
  hasAudio: boolean;
}

interface CallSession {
  id: string;
  type: 'consultation' | 'check_in' | 'emergency' | 'training';
  participants: Participant[];
  startTime: Date;
  duration?: number; // en minutes
  status: 'waiting' | 'connecting' | 'active' | 'ended';
  recordingEnabled?: boolean;
}

interface VideoChatProps {
  session: CallSession;
  currentUserId: string;
  onEndCall: () => void;
  onToggleVideo: () => void;
  onToggleAudio: () => void;
  onInviteParticipant?: () => void;
  onStartRecording?: () => void;
  onStopRecording?: () => void;
}

export const VideoChat: React.FC<VideoChatProps> = ({
  session,
  currentUserId,
  onEndCall,
  onToggleVideo,
  onToggleAudio,
  onInviteParticipant,
  onStartRecording,
  onStopRecording
}) => {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'poor'>('good');
  const [showSettings, setShowSettings] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{id: string, sender: string, message: string, timestamp: Date}>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const currentUser = session.participants.find(p => p.id === currentUserId);
  const otherParticipants = session.participants.filter(p => p.id !== currentUserId);

  const getCallTypeInfo = (type: string) => {
    switch (type) {
      case 'consultation':
        return {
          title: 'Consultation vétérinaire',
          description: 'Consultation en ligne avec un vétérinaire',
          icon: <Users className="w-5 h-5 text-blue-500" />
        };
      case 'check_in':
        return {
          title: 'Point de situation',
          description: 'Vérification avec le promeneur',
          icon: <CheckCircle className="w-5 h-5 text-green-500" />
        };
      case 'emergency':
        return {
          title: 'Appel d\'urgence',
          description: 'Situation d\'urgence nécessitant une assistance',
          icon: <AlertCircle className="w-5 h-5 text-red-500" />
        };
      case 'training':
        return {
          title: 'Formation',
          description: 'Session de formation pour promeneurs',
          icon: <Video className="w-5 h-5 text-purple-500" />
        };
      default:
        return {
          title: 'Appel vidéo',
          description: 'Communication vidéo',
          icon: <Video className="w-5 h-5" />
        };
    }
  };

  const handleToggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    onToggleVideo();
  };

  const handleToggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    onToggleAudio();
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    onStartRecording?.();
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    onStopRecording?.();
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        sender: currentUser?.name || 'Vous',
        message: newMessage,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const getConnectionQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent':
        return 'text-green-500';
      case 'good':
        return 'text-yellow-500';
      case 'poor':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const formatDuration = (startTime: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000);
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Simulation de la qualité de connexion
    const interval = setInterval(() => {
      const qualities: Array<'excellent' | 'good' | 'poor'> = ['excellent', 'good', 'poor'];
      setConnectionQuality(qualities[Math.floor(Math.random() * qualities.length)]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const callTypeInfo = getCallTypeInfo(session.type);

  if (session.status === 'waiting') {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {callTypeInfo.icon}
          </div>
          <CardTitle>{callTypeInfo.title}</CardTitle>
          <CardDescription>{callTypeInfo.description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">En attente des autres participants...</p>
          </div>
          
          <div className="space-y-2">
            {session.participants.map((participant) => (
              <div key={participant.id} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback>{participant.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{participant.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {participant.role}
                  </Badge>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  participant.isOnline ? 'bg-green-500' : 'bg-gray-300'
                }`}></div>
              </div>
            ))}
          </div>

          <Button variant="destructive" onClick={onEndCall}>
            <PhoneOff className="w-4 h-4 mr-2" />
            Annuler l'appel
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {callTypeInfo.icon}
          <div>
            <h2 className="font-semibold">{callTypeInfo.title}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Clock className="w-4 h-4" />
              {session.status === 'active' && formatDuration(session.startTime)}
              <span className={`ml-2 ${getConnectionQualityColor(connectionQuality)}`}>
                ● {connectionQuality === 'excellent' ? 'Excellente' : 
                   connectionQuality === 'good' ? 'Bonne' : 'Faible'} connexion
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isRecording && (
            <Badge variant="destructive" className="animate-pulse">
              ● REC
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={() => setShowSettings(!showSettings)}>
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Zone vidéo principale */}
      <div className="flex-1 relative">
        {/* Vidéo principale (participant distant) */}
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          {otherParticipants.length > 0 && otherParticipants[0].hasVideo ? (
            <video
              ref={remoteVideoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
            />
          ) : (
            <div className="text-center text-white">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={otherParticipants[0]?.avatar} />
                <AvatarFallback className="text-2xl">
                  {otherParticipants[0]?.name[0]}
                </AvatarFallback>
              </Avatar>
              <p className="text-lg">{otherParticipants[0]?.name}</p>
              <p className="text-gray-400">Caméra désactivée</p>
            </div>
          )}
        </div>

        {/* Vidéo locale (picture-in-picture) */}
        <div className="absolute top-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden border-2 border-gray-600">
          {isVideoEnabled ? (
            <video
              ref={localVideoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                <CameraOff className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Caméra off</p>
              </div>
            </div>
          )}
        </div>

        {/* Participants multiples */}
        {otherParticipants.length > 1 && (
          <div className="absolute bottom-20 left-4 flex gap-2">
            {otherParticipants.slice(1).map((participant) => (
              <div key={participant.id} className="w-24 h-18 bg-gray-700 rounded border">
                <Avatar className="w-full h-full">
                  <AvatarImage src={participant.avatar} />
                  <AvatarFallback>{participant.name[0]}</AvatarFallback>
                </Avatar>
              </div>
            ))}
          </div>
        )}

        {/* Chat overlay */}
        {showChat && (
          <div className="absolute right-4 top-20 bottom-20 w-80 bg-white rounded-lg shadow-lg flex flex-col">
            <div className="p-3 border-b">
              <h3 className="font-semibold">Chat</h3>
            </div>
            <div className="flex-1 p-3 overflow-y-auto space-y-2">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="text-sm">
                  <span className="font-medium">{msg.sender}:</span>
                  <span className="ml-2">{msg.message}</span>
                  <div className="text-xs text-gray-500">
                    {msg.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Tapez votre message..."
                className="flex-1 px-2 py-1 border rounded text-sm"
              />
              <Button size="sm" onClick={sendMessage}>
                Envoyer
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Contrôles */}
      <div className="bg-gray-800 p-4">
        <div className="flex items-center justify-center gap-4">
          {/* Contrôles audio/vidéo */}
          <Button
            variant={isAudioEnabled ? "secondary" : "destructive"}
            size="lg"
            onClick={handleToggleAudio}
            className="rounded-full w-12 h-12"
          >
            {isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </Button>

          <Button
            variant={isVideoEnabled ? "secondary" : "destructive"}
            size="lg"
            onClick={handleToggleVideo}
            className="rounded-full w-12 h-12"
          >
            {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </Button>

          {/* Enregistrement */}
          {(onStartRecording || onStopRecording) && (
            <Button
              variant={isRecording ? "destructive" : "secondary"}
              size="lg"
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              className="rounded-full w-12 h-12"
            >
              <div className={`w-3 h-3 ${isRecording ? 'bg-white' : 'bg-red-500 rounded-full'}`} />
            </Button>
          )}

          {/* Chat */}
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setShowChat(!showChat)}
            className="rounded-full w-12 h-12"
          >
            <MessageCircle className="w-5 h-5" />
          </Button>

          {/* Inviter */}
          {onInviteParticipant && (
            <Button
              variant="secondary"
              size="lg"
              onClick={onInviteParticipant}
              className="rounded-full w-12 h-12"
            >
              <Users className="w-5 h-5" />
            </Button>
          )}

          {/* Partage d'écran */}
          <Button
            variant="secondary"
            size="lg"
            className="rounded-full w-12 h-12"
          >
            <Share className="w-5 h-5" />
          </Button>

          {/* Raccrocher */}
          <Button
            variant="destructive"
            size="lg"
            onClick={onEndCall}
            className="rounded-full w-12 h-12"
          >
            <PhoneOff className="w-5 h-5" />
          </Button>
        </div>

        {/* Informations sur les participants */}
        <div className="mt-4 flex justify-center">
          <div className="flex items-center gap-4 text-white text-sm">
            {session.participants.map((participant) => (
              <div key={participant.id} className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={participant.avatar} />
                  <AvatarFallback className="text-xs">{participant.name[0]}</AvatarFallback>
                </Avatar>
                <span>{participant.name}</span>
                <div className="flex gap-1">
                  {!participant.hasAudio && <MicOff className="w-3 h-3 text-red-400" />}
                  {!participant.hasVideo && <VideoOff className="w-3 h-3 text-red-400" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alertes de connexion */}
      {connectionQuality === 'poor' && (
        <Alert className="absolute top-20 left-1/2 transform -translate-x-1/2 w-96">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Connexion instable. La qualité audio/vidéo peut être affectée.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

// Hook pour gérer les sessions d'appel vidéo
export const useVideoChat = () => {
  const [currentSession, setCurrentSession] = useState<CallSession | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Vérifier le support WebRTC
    setIsSupported(
      !!(navigator.mediaDevices && 
         navigator.mediaDevices.getUserMedia && 
         window.RTCPeerConnection)
    );
  }, []);

  const startCall = async (type: CallSession['type'], participants: Participant[]) => {
    if (!isSupported) {
      throw new Error('Votre navigateur ne supporte pas les appels vidéo');
    }

    try {
      // Demander l'accès à la caméra et au microphone
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      
      const session: CallSession = {
        id: Date.now().toString(),
        type,
        participants,
        startTime: new Date(),
        status: 'connecting'
      };

      setCurrentSession(session);
      return session;
    } catch (error) {
      throw new Error('Impossible d\'accéder à la caméra ou au microphone');
    }
  };

  const endCall = () => {
    if (currentSession) {
      setCurrentSession({
        ...currentSession,
        status: 'ended'
      });
      
      // Nettoyer après un délai
      setTimeout(() => {
        setCurrentSession(null);
      }, 1000);
    }
  };

  const joinCall = (sessionId: string) => {
    // Logique pour rejoindre un appel existant
    console.log('Joining call:', sessionId);
  };

  return {
    currentSession,
    isSupported,
    startCall,
    endCall,
    joinCall
  };
};
