// Intégration CRM pour Paw Paths
import { useState, useEffect, useCallback } from 'react';

// Types pour le CRM
interface Contact {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  userType: 'owner' | 'walker' | 'lead';
  status: 'active' | 'inactive' | 'prospect' | 'customer';
  source: 'website' | 'referral' | 'social' | 'advertising' | 'direct';
  tags: string[];
  customFields: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  lastActivity?: Date;
  totalSpent?: number;
  bookingsCount?: number;
  averageRating?: number;
}

interface Activity {
  id: string;
  contactId: string;
  type: 'email' | 'call' | 'meeting' | 'booking' | 'payment' | 'review' | 'support';
  title: string;
  description: string;
  date: Date;
  outcome?: 'success' | 'failed' | 'pending';
  metadata?: Record<string, any>;
}

interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'push' | 'retargeting';
  status: 'draft' | 'active' | 'paused' | 'completed';
  targetSegment: ContactSegment;
  content: {
    subject?: string;
    message: string;
    template?: string;
  };
  metrics: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    converted: number;
  };
  scheduledAt?: Date;
  createdAt: Date;
}

interface ContactSegment {
  name: string;
  criteria: {
    userType?: 'owner' | 'walker' | 'lead';
    status?: string[];
    tags?: string[];
    city?: string[];
    registrationDateRange?: { start: Date; end: Date };
    lastActivityRange?: { start: Date; end: Date };
    totalSpentRange?: { min: number; max: number };
    bookingsCountRange?: { min: number; max: number };
    customCriteria?: Record<string, any>;
  };
}

interface CRMConfig {
  apiEndpoint: string;
  apiKey: string;
  enableAutomation: boolean;
  enableSegmentation: boolean;
  enableCampaigns: boolean;
  syncInterval: number;
}

// Configuration CRM
const CRM_CONFIG: CRMConfig = {
  apiEndpoint: process.env.REACT_APP_CRM_ENDPOINT || '/api/crm',
  apiKey: process.env.REACT_APP_CRM_API_KEY || '',
  enableAutomation: true,
  enableSegmentation: true,
  enableCampaigns: true,
  syncInterval: 300000 // 5 minutes
};

class CRMService {
  private config: CRMConfig;
  private contacts: Map<string, Contact> = new Map();
  private activities: Activity[] = [];
  private campaigns: Campaign[] = [];
  private syncTimer: NodeJS.Timeout | null = null;

  constructor(config: Partial<CRMConfig> = {}) {
    this.config = { ...CRM_CONFIG, ...config };
    this.initializeSync();
  }

  private initializeSync() {
    if (this.config.syncInterval > 0) {
      this.syncTimer = setInterval(() => {
        this.syncWithCRM();
      }, this.config.syncInterval);
    }
  }

  // Gestion des contacts
  async createContact(contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contact> {
    const contact: Contact = {
      ...contactData,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.contacts.set(contact.id, contact);
    
    // Envoyer au CRM externe
    await this.sendToCRM('contacts', 'create', contact);
    
    // Déclencher l'automation d'accueil
    if (this.config.enableAutomation) {
      await this.triggerWelcomeAutomation(contact);
    }

    return contact;
  }

  async updateContact(contactId: string, updates: Partial<Contact>): Promise<Contact | null> {
    const contact = this.contacts.get(contactId);
    if (!contact) return null;

    const updatedContact = {
      ...contact,
      ...updates,
      updatedAt: new Date()
    };

    this.contacts.set(contactId, updatedContact);
    
    // Envoyer au CRM externe
    await this.sendToCRM('contacts', 'update', updatedContact);

    return updatedContact;
  }

  async getContact(contactId: string): Promise<Contact | null> {
    return this.contacts.get(contactId) || null;
  }

  async getContactByEmail(email: string): Promise<Contact | null> {
    for (const contact of this.contacts.values()) {
      if (contact.email === email) {
        return contact;
      }
    }
    return null;
  }

  async searchContacts(criteria: Partial<Contact>): Promise<Contact[]> {
    const results: Contact[] = [];
    
    for (const contact of this.contacts.values()) {
      let matches = true;
      
      for (const [key, value] of Object.entries(criteria)) {
        if (contact[key as keyof Contact] !== value) {
          matches = false;
          break;
        }
      }
      
      if (matches) {
        results.push(contact);
      }
    }
    
    return results;
  }

  // Gestion des activités
  async logActivity(activity: Omit<Activity, 'id' | 'date'>): Promise<Activity> {
    const newActivity: Activity = {
      ...activity,
      id: this.generateId(),
      date: new Date()
    };

    this.activities.push(newActivity);
    
    // Mettre à jour la dernière activité du contact
    const contact = this.contacts.get(activity.contactId);
    if (contact) {
      await this.updateContact(contact.id, { lastActivity: new Date() });
    }

    // Envoyer au CRM externe
    await this.sendToCRM('activities', 'create', newActivity);

    return newActivity;
  }

  async getContactActivities(contactId: string): Promise<Activity[]> {
    return this.activities
      .filter(activity => activity.contactId === contactId)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  // Segmentation
  async createSegment(segment: ContactSegment): Promise<Contact[]> {
    if (!this.config.enableSegmentation) {
      throw new Error('Segmentation is disabled');
    }

    const contacts: Contact[] = [];
    
    for (const contact of this.contacts.values()) {
      if (this.matchesSegmentCriteria(contact, segment.criteria)) {
        contacts.push(contact);
      }
    }

    return contacts;
  }

  private matchesSegmentCriteria(contact: Contact, criteria: ContactSegment['criteria']): boolean {
    // Vérifier le type d'utilisateur
    if (criteria.userType && contact.userType !== criteria.userType) {
      return false;
    }

    // Vérifier le statut
    if (criteria.status && !criteria.status.includes(contact.status)) {
      return false;
    }

    // Vérifier les tags
    if (criteria.tags && !criteria.tags.some(tag => contact.tags.includes(tag))) {
      return false;
    }

    // Vérifier la ville
    if (criteria.city && contact.city && !criteria.city.includes(contact.city)) {
      return false;
    }

    // Vérifier la date d'inscription
    if (criteria.registrationDateRange) {
      const registrationDate = contact.createdAt;
      if (registrationDate < criteria.registrationDateRange.start || 
          registrationDate > criteria.registrationDateRange.end) {
        return false;
      }
    }

    // Vérifier la dernière activité
    if (criteria.lastActivityRange && contact.lastActivity) {
      if (contact.lastActivity < criteria.lastActivityRange.start || 
          contact.lastActivity > criteria.lastActivityRange.end) {
        return false;
      }
    }

    // Vérifier le montant total dépensé
    if (criteria.totalSpentRange && contact.totalSpent !== undefined) {
      if (contact.totalSpent < criteria.totalSpentRange.min || 
          contact.totalSpent > criteria.totalSpentRange.max) {
        return false;
      }
    }

    // Vérifier le nombre de réservations
    if (criteria.bookingsCountRange && contact.bookingsCount !== undefined) {
      if (contact.bookingsCount < criteria.bookingsCountRange.min || 
          contact.bookingsCount > criteria.bookingsCountRange.max) {
        return false;
      }
    }

    return true;
  }

  // Campagnes
  async createCampaign(campaign: Omit<Campaign, 'id' | 'createdAt' | 'metrics'>): Promise<Campaign> {
    if (!this.config.enableCampaigns) {
      throw new Error('Campaigns are disabled');
    }

    const newCampaign: Campaign = {
      ...campaign,
      id: this.generateId(),
      createdAt: new Date(),
      metrics: {
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        converted: 0
      }
    };

    this.campaigns.push(newCampaign);
    
    // Envoyer au CRM externe
    await this.sendToCRM('campaigns', 'create', newCampaign);

    return newCampaign;
  }

  async executeCampaign(campaignId: string): Promise<void> {
    const campaign = this.campaigns.find(c => c.id === campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    // Obtenir les contacts du segment cible
    const targetContacts = await this.createSegment(campaign.targetSegment);
    
    // Envoyer la campagne
    for (const contact of targetContacts) {
      try {
        await this.sendCampaignMessage(campaign, contact);
        campaign.metrics.sent++;
        
        // Logger l'activité
        await this.logActivity({
          contactId: contact.id,
          type: campaign.type === 'email' ? 'email' : 'call',
          title: `Campagne: ${campaign.name}`,
          description: campaign.content.message,
          outcome: 'success'
        });
      } catch (error) {
        console.error('Failed to send campaign message:', error);
      }
    }

    // Mettre à jour le statut de la campagne
    campaign.status = 'completed';
  }

  private async sendCampaignMessage(campaign: Campaign, contact: Contact): Promise<void> {
    const message = this.personalizeCampaignMessage(campaign.content.message, contact);
    
    switch (campaign.type) {
      case 'email':
        await this.sendEmail(contact.email, campaign.content.subject || '', message);
        break;
      case 'sms':
        if (contact.phone) {
          await this.sendSMS(contact.phone, message);
        }
        break;
      case 'push':
        await this.sendPushNotification(contact.id, message);
        break;
    }
  }

  private personalizeCampaignMessage(template: string, contact: Contact): string {
    return template
      .replace(/\{firstName\}/g, contact.firstName)
      .replace(/\{lastName\}/g, contact.lastName)
      .replace(/\{email\}/g, contact.email)
      .replace(/\{city\}/g, contact.city || '');
  }

  // Automations
  private async triggerWelcomeAutomation(contact: Contact): Promise<void> {
    // Séquence d'emails de bienvenue
    const welcomeSequence = [
      {
        delay: 0,
        subject: 'Bienvenue sur Paw Paths ! 🐕',
        template: 'welcome_email_1'
      },
      {
        delay: 24 * 60 * 60 * 1000, // 24 heures
        subject: 'Découvrez nos promeneurs certifiés',
        template: 'welcome_email_2'
      },
      {
        delay: 7 * 24 * 60 * 60 * 1000, // 7 jours
        subject: 'Votre première promenade vous attend !',
        template: 'welcome_email_3'
      }
    ];

    for (const email of welcomeSequence) {
      setTimeout(async () => {
        await this.sendTemplateEmail(contact, email.subject, email.template);
      }, email.delay);
    }
  }

  async triggerAbandonedCartAutomation(contact: Contact, bookingData: any): Promise<void> {
    // Email de rappel après 1 heure
    setTimeout(async () => {
      await this.sendTemplateEmail(
        contact,
        'Votre réservation vous attend ! 🐾',
        'abandoned_cart_1',
        { bookingData }
      );
    }, 60 * 60 * 1000);

    // Email de rappel avec réduction après 24 heures
    setTimeout(async () => {
      await this.sendTemplateEmail(
        contact,
        'Dernière chance : -10% sur votre première promenade',
        'abandoned_cart_2',
        { bookingData, discountCode: 'FIRST10' }
      );
    }, 24 * 60 * 60 * 1000);
  }

  async triggerReactivationAutomation(contact: Contact): Promise<void> {
    // Série d'emails pour réactiver les utilisateurs inactifs
    const reactivationSequence = [
      {
        delay: 0,
        subject: 'On vous a manqué ! 🐕',
        template: 'reactivation_1'
      },
      {
        delay: 7 * 24 * 60 * 60 * 1000,
        subject: 'Offre spéciale pour votre retour',
        template: 'reactivation_2'
      }
    ];

    for (const email of reactivationSequence) {
      setTimeout(async () => {
        await this.sendTemplateEmail(contact, email.subject, email.template);
      }, email.delay);
    }
  }

  // Communication
  private async sendEmail(to: string, subject: string, content: string): Promise<void> {
    // Intégration avec service d'email (SendGrid, Mailgun, etc.)
    try {
      const response = await fetch(`${this.config.apiEndpoint}/email/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          to,
          subject,
          content,
          from: 'noreply@pawpaths.com'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }
  }

  private async sendTemplateEmail(
    contact: Contact, 
    subject: string, 
    template: string, 
    data: any = {}
  ): Promise<void> {
    try {
      const response = await fetch(`${this.config.apiEndpoint}/email/template`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          to: contact.email,
          subject,
          template,
          data: {
            ...data,
            contact
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send template email');
      }
    } catch (error) {
      console.error('Template email sending failed:', error);
      throw error;
    }
  }

  private async sendSMS(to: string, message: string): Promise<void> {
    // Intégration avec service SMS (Twilio, etc.)
    try {
      const response = await fetch(`${this.config.apiEndpoint}/sms/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          to,
          message,
          from: 'PawPaths'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send SMS');
      }
    } catch (error) {
      console.error('SMS sending failed:', error);
      throw error;
    }
  }

  private async sendPushNotification(userId: string, message: string): Promise<void> {
    // Intégration avec service de notifications push
    try {
      const response = await fetch(`${this.config.apiEndpoint}/push/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          userId,
          message,
          title: 'Paw Paths'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send push notification');
      }
    } catch (error) {
      console.error('Push notification sending failed:', error);
      throw error;
    }
  }

  // Synchronisation avec CRM externe
  private async syncWithCRM(): Promise<void> {
    try {
      // Synchroniser les contacts
      await this.syncContacts();
      
      // Synchroniser les activités
      await this.syncActivities();
      
      // Synchroniser les campagnes
      await this.syncCampaigns();
      
      console.log('CRM sync completed successfully');
    } catch (error) {
      console.error('CRM sync failed:', error);
    }
  }

  private async syncContacts(): Promise<void> {
    // Récupérer les contacts depuis le CRM externe
    const response = await fetch(`${this.config.apiEndpoint}/contacts/sync`, {
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`
      }
    });

    if (response.ok) {
      const externalContacts = await response.json();
      
      // Mettre à jour les contacts locaux
      for (const contact of externalContacts) {
        this.contacts.set(contact.id, contact);
      }
    }
  }

  private async syncActivities(): Promise<void> {
    // Envoyer les activités locales vers le CRM externe
    const unsyncedActivities = this.activities.filter(a => !a.metadata?.synced);
    
    for (const activity of unsyncedActivities) {
      await this.sendToCRM('activities', 'create', activity);
      activity.metadata = { ...activity.metadata, synced: true };
    }
  }

  private async syncCampaigns(): Promise<void> {
    // Synchroniser les métriques des campagnes
    for (const campaign of this.campaigns) {
      await this.sendToCRM('campaigns', 'update', campaign);
    }
  }

  private async sendToCRM(endpoint: string, action: string, data: any): Promise<void> {
    try {
      const response = await fetch(`${this.config.apiEndpoint}/${endpoint}/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`CRM API error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to send to CRM:', error);
      // En cas d'erreur, stocker pour retry
    }
  }

  // Utilitaires
  private generateId(): string {
    return `crm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Analytics et rapports
  async getContactStats(): Promise<any> {
    const totalContacts = this.contacts.size;
    const activeContacts = Array.from(this.contacts.values()).filter(c => c.status === 'active').length;
    const prospects = Array.from(this.contacts.values()).filter(c => c.status === 'prospect').length;
    const customers = Array.from(this.contacts.values()).filter(c => c.status === 'customer').length;

    return {
      total: totalContacts,
      active: activeContacts,
      prospects,
      customers,
      conversionRate: prospects > 0 ? (customers / prospects) * 100 : 0
    };
  }

  async getCampaignStats(): Promise<any> {
    const totalCampaigns = this.campaigns.length;
    const activeCampaigns = this.campaigns.filter(c => c.status === 'active').length;
    const completedCampaigns = this.campaigns.filter(c => c.status === 'completed').length;

    const totalMetrics = this.campaigns.reduce((acc, campaign) => {
      acc.sent += campaign.metrics.sent;
      acc.delivered += campaign.metrics.delivered;
      acc.opened += campaign.metrics.opened;
      acc.clicked += campaign.metrics.clicked;
      acc.converted += campaign.metrics.converted;
      return acc;
    }, { sent: 0, delivered: 0, opened: 0, clicked: 0, converted: 0 });

    return {
      total: totalCampaigns,
      active: activeCampaigns,
      completed: completedCampaigns,
      metrics: totalMetrics,
      openRate: totalMetrics.delivered > 0 ? (totalMetrics.opened / totalMetrics.delivered) * 100 : 0,
      clickRate: totalMetrics.opened > 0 ? (totalMetrics.clicked / totalMetrics.opened) * 100 : 0,
      conversionRate: totalMetrics.clicked > 0 ? (totalMetrics.converted / totalMetrics.clicked) * 100 : 0
    };
  }

  // Nettoyage
  destroy(): void {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
    }
  }
}

// Instance singleton
const crmService = new CRMService();

// Hooks React pour le CRM
export const useCRM = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);

  const createContact = useCallback(async (contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    try {
      const contact = await crmService.createContact(contactData);
      setContacts(prev => [...prev, contact]);
      return contact;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateContact = useCallback(async (contactId: string, updates: Partial<Contact>) => {
    setLoading(true);
    try {
      const contact = await crmService.updateContact(contactId, updates);
      if (contact) {
        setContacts(prev => prev.map(c => c.id === contactId ? contact : c));
      }
      return contact;
    } finally {
      setLoading(false);
    }
  }, []);

  const logActivity = useCallback(async (activity: Omit<Activity, 'id' | 'date'>) => {
    return await crmService.logActivity(activity);
  }, []);

  return {
    contacts,
    loading,
    createContact,
    updateContact,
    logActivity,
    searchContacts: crmService.searchContacts.bind(crmService),
    getContactActivities: crmService.getContactActivities.bind(crmService)
  };
};

// Utilitaires pour Paw Paths
export const PawPathsCRM = {
  // Créer un contact propriétaire
  createOwnerContact: async (userData: any) => {
    return await crmService.createContact({
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      address: userData.address,
      city: userData.city,
      postalCode: userData.postalCode,
      country: userData.country || 'France',
      userType: 'owner',
      status: 'prospect',
      source: 'website',
      tags: ['new_user', 'owner'],
      customFields: {
        petName: userData.petName,
        petBreed: userData.petBreed,
        petAge: userData.petAge
      }
    });
  },

  // Créer un contact promeneur
  createWalkerContact: async (userData: any) => {
    return await crmService.createContact({
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      address: userData.address,
      city: userData.city,
      postalCode: userData.postalCode,
      country: userData.country || 'France',
      userType: 'walker',
      status: 'prospect',
      source: 'website',
      tags: ['new_user', 'walker'],
      customFields: {
        experience: userData.experience,
        availability: userData.availability,
        services: userData.services
      }
    });
  },

  // Logger une réservation
  logBooking: async (contactId: string, bookingData: any) => {
    await crmService.logActivity({
      contactId,
      type: 'booking',
      title: 'Nouvelle réservation',
      description: `Réservation ${bookingData.service} pour ${bookingData.petName}`,
      outcome: 'success',
      metadata: bookingData
    });

    // Mettre à jour le statut du contact
    await crmService.updateContact(contactId, {
      status: 'customer',
      bookingsCount: (await crmService.getContact(contactId))?.bookingsCount || 0 + 1
    });
  },

  // Logger un paiement
  logPayment: async (contactId: string, paymentData: any) => {
    await crmService.logActivity({
      contactId,
      type: 'payment',
      title: 'Paiement reçu',
      description: `Paiement de ${paymentData.amount}€ pour la réservation ${paymentData.bookingId}`,
      outcome: 'success',
      metadata: paymentData
    });

    // Mettre à jour le montant total dépensé
    const contact = await crmService.getContact(contactId);
    if (contact) {
      await crmService.updateContact(contactId, {
        totalSpent: (contact.totalSpent || 0) + paymentData.amount
      });
    }
  },

  // Déclencher l'automation de panier abandonné
  triggerAbandonedCart: async (contactId: string, bookingData: any) => {
    const contact = await crmService.getContact(contactId);
    if (contact) {
      await crmService.triggerAbandonedCartAutomation(contact, bookingData);
    }
  },

  // Déclencher l'automation de réactivation
  triggerReactivation: async (contactId: string) => {
    const contact = await crmService.getContact(contactId);
    if (contact) {
      await crmService.triggerReactivationAutomation(contact);
    }
  }
};

export default crmService;
