// API publique pour Paw Paths
import { useState, useEffect, useCallback } from 'react';

// Types pour l'API publique
interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: APIPermission[];
  rateLimit: number;
  isActive: boolean;
  createdAt: Date;
  lastUsed?: Date;
  usageCount: number;
  expiresAt?: Date;
}

interface APIPermission {
  resource: string;
  actions: ('read' | 'write' | 'delete')[];
  scope?: string[];
}

interface APIEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description: string;
  parameters: APIParameter[];
  responses: APIResponse[];
  authentication: boolean;
  rateLimit: number;
  category: string;
}

interface APIParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  required: boolean;
  description: string;
  example?: any;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    enum?: string[];
  };
}

interface APIResponse {
  status: number;
  description: string;
  schema: any;
  example: any;
}

interface APIUsageStats {
  totalRequests: number;
  successfulRequests: number;
  errorRequests: number;
  averageResponseTime: number;
  requestsByEndpoint: Record<string, number>;
  requestsByDay: Record<string, number>;
  topUsers: Array<{
    apiKeyId: string;
    name: string;
    requests: number;
  }>;
}

// Configuration de l'API
const API_CONFIG = {
  baseUrl: process.env.REACT_APP_API_BASE_URL || '/api/v1',
  version: '1.0.0',
  defaultRateLimit: 1000, // requêtes par heure
  maxRateLimit: 10000,
  enableCaching: true,
  cacheTimeout: 300000, // 5 minutes
  enableWebhooks: true,
  enableDocumentation: true
};

// Définition des endpoints de l'API publique
const API_ENDPOINTS: APIEndpoint[] = [
  // Promeneurs
  {
    path: '/walkers',
    method: 'GET',
    description: 'Récupérer la liste des promeneurs disponibles',
    parameters: [
      {
        name: 'city',
        type: 'string',
        required: false,
        description: 'Filtrer par ville',
        example: 'Paris'
      },
      {
        name: 'service',
        type: 'string',
        required: false,
        description: 'Filtrer par type de service',
        example: 'walk',
        validation: {
          enum: ['walk', 'visit', 'sitting', 'boarding']
        }
      },
      {
        name: 'rating',
        type: 'number',
        required: false,
        description: 'Note minimum',
        example: 4.5,
        validation: {
          min: 1,
          max: 5
        }
      },
      {
        name: 'available',
        type: 'boolean',
        required: false,
        description: 'Disponible maintenant',
        example: true
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Nombre maximum de résultats',
        example: 20,
        validation: {
          min: 1,
          max: 100
        }
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: 'Décalage pour la pagination',
        example: 0
      }
    ],
    responses: [
      {
        status: 200,
        description: 'Liste des promeneurs',
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  rating: { type: 'number' },
                  city: { type: 'string' },
                  services: { type: 'array' },
                  available: { type: 'boolean' },
                  profileImage: { type: 'string' }
                }
              }
            },
            pagination: {
              type: 'object',
              properties: {
                total: { type: 'number' },
                limit: { type: 'number' },
                offset: { type: 'number' }
              }
            }
          }
        },
        example: {
          data: [
            {
              id: 'walker_123',
              name: 'Marie Dupont',
              rating: 4.8,
              city: 'Paris',
              services: ['walk', 'visit'],
              available: true,
              profileImage: 'https://api.pawpaths.com/images/walker_123.jpg'
            }
          ],
          pagination: {
            total: 156,
            limit: 20,
            offset: 0
          }
        }
      }
    ],
    authentication: true,
    rateLimit: 100,
    category: 'Promeneurs'
  },

  // Détail d'un promeneur
  {
    path: '/walkers/{id}',
    method: 'GET',
    description: 'Récupérer les détails d\'un promeneur',
    parameters: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Identifiant du promeneur',
        example: 'walker_123'
      }
    ],
    responses: [
      {
        status: 200,
        description: 'Détails du promeneur',
        schema: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            bio: { type: 'string' },
            rating: { type: 'number' },
            reviewCount: { type: 'number' },
            city: { type: 'string' },
            services: { type: 'array' },
            availability: { type: 'object' },
            pricing: { type: 'object' },
            certifications: { type: 'array' },
            profileImage: { type: 'string' },
            gallery: { type: 'array' }
          }
        },
        example: {
          id: 'walker_123',
          name: 'Marie Dupont',
          bio: 'Passionnée par les animaux depuis toujours...',
          rating: 4.8,
          reviewCount: 156,
          city: 'Paris',
          services: ['walk', 'visit', 'sitting'],
          availability: {
            monday: ['09:00-12:00', '14:00-18:00'],
            tuesday: ['09:00-12:00', '14:00-18:00']
          },
          pricing: {
            walk_30: 25,
            walk_60: 35,
            visit: 20
          },
          certifications: ['first_aid', 'animal_behavior'],
          profileImage: 'https://api.pawpaths.com/images/walker_123.jpg',
          gallery: ['https://api.pawpaths.com/images/gallery_1.jpg']
        }
      },
      {
        status: 404,
        description: 'Promeneur non trouvé',
        schema: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            message: { type: 'string' }
          }
        },
        example: {
          error: 'NOT_FOUND',
          message: 'Walker not found'
        }
      }
    ],
    authentication: true,
    rateLimit: 200,
    category: 'Promeneurs'
  },

  // Services
  {
    path: '/services',
    method: 'GET',
    description: 'Récupérer la liste des services disponibles',
    parameters: [
      {
        name: 'city',
        type: 'string',
        required: false,
        description: 'Filtrer par ville',
        example: 'Paris'
      }
    ],
    responses: [
      {
        status: 200,
        description: 'Liste des services',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              description: { type: 'string' },
              duration: { type: 'number' },
              basePrice: { type: 'number' },
              category: { type: 'string' }
            }
          }
        },
        example: [
          {
            id: 'walk_30',
            name: 'Promenade 30 minutes',
            description: 'Promenade de 30 minutes dans votre quartier',
            duration: 30,
            basePrice: 25,
            category: 'walk'
          }
        ]
      }
    ],
    authentication: true,
    rateLimit: 500,
    category: 'Services'
  },

  // Réservations
  {
    path: '/bookings',
    method: 'POST',
    description: 'Créer une nouvelle réservation',
    parameters: [
      {
        name: 'walkerId',
        type: 'string',
        required: true,
        description: 'Identifiant du promeneur',
        example: 'walker_123'
      },
      {
        name: 'serviceId',
        type: 'string',
        required: true,
        description: 'Identifiant du service',
        example: 'walk_30'
      },
      {
        name: 'date',
        type: 'string',
        required: true,
        description: 'Date de la réservation (ISO 8601)',
        example: '2024-10-15T14:00:00Z'
      },
      {
        name: 'petInfo',
        type: 'object',
        required: true,
        description: 'Informations sur l\'animal',
        example: {
          name: 'Rex',
          breed: 'Golden Retriever',
          age: 3,
          weight: 25,
          specialInstructions: 'Très sociable avec les autres chiens'
        }
      },
      {
        name: 'address',
        type: 'object',
        required: true,
        description: 'Adresse de prise en charge',
        example: {
          street: '123 Rue de la Paix',
          city: 'Paris',
          postalCode: '75001',
          coordinates: {
            lat: 48.8566,
            lng: 2.3522
          }
        }
      }
    ],
    responses: [
      {
        status: 201,
        description: 'Réservation créée avec succès',
        schema: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            status: { type: 'string' },
            walkerId: { type: 'string' },
            serviceId: { type: 'string' },
            date: { type: 'string' },
            price: { type: 'number' },
            paymentUrl: { type: 'string' }
          }
        },
        example: {
          id: 'booking_456',
          status: 'pending_payment',
          walkerId: 'walker_123',
          serviceId: 'walk_30',
          date: '2024-10-15T14:00:00Z',
          price: 25,
          paymentUrl: 'https://api.pawpaths.com/payments/booking_456'
        }
      },
      {
        status: 400,
        description: 'Données invalides',
        schema: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            message: { type: 'string' },
            details: { type: 'array' }
          }
        },
        example: {
          error: 'VALIDATION_ERROR',
          message: 'Invalid booking data',
          details: ['walkerId is required', 'date must be in the future']
        }
      }
    ],
    authentication: true,
    rateLimit: 50,
    category: 'Réservations'
  },

  // Statut d'une réservation
  {
    path: '/bookings/{id}',
    method: 'GET',
    description: 'Récupérer le statut d\'une réservation',
    parameters: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'Identifiant de la réservation',
        example: 'booking_456'
      }
    ],
    responses: [
      {
        status: 200,
        description: 'Détails de la réservation',
        schema: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            status: { type: 'string' },
            walkerId: { type: 'string' },
            walkerName: { type: 'string' },
            serviceId: { type: 'string' },
            serviceName: { type: 'string' },
            date: { type: 'string' },
            price: { type: 'number' },
            petInfo: { type: 'object' },
            tracking: { type: 'object' },
            photos: { type: 'array' }
          }
        },
        example: {
          id: 'booking_456',
          status: 'completed',
          walkerId: 'walker_123',
          walkerName: 'Marie Dupont',
          serviceId: 'walk_30',
          serviceName: 'Promenade 30 minutes',
          date: '2024-10-15T14:00:00Z',
          price: 25,
          petInfo: {
            name: 'Rex',
            breed: 'Golden Retriever'
          },
          tracking: {
            startTime: '2024-10-15T14:00:00Z',
            endTime: '2024-10-15T14:30:00Z',
            distance: 2.5,
            route: []
          },
          photos: ['https://api.pawpaths.com/photos/booking_456_1.jpg']
        }
      }
    ],
    authentication: true,
    rateLimit: 200,
    category: 'Réservations'
  },

  // Avis
  {
    path: '/reviews',
    method: 'GET',
    description: 'Récupérer les avis pour un promeneur',
    parameters: [
      {
        name: 'walkerId',
        type: 'string',
        required: true,
        description: 'Identifiant du promeneur',
        example: 'walker_123'
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Nombre maximum d\'avis',
        example: 10
      }
    ],
    responses: [
      {
        status: 200,
        description: 'Liste des avis',
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  rating: { type: 'number' },
                  comment: { type: 'string' },
                  date: { type: 'string' },
                  customerName: { type: 'string' },
                  verified: { type: 'boolean' }
                }
              }
            },
            stats: {
              type: 'object',
              properties: {
                averageRating: { type: 'number' },
                totalReviews: { type: 'number' },
                distribution: { type: 'object' }
              }
            }
          }
        },
        example: {
          data: [
            {
              id: 'review_789',
              rating: 5,
              comment: 'Excellent service, très professionnel',
              date: '2024-10-10T10:00:00Z',
              customerName: 'Sophie L.',
              verified: true
            }
          ],
          stats: {
            averageRating: 4.8,
            totalReviews: 156,
            distribution: {
              5: 120,
              4: 25,
              3: 8,
              2: 2,
              1: 1
            }
          }
        }
      }
    ],
    authentication: true,
    rateLimit: 300,
    category: 'Avis'
  }
];

// Classe pour gérer l'API publique
class PublicAPIService {
  private apiKeys: Map<string, APIKey> = new Map();
  private usageStats: Map<string, APIUsageStats> = new Map();
  private rateLimitCache: Map<string, { count: number; resetTime: number }> = new Map();

  constructor() {
    this.initializeDefaultKeys();
  }

  private initializeDefaultKeys() {
    // Clé de démonstration
    const demoKey: APIKey = {
      id: 'demo_key',
      name: 'Demo API Key',
      key: 'pk_demo_1234567890abcdef',
      permissions: [
        {
          resource: 'walkers',
          actions: ['read'],
          scope: ['public']
        },
        {
          resource: 'services',
          actions: ['read']
        }
      ],
      rateLimit: 100,
      isActive: true,
      createdAt: new Date(),
      usageCount: 0
    };

    this.apiKeys.set(demoKey.key, demoKey);
  }

  // Gestion des clés API
  generateAPIKey(name: string, permissions: APIPermission[], rateLimit?: number): APIKey {
    const apiKey: APIKey = {
      id: this.generateId(),
      name,
      key: `pk_${this.generateRandomString(32)}`,
      permissions,
      rateLimit: rateLimit || API_CONFIG.defaultRateLimit,
      isActive: true,
      createdAt: new Date(),
      usageCount: 0
    };

    this.apiKeys.set(apiKey.key, apiKey);
    return apiKey;
  }

  validateAPIKey(key: string): APIKey | null {
    const apiKey = this.apiKeys.get(key);
    if (!apiKey || !apiKey.isActive) {
      return null;
    }

    if (apiKey.expiresAt && apiKey.expiresAt < new Date()) {
      return null;
    }

    return apiKey;
  }

  checkRateLimit(apiKey: string): boolean {
    const key = this.apiKeys.get(apiKey);
    if (!key) return false;

    const now = Date.now();
    const hourStart = Math.floor(now / (60 * 60 * 1000)) * (60 * 60 * 1000);
    const cacheKey = `${apiKey}_${hourStart}`;

    let usage = this.rateLimitCache.get(cacheKey);
    if (!usage) {
      usage = { count: 0, resetTime: hourStart + (60 * 60 * 1000) };
      this.rateLimitCache.set(cacheKey, usage);
    }

    if (usage.count >= key.rateLimit) {
      return false;
    }

    usage.count++;
    return true;
  }

  // Traitement des requêtes API
  async processAPIRequest(
    endpoint: string,
    method: string,
    apiKey: string,
    params: any = {},
    body: any = null
  ): Promise<any> {
    // Valider la clé API
    const key = this.validateAPIKey(apiKey);
    if (!key) {
      throw new APIError(401, 'INVALID_API_KEY', 'Invalid or expired API key');
    }

    // Vérifier le rate limit
    if (!this.checkRateLimit(apiKey)) {
      throw new APIError(429, 'RATE_LIMIT_EXCEEDED', 'Rate limit exceeded');
    }

    // Trouver l'endpoint
    const apiEndpoint = API_ENDPOINTS.find(
      ep => ep.path === endpoint && ep.method === method
    );

    if (!apiEndpoint) {
      throw new APIError(404, 'ENDPOINT_NOT_FOUND', 'Endpoint not found');
    }

    // Vérifier les permissions
    if (!this.hasPermission(key, apiEndpoint)) {
      throw new APIError(403, 'INSUFFICIENT_PERMISSIONS', 'Insufficient permissions');
    }

    // Valider les paramètres
    this.validateParameters(apiEndpoint.parameters, params);

    // Traiter la requête
    const response = await this.executeRequest(apiEndpoint, params, body);

    // Mettre à jour les statistiques
    this.updateUsageStats(apiKey, endpoint, true);
    key.usageCount++;
    key.lastUsed = new Date();

    return response;
  }

  private hasPermission(apiKey: APIKey, endpoint: APIEndpoint): boolean {
    const resource = endpoint.category.toLowerCase();
    const action = endpoint.method === 'GET' ? 'read' : 'write';

    return apiKey.permissions.some(permission => {
      return permission.resource === resource && 
             permission.actions.includes(action as any);
    });
  }

  private validateParameters(expectedParams: APIParameter[], actualParams: any): void {
    const errors: string[] = [];

    for (const param of expectedParams) {
      const value = actualParams[param.name];

      if (param.required && (value === undefined || value === null)) {
        errors.push(`Parameter '${param.name}' is required`);
        continue;
      }

      if (value !== undefined && value !== null) {
        // Validation du type
        if (!this.validateParameterType(value, param.type)) {
          errors.push(`Parameter '${param.name}' must be of type ${param.type}`);
        }

        // Validation des contraintes
        if (param.validation) {
          const validationErrors = this.validateParameterConstraints(value, param.validation);
          errors.push(...validationErrors.map(err => `Parameter '${param.name}': ${err}`));
        }
      }
    }

    if (errors.length > 0) {
      throw new APIError(400, 'VALIDATION_ERROR', 'Parameter validation failed', errors);
    }
  }

  private validateParameterType(value: any, expectedType: string): boolean {
    switch (expectedType) {
      case 'string':
        return typeof value === 'string';
      case 'number':
        return typeof value === 'number' && !isNaN(value);
      case 'boolean':
        return typeof value === 'boolean';
      case 'object':
        return typeof value === 'object' && value !== null && !Array.isArray(value);
      case 'array':
        return Array.isArray(value);
      default:
        return true;
    }
  }

  private validateParameterConstraints(value: any, validation: any): string[] {
    const errors: string[] = [];

    if (validation.min !== undefined && value < validation.min) {
      errors.push(`must be at least ${validation.min}`);
    }

    if (validation.max !== undefined && value > validation.max) {
      errors.push(`must be at most ${validation.max}`);
    }

    if (validation.pattern && typeof value === 'string') {
      const regex = new RegExp(validation.pattern);
      if (!regex.test(value)) {
        errors.push(`must match pattern ${validation.pattern}`);
      }
    }

    if (validation.enum && !validation.enum.includes(value)) {
      errors.push(`must be one of: ${validation.enum.join(', ')}`);
    }

    return errors;
  }

  private async executeRequest(endpoint: APIEndpoint, params: any, body: any): Promise<any> {
    // Simulation de l'exécution de la requête
    // En production, ceci ferait appel aux services réels

    switch (endpoint.path) {
      case '/walkers':
        return this.getWalkers(params);
      case '/walkers/{id}':
        return this.getWalker(params.id);
      case '/services':
        return this.getServices(params);
      case '/bookings':
        if (endpoint.method === 'POST') {
          return this.createBooking(body);
        }
        break;
      case '/bookings/{id}':
        return this.getBooking(params.id);
      case '/reviews':
        return this.getReviews(params);
      default:
        throw new APIError(501, 'NOT_IMPLEMENTED', 'Endpoint not implemented');
    }
  }

  // Implémentations simulées des endpoints
  private async getWalkers(params: any) {
    // Simulation de données
    const walkers = [
      {
        id: 'walker_123',
        name: 'Marie Dupont',
        rating: 4.8,
        city: 'Paris',
        services: ['walk', 'visit'],
        available: true,
        profileImage: 'https://api.pawpaths.com/images/walker_123.jpg'
      },
      {
        id: 'walker_124',
        name: 'Jean Martin',
        rating: 4.6,
        city: 'Lyon',
        services: ['walk', 'sitting'],
        available: false,
        profileImage: 'https://api.pawpaths.com/images/walker_124.jpg'
      }
    ];

    // Filtrage basique
    let filtered = walkers;
    
    if (params.city) {
      filtered = filtered.filter(w => w.city.toLowerCase().includes(params.city.toLowerCase()));
    }
    
    if (params.available !== undefined) {
      filtered = filtered.filter(w => w.available === params.available);
    }
    
    if (params.rating) {
      filtered = filtered.filter(w => w.rating >= params.rating);
    }

    // Pagination
    const limit = params.limit || 20;
    const offset = params.offset || 0;
    const paginatedResults = filtered.slice(offset, offset + limit);

    return {
      data: paginatedResults,
      pagination: {
        total: filtered.length,
        limit,
        offset
      }
    };
  }

  private async getWalker(id: string) {
    if (id === 'walker_123') {
      return {
        id: 'walker_123',
        name: 'Marie Dupont',
        bio: 'Passionnée par les animaux depuis toujours...',
        rating: 4.8,
        reviewCount: 156,
        city: 'Paris',
        services: ['walk', 'visit', 'sitting'],
        availability: {
          monday: ['09:00-12:00', '14:00-18:00'],
          tuesday: ['09:00-12:00', '14:00-18:00']
        },
        pricing: {
          walk_30: 25,
          walk_60: 35,
          visit: 20
        },
        certifications: ['first_aid', 'animal_behavior'],
        profileImage: 'https://api.pawpaths.com/images/walker_123.jpg',
        gallery: ['https://api.pawpaths.com/images/gallery_1.jpg']
      };
    }
    
    throw new APIError(404, 'WALKER_NOT_FOUND', 'Walker not found');
  }

  private async getServices(params: any) {
    return [
      {
        id: 'walk_30',
        name: 'Promenade 30 minutes',
        description: 'Promenade de 30 minutes dans votre quartier',
        duration: 30,
        basePrice: 25,
        category: 'walk'
      },
      {
        id: 'walk_60',
        name: 'Promenade 1 heure',
        description: 'Promenade d\'une heure avec jeux',
        duration: 60,
        basePrice: 35,
        category: 'walk'
      }
    ];
  }

  private async createBooking(bookingData: any) {
    return {
      id: 'booking_' + this.generateRandomString(8),
      status: 'pending_payment',
      walkerId: bookingData.walkerId,
      serviceId: bookingData.serviceId,
      date: bookingData.date,
      price: 25,
      paymentUrl: `https://api.pawpaths.com/payments/booking_${this.generateRandomString(8)}`
    };
  }

  private async getBooking(id: string) {
    return {
      id,
      status: 'completed',
      walkerId: 'walker_123',
      walkerName: 'Marie Dupont',
      serviceId: 'walk_30',
      serviceName: 'Promenade 30 minutes',
      date: '2024-10-15T14:00:00Z',
      price: 25,
      petInfo: {
        name: 'Rex',
        breed: 'Golden Retriever'
      },
      tracking: {
        startTime: '2024-10-15T14:00:00Z',
        endTime: '2024-10-15T14:30:00Z',
        distance: 2.5,
        route: []
      },
      photos: [`https://api.pawpaths.com/photos/${id}_1.jpg`]
    };
  }

  private async getReviews(params: any) {
    return {
      data: [
        {
          id: 'review_789',
          rating: 5,
          comment: 'Excellent service, très professionnel',
          date: '2024-10-10T10:00:00Z',
          customerName: 'Sophie L.',
          verified: true
        }
      ],
      stats: {
        averageRating: 4.8,
        totalReviews: 156,
        distribution: {
          5: 120,
          4: 25,
          3: 8,
          2: 2,
          1: 1
        }
      }
    };
  }

  private updateUsageStats(apiKey: string, endpoint: string, success: boolean) {
    let stats = this.usageStats.get(apiKey);
    if (!stats) {
      stats = {
        totalRequests: 0,
        successfulRequests: 0,
        errorRequests: 0,
        averageResponseTime: 0,
        requestsByEndpoint: {},
        requestsByDay: {},
        topUsers: []
      };
      this.usageStats.set(apiKey, stats);
    }

    stats.totalRequests++;
    if (success) {
      stats.successfulRequests++;
    } else {
      stats.errorRequests++;
    }

    stats.requestsByEndpoint[endpoint] = (stats.requestsByEndpoint[endpoint] || 0) + 1;

    const today = new Date().toISOString().split('T')[0];
    stats.requestsByDay[today] = (stats.requestsByDay[today] || 0) + 1;
  }

  // Utilitaires
  private generateId(): string {
    return `api_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateRandomString(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Getters publics
  getAPIEndpoints(): APIEndpoint[] {
    return API_ENDPOINTS;
  }

  getAPIKey(key: string): APIKey | undefined {
    return this.apiKeys.get(key);
  }

  getUsageStats(apiKey: string): APIUsageStats | undefined {
    return this.usageStats.get(apiKey);
  }

  getAllAPIKeys(): APIKey[] {
    return Array.from(this.apiKeys.values());
  }
}

// Classe d'erreur API
class APIError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Instance singleton
const publicAPIService = new PublicAPIService();

// Hook React pour l'API publique
export const usePublicAPI = () => {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setApiKeys(publicAPIService.getAllAPIKeys());
  }, []);

  const generateAPIKey = useCallback((name: string, permissions: APIPermission[], rateLimit?: number) => {
    const newKey = publicAPIService.generateAPIKey(name, permissions, rateLimit);
    setApiKeys(prev => [...prev, newKey]);
    return newKey;
  }, []);

  const testAPICall = useCallback(async (endpoint: string, method: string, apiKey: string, params: any) => {
    setLoading(true);
    try {
      const response = await publicAPIService.processAPIRequest(endpoint, method, apiKey, params);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    apiKeys,
    loading,
    generateAPIKey,
    testAPICall,
    endpoints: publicAPIService.getAPIEndpoints(),
    getUsageStats: publicAPIService.getUsageStats.bind(publicAPIService)
  };
};

// Utilitaires pour Paw Paths
export const PawPathsAPI = {
  // Documentation de l'API
  generateDocumentation: () => {
    return {
      info: {
        title: 'Paw Paths API',
        version: API_CONFIG.version,
        description: 'API publique pour intégrer les services Paw Paths',
        contact: {
          name: 'Support API',
          email: 'api@pawpaths.com',
          url: 'https://docs.pawpaths.com'
        }
      },
      servers: [
        {
          url: API_CONFIG.baseUrl,
          description: 'Serveur de production'
        }
      ],
      endpoints: API_ENDPOINTS,
      authentication: {
        type: 'apiKey',
        in: 'header',
        name: 'X-API-Key'
      },
      rateLimit: {
        default: API_CONFIG.defaultRateLimit,
        max: API_CONFIG.maxRateLimit
      }
    };
  },

  // Exemples de code
  generateCodeExamples: (endpoint: APIEndpoint) => {
    return {
      curl: generateCurlExample(endpoint),
      javascript: generateJavaScriptExample(endpoint),
      python: generatePythonExample(endpoint),
      php: generatePHPExample(endpoint)
    };
  }
};

// Générateurs d'exemples de code
function generateCurlExample(endpoint: APIEndpoint): string {
  const url = `${API_CONFIG.baseUrl}${endpoint.path}`;
  const method = endpoint.method;
  
  let example = `curl -X ${method} "${url}"`;
  
  if (endpoint.authentication) {
    example += ` \\\n  -H "X-API-Key: YOUR_API_KEY"`;
  }
  
  example += ` \\\n  -H "Content-Type: application/json"`;
  
  if (endpoint.method !== 'GET' && endpoint.parameters.length > 0) {
    const bodyParams = endpoint.parameters.filter(p => p.required);
    if (bodyParams.length > 0) {
      const exampleBody = bodyParams.reduce((obj, param) => {
        obj[param.name] = param.example;
        return obj;
      }, {} as any);
      
      example += ` \\\n  -d '${JSON.stringify(exampleBody, null, 2)}'`;
    }
  }
  
  return example;
}

function generateJavaScriptExample(endpoint: APIEndpoint): string {
  const url = `${API_CONFIG.baseUrl}${endpoint.path}`;
  
  return `
const response = await fetch('${url}', {
  method: '${endpoint.method}',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'YOUR_API_KEY'
  }${endpoint.method !== 'GET' ? ',\n  body: JSON.stringify({\n    // Vos données ici\n  })' : ''}
});

const data = await response.json();
console.log(data);
  `.trim();
}

function generatePythonExample(endpoint: APIEndpoint): string {
  return `
import requests

url = "${API_CONFIG.baseUrl}${endpoint.path}"
headers = {
    "Content-Type": "application/json",
    "X-API-Key": "YOUR_API_KEY"
}

response = requests.${endpoint.method.toLowerCase()}(url, headers=headers${endpoint.method !== 'GET' ? ', json={}' : ''})
data = response.json()
print(data)
  `.trim();
}

function generatePHPExample(endpoint: APIEndpoint): string {
  return `
<?php
$url = "${API_CONFIG.baseUrl}${endpoint.path}";
$headers = [
    "Content-Type: application/json",
    "X-API-Key: YOUR_API_KEY"
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
${endpoint.method !== 'GET' ? 'curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([]));' : ''}

$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);
print_r($data);
?>
  `.trim();
}

export { APIError, publicAPIService };
export default PublicAPIService;
