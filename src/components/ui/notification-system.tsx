import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  X, 
  Check, 
  Info, 
  AlertTriangle, 
  CheckCircle, 
  MapPin,
  MessageCircle,
  Calendar,
  CreditCard,
  Star,
  Dog,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Notification {
  id: string;
  type: 'booking' | 'walk_start' | 'walk_end' | 'message' | 'payment' | 'review' | 'emergency' | 'reminder' | 'promotion';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionUrl?: string;
  actionLabel?: string;
  data?: {
    bookingId?: string;
    walkerId?: string;
    walkerName?: string;
    walkerPhoto?: string;
    petName?: string;
    location?: string;
    amount?: number;
  };
}

interface NotificationSystemProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
  onNotificationAction: (notification: Notification) => void;
}

export const NotificationSystem: React.FC<NotificationSystemProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onNotificationAction
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'today'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string, priority: string) => {
    const iconClass = `w-5 h-5 ${
      priority === 'urgent' ? 'text-red-500' :
      priority === 'high' ? 'text-orange-500' :
      priority === 'medium' ? 'text-blue-500' :
      'text-gray-500'
    }`;

    switch (type) {
      case 'booking':
        return <Calendar className={iconClass} />;
      case 'walk_start':
      case 'walk_end':
        return <MapPin className={iconClass} />;
      case 'message':
        return <MessageCircle className={iconClass} />;
      case 'payment':
        return <CreditCard className={iconClass} />;
      case 'review':
        return <Star className={iconClass} />;
      case 'emergency':
        return <AlertTriangle className={iconClass} />;
      case 'reminder':
        return <Clock className={iconClass} />;
      case 'promotion':
        return <Info className={iconClass} />;
      default:
        return <Bell className={iconClass} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'border-l-red-500 bg-red-50';
      case 'high':
        return 'border-l-orange-500 bg-orange-50';
      case 'medium':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-300 bg-gray-50';
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'À l\'instant';
    if (diffInMinutes < 60) return `Il y a ${diffInMinutes}min`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Il y a ${diffInDays}j`;
    
    return date.toLocaleDateString('fr-FR');
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.read;
      case 'today':
        const today = new Date();
        const notifDate = new Date(notification.timestamp);
        return notifDate.toDateString() === today.toDateString();
      default:
        return true;
    }
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  // Simulation de notifications push
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const urgentNotifications = notifications.filter(n => 
        n.priority === 'urgent' && !n.read
      );
      
      urgentNotifications.forEach(notification => {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/favicon.ico',
          badge: '/favicon.ico'
        });
      });
    }
  }, [notifications]);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  };

  return (
    <div className="relative">
      {/* Bouton de notification */}
      <Button
        variant="ghost"
        size="sm"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            variant="destructive"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Panel de notifications */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 max-h-96 bg-white border rounded-lg shadow-lg z-50 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Notifications</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Filtres */}
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                Toutes
              </Button>
              <Button
                variant={filter === 'unread' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('unread')}
              >
                Non lues ({unreadCount})
              </Button>
              <Button
                variant={filter === 'today' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('today')}
              >
                Aujourd'hui
              </Button>
            </div>

            {/* Actions */}
            {unreadCount > 0 && (
              <div className="mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onMarkAllAsRead}
                  className="text-xs"
                >
                  <Check className="w-3 h-3 mr-1" />
                  Tout marquer comme lu
                </Button>
              </div>
            )}
          </div>

          {/* Liste des notifications */}
          <div className="max-h-80 overflow-y-auto">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-l-4 hover:bg-gray-50 cursor-pointer ${
                    getPriorityColor(notification.priority)
                  } ${!notification.read ? 'bg-blue-50' : ''}`}
                  onClick={() => {
                    if (!notification.read) {
                      onMarkAsRead(notification.id);
                    }
                    if (notification.actionUrl) {
                      onNotificationAction(notification);
                    }
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type, notification.priority)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-medium ${
                          !notification.read ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {getTimeAgo(notification.timestamp)}
                          </span>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>

                      {/* Données supplémentaires */}
                      {notification.data && (
                        <div className="mt-2 flex items-center gap-2">
                          {notification.data.walkerPhoto && (
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={notification.data.walkerPhoto} />
                              <AvatarFallback className="text-xs">
                                {notification.data.walkerName?.[0]}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          {notification.data.petName && (
                            <Badge variant="outline" className="text-xs">
                              <Dog className="w-3 h-3 mr-1" />
                              {notification.data.petName}
                            </Badge>
                          )}
                          {notification.data.amount && (
                            <Badge variant="outline" className="text-xs">
                              {notification.data.amount}€
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Action */}
                      {notification.actionLabel && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-2 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            onNotificationAction(notification);
                          }}
                        >
                          {notification.actionLabel}
                        </Button>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteNotification(notification.id);
                      }}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Aucune notification</p>
                <p className="text-sm text-gray-500 mt-1">
                  Vous êtes à jour !
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t bg-gray-50">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>{filteredNotifications.length} notification(s)</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={requestNotificationPermission}
                className="text-xs"
              >
                Activer les notifications push
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Hook pour gérer les notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Notification push si autorisée
    if ('Notification' in window && Notification.permission === 'granted') {
      if (notification.priority === 'urgent' || notification.priority === 'high') {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/favicon.ico'
        });
      }
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications
  };
};
