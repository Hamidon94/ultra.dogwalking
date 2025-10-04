import React, { useState, useEffect, useMemo } from 'react';
import {
  Store,
  ShoppingCart,
  Heart,
  Star,
  Filter,
  Search,
  MapPin,
  Clock,
  Truck,
  Shield,
  Award,
  Users,
  TrendingUp,
  Package,
  CreditCard,
  MessageCircle,
  Eye,
  Share2,
  Plus,
  Minus,
  Check,
  X,
  AlertCircle,
  Gift
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Types pour le marketplace
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  subcategory: string;
  brand: string;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockQuantity: number;
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  features: string[];
  specifications: Record<string, string>;
  shippingInfo: {
    freeShipping: boolean;
    estimatedDays: number;
    cost?: number;
  };
  tags: string[];
  isPromoted: boolean;
  discount?: {
    percentage: number;
    validUntil: Date;
  };
}

interface ProductCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  subcategories: string[];
}

interface CartItem {
  productId: string;
  quantity: number;
  selectedOptions?: Record<string, string>;
}

interface Seller {
  id: string;
  name: string;
  description: string;
  rating: number;
  reviewCount: number;
  totalSales: number;
  joinDate: Date;
  location: string;
  verified: boolean;
  specialties: string[];
  policies: {
    returns: string;
    shipping: string;
    warranty: string;
  };
}

interface MarketplaceProps {
  onAddToCart: (item: CartItem) => void;
  onRemoveFromCart: (productId: string) => void;
  cartItems: CartItem[];
  onContactSeller: (sellerId: string, productId: string) => void;
  onViewProduct: (productId: string) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({
  onAddToCart,
  onRemoveFromCart,
  cartItems,
  onContactSeller,
  onViewProduct
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Catégories de produits
  const categories: ProductCategory[] = [
    {
      id: 'food',
      name: 'Alimentation',
      icon: <Package className="w-5 h-5" />,
      subcategories: ['Croquettes', 'Pâtées', 'Friandises', 'Compléments']
    },
    {
      id: 'toys',
      name: 'Jouets',
      icon: <Gift className="w-5 h-5" />,
      subcategories: ['Jouets à mâcher', 'Balles', 'Cordes', 'Jouets interactifs']
    },
    {
      id: 'accessories',
      name: 'Accessoires',
      icon: <Star className="w-5 h-5" />,
      subcategories: ['Colliers', 'Laisses', 'Harnais', 'Médailles']
    },
    {
      id: 'care',
      name: 'Soins',
      icon: <Shield className="w-5 h-5" />,
      subcategories: ['Shampoings', 'Brosses', 'Soins dentaires', 'Antiparasitaires']
    },
    {
      id: 'equipment',
      name: 'Équipement',
      icon: <Store className="w-5 h-5" />,
      subcategories: ['Paniers', 'Gamelles', 'Transporteurs', 'Niches']
    }
  ];

  // Produits simulés
  const [products] = useState<Product[]>([
    {
      id: 'prod_001',
      name: 'Croquettes Premium pour Chien Adulte',
      description: 'Croquettes de haute qualité avec agneau et riz, sans céréales. Parfaites pour les chiens adultes de toutes tailles.',
      price: 45.99,
      originalPrice: 52.99,
      category: categories[0],
      subcategory: 'Croquettes',
      brand: 'PetNutrition Pro',
      images: ['/marketplace/croquettes-1.jpg', '/marketplace/croquettes-2.jpg'],
      rating: 4.7,
      reviewCount: 234,
      inStock: true,
      stockQuantity: 15,
      sellerId: 'seller_001',
      sellerName: 'Pet Store Paris',
      sellerRating: 4.8,
      features: ['Sans céréales', 'Agneau et riz', 'Riche en protéines', 'Digestion facile'],
      specifications: {
        'Poids': '12kg',
        'Âge': 'Adulte',
        'Taille': 'Toutes tailles',
        'Ingrédients principaux': 'Agneau, riz, légumes'
      },
      shippingInfo: {
        freeShipping: true,
        estimatedDays: 2
      },
      tags: ['premium', 'sans-cereales', 'agneau'],
      isPromoted: true,
      discount: {
        percentage: 13,
        validUntil: new Date('2024-12-31')
      }
    },
    {
      id: 'prod_002',
      name: 'Jouet Interactif Kong Classic',
      description: 'Le jouet Kong classique, parfait pour occuper votre chien et nettoyer ses dents. Résistant et durable.',
      price: 12.99,
      category: categories[1],
      subcategory: 'Jouets interactifs',
      brand: 'Kong',
      images: ['/marketplace/kong-1.jpg', '/marketplace/kong-2.jpg'],
      rating: 4.9,
      reviewCount: 567,
      inStock: true,
      stockQuantity: 28,
      sellerId: 'seller_002',
      sellerName: 'Jouets & Cie',
      sellerRating: 4.6,
      features: ['Ultra résistant', 'Nettoie les dents', 'Peut être fourré', 'Rebondit de façon imprévisible'],
      specifications: {
        'Matériau': 'Caoutchouc naturel',
        'Taille': 'Medium',
        'Couleur': 'Rouge',
        'Poids': '150g'
      },
      shippingInfo: {
        freeShipping: false,
        estimatedDays: 3,
        cost: 4.99
      },
      tags: ['kong', 'resistant', 'interactif'],
      isPromoted: false
    },
    {
      id: 'prod_003',
      name: 'Collier en Cuir Véritable',
      description: 'Collier élégant en cuir véritable avec boucle en métal. Confortable et durable pour un usage quotidien.',
      price: 24.99,
      category: categories[2],
      subcategory: 'Colliers',
      brand: 'LeatherCraft',
      images: ['/marketplace/collier-1.jpg', '/marketplace/collier-2.jpg'],
      rating: 4.5,
      reviewCount: 89,
      inStock: true,
      stockQuantity: 12,
      sellerId: 'seller_003',
      sellerName: 'Artisan Cuir',
      sellerRating: 4.9,
      features: ['Cuir véritable', 'Boucle métal', 'Réglable', 'Fait main'],
      specifications: {
        'Matériau': 'Cuir véritable',
        'Taille': 'M (35-45cm)',
        'Largeur': '2.5cm',
        'Couleur': 'Marron'
      },
      shippingInfo: {
        freeShipping: true,
        estimatedDays: 4
      },
      tags: ['cuir', 'elegant', 'fait-main'],
      isPromoted: false
    },
    {
      id: 'prod_004',
      name: 'Shampooing Hypoallergénique',
      description: 'Shampooing doux spécialement formulé pour les chiens à peau sensible. Sans parfum et hypoallergénique.',
      price: 16.99,
      category: categories[3],
      subcategory: 'Shampoings',
      brand: 'SkinCare Pet',
      images: ['/marketplace/shampooing-1.jpg'],
      rating: 4.3,
      reviewCount: 156,
      inStock: true,
      stockQuantity: 22,
      sellerId: 'seller_001',
      sellerName: 'Pet Store Paris',
      sellerRating: 4.8,
      features: ['Hypoallergénique', 'Sans parfum', 'pH équilibré', 'Peau sensible'],
      specifications: {
        'Volume': '250ml',
        'Type': 'Hypoallergénique',
        'pH': '6.5-7.0',
        'Ingrédients': 'Naturels'
      },
      shippingInfo: {
        freeShipping: false,
        estimatedDays: 2,
        cost: 3.99
      },
      tags: ['hypoallergenique', 'peau-sensible', 'naturel'],
      isPromoted: false
    },
    {
      id: 'prod_005',
      name: 'Panier Orthopédique Memory Foam',
      description: 'Panier orthopédique avec mousse à mémoire de forme. Idéal pour les chiens âgés ou avec des problèmes articulaires.',
      price: 89.99,
      originalPrice: 109.99,
      category: categories[4],
      subcategory: 'Paniers',
      brand: 'ComfortPet',
      images: ['/marketplace/panier-1.jpg', '/marketplace/panier-2.jpg', '/marketplace/panier-3.jpg'],
      rating: 4.8,
      reviewCount: 78,
      inStock: true,
      stockQuantity: 8,
      sellerId: 'seller_004',
      sellerName: 'Confort Animal',
      sellerRating: 4.7,
      features: ['Memory foam', 'Orthopédique', 'Housse amovible', 'Anti-dérapant'],
      specifications: {
        'Taille': 'Large (80x60cm)',
        'Épaisseur': '10cm',
        'Matériau': 'Memory foam + polyester',
        'Lavable': 'Housse lavable 30°C'
      },
      shippingInfo: {
        freeShipping: true,
        estimatedDays: 5
      },
      tags: ['orthopedique', 'memory-foam', 'senior'],
      isPromoted: true,
      discount: {
        percentage: 18,
        validUntil: new Date('2024-11-30')
      }
    }
  ]);

  // Filtrage et tri des produits
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filtrage par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category.id === selectedCategory);
    }

    // Filtrage par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filtrage par prix
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Tri
    switch (sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'newest':
        // Simuler un tri par date (les produits promus en premier)
        filtered.sort((a, b) => (b.isPromoted ? 1 : 0) - (a.isPromoted ? 1 : 0));
        break;
      default:
        // Relevance: produits promus en premier, puis par rating
        filtered.sort((a, b) => {
          if (a.isPromoted && !b.isPromoted) return -1;
          if (!a.isPromoted && b.isPromoted) return 1;
          return b.rating - a.rating;
        });
    }

    return filtered;
  }, [products, selectedCategory, searchQuery, priceRange, sortBy]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const isInCart = (productId: string) => {
    return cartItems.some(item => item.productId === productId);
  };

  const getCartQuantity = (productId: string) => {
    const item = cartItems.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  };

  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const handleAddToCart = (product: Product) => {
    onAddToCart({
      productId: product.id,
      quantity: 1
    });
  };

  const handleQuantityChange = (productId: string, change: number) => {
    const currentQuantity = getCartQuantity(productId);
    const newQuantity = currentQuantity + change;
    
    if (newQuantity <= 0) {
      onRemoveFromCart(productId);
    } else {
      onAddToCart({
        productId,
        quantity: newQuantity
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header du marketplace */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Store className="w-6 h-6 text-blue-600" />
            Marketplace Paw Paths
          </h1>
          <p className="text-gray-600">Tout ce dont votre compagnon a besoin</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <Truck className="w-3 h-3 mr-1" />
            Livraison gratuite dès 50€
          </Badge>
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            <Shield className="w-3 h-3 mr-1" />
            Garantie satisfaction
          </Badge>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Rechercher des produits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Toutes catégories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes catégories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Pertinence</SelectItem>
              <SelectItem value="price_asc">Prix croissant</SelectItem>
              <SelectItem value="price_desc">Prix décroissant</SelectItem>
              <SelectItem value="rating">Mieux notés</SelectItem>
              <SelectItem value="reviews">Plus d'avis</SelectItem>
              <SelectItem value="newest">Nouveautés</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filtres
          </Button>
        </div>
      </div>

      {/* Filtres avancés */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filtres avancés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Prix</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-20"
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-20"
                  />
                  <span>€</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Note minimum</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes notes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes notes</SelectItem>
                    <SelectItem value="4">4+ étoiles</SelectItem>
                    <SelectItem value="4.5">4.5+ étoiles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Livraison</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes options" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes options</SelectItem>
                    <SelectItem value="free">Livraison gratuite</SelectItem>
                    <SelectItem value="fast">Livraison rapide</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Catégories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('all')}
          className="flex-shrink-0"
        >
          Tout
        </Button>
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center gap-2 flex-shrink-0"
          >
            {category.icon}
            {category.name}
          </Button>
        ))}
      </div>

      {/* Résultats */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
        </p>
        
        {filteredProducts.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <TrendingUp className="w-4 h-4" />
            Produits populaires en tête
          </div>
        )}
      </div>

      {/* Grille de produits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow">
            <div className="relative">
              {/* Image du produit */}
              <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-product.jpg';
                  }}
                />
              </div>
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.isPromoted && (
                  <Badge className="bg-red-500 text-white">
                    Promo
                  </Badge>
                )}
                {product.discount && (
                  <Badge className="bg-orange-500 text-white">
                    -{product.discount.percentage}%
                  </Badge>
                )}
                {product.shippingInfo.freeShipping && (
                  <Badge variant="outline" className="bg-white">
                    <Truck className="w-3 h-3 mr-1" />
                    Gratuit
                  </Badge>
                )}
              </div>
              
              {/* Bouton favori */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 p-1 h-8 w-8"
                onClick={() => toggleFavorite(product.id)}
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorites.has(product.id)
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-400'
                  }`}
                />
              </Button>
            </div>
            
            <CardContent className="p-4">
              {/* Informations produit */}
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium text-sm line-clamp-2 flex-1">
                    {product.name}
                  </h3>
                </div>
                
                <p className="text-xs text-gray-600 line-clamp-2">
                  {product.description}
                </p>
                
                {/* Rating et avis */}
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium ml-1">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    ({product.reviewCount})
                  </span>
                </div>
                
                {/* Prix */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-green-600">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                
                {/* Vendeur */}
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Store className="w-3 h-3" />
                  <span>{product.sellerName}</span>
                  {product.sellerId === 'seller_001' && (
                    <Badge variant="outline" className="text-xs">
                      <Award className="w-2 h-2 mr-1" />
                      Vérifié
                    </Badge>
                  )}
                </div>
                
                {/* Stock */}
                {product.stockQuantity < 10 && (
                  <div className="flex items-center gap-1 text-xs text-orange-600">
                    <AlertCircle className="w-3 h-3" />
                    Plus que {product.stockQuantity} en stock
                  </div>
                )}
                
                {/* Livraison */}
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>
                    Livraison en {product.shippingInfo.estimatedDays} jour{product.shippingInfo.estimatedDays > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              
              {/* Actions */}
              <div className="mt-4 space-y-2">
                {isInCart(product.id) ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(product.id, -1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-sm font-medium">
                        {getCartQuantity(product.id)}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(product.id, 1)}
                        className="h-8 w-8 p-0"
                        disabled={getCartQuantity(product.id) >= product.stockQuantity}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRemoveFromCart(product.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className="w-full"
                    size="sm"
                  >
                    <ShoppingCart className="w-3 h-3 mr-2" />
                    {product.inStock ? 'Ajouter au panier' : 'Rupture de stock'}
                  </Button>
                )}
                
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewProduct(product.id)}
                    className="flex-1"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Voir
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onContactSeller(product.sellerId, product.id)}
                  >
                    <MessageCircle className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    <Share2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Message si aucun produit */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucun produit trouvé
          </h3>
          <p className="text-gray-600 mb-4">
            Essayez de modifier vos critères de recherche ou de navigation.
          </p>
          <Button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setPriceRange([0, 1000]);
            }}
          >
            Réinitialiser les filtres
          </Button>
        </div>
      )}

      {/* Informations de confiance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
        <Card>
          <CardContent className="pt-6 text-center">
            <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h4 className="font-medium mb-1">Paiement sécurisé</h4>
            <p className="text-sm text-gray-600">
              Vos données sont protégées par cryptage SSL
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <Truck className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h4 className="font-medium mb-1">Livraison rapide</h4>
            <p className="text-sm text-gray-600">
              Livraison gratuite dès 50€ d'achat
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h4 className="font-medium mb-1">Vendeurs vérifiés</h4>
            <p className="text-sm text-gray-600">
              Tous nos vendeurs sont certifiés et évalués
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
