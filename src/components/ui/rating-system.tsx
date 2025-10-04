import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, MessageSquare, Flag, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  walkerId: string;
  walkerName: string;
  rating: number;
  comment: string;
  date: Date;
  service: string;
  petName: string;
  verified: boolean;
  helpful: number;
  notHelpful: number;
  photos?: string[];
  response?: {
    text: string;
    date: Date;
  };
}

interface RatingStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  tags: {
    [key: string]: number;
  };
}

interface RatingSystemProps {
  walkerId?: string;
  reviews: Review[];
  stats: RatingStats;
  onSubmitReview?: (review: Partial<Review>) => void;
  canReview?: boolean;
}

export const RatingSystem: React.FC<RatingSystemProps> = ({
  walkerId,
  reviews,
  stats,
  onSubmitReview,
  canReview = false
}) => {
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'rating' | 'helpful'>('recent');
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const commonTags = [
    'Ponctuel', 'Attentionné', 'Professionnel', 'Communicatif', 
    'Fiable', 'Doux avec les animaux', 'Respectueux', 'Expérimenté',
    'Flexible', 'Recommandé', 'Excellent service', 'Très satisfait'
  ];

  const handleStarClick = (rating: number) => {
    setNewRating(rating);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmitReview = () => {
    if (newRating > 0 && newComment.trim() && onSubmitReview) {
      onSubmitReview({
        rating: newRating,
        comment: newComment,
        date: new Date(),
        // Les tags sélectionnés pourraient être inclus dans le commentaire ou traités séparément
      });
      
      // Reset form
      setNewRating(0);
      setNewComment('');
      setSelectedTags([]);
      setShowReviewForm(false);
    }
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      case 'recent':
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const filteredReviews = filterRating 
    ? sortedReviews.filter(review => review.rating === filterRating)
    : sortedReviews;

  const getRatingPercentage = (rating: number) => {
    return stats.totalReviews > 0 
      ? (stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution] / stats.totalReviews) * 100
      : 0;
  };

  const renderStars = (rating: number, interactive = false, size = 'w-5 h-5') => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} cursor-pointer transition-colors ${
              star <= (interactive ? (hoveredStar || newRating) : rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
            onClick={interactive ? () => handleStarClick(star) : undefined}
            onMouseEnter={interactive ? () => setHoveredStar(star) : undefined}
            onMouseLeave={interactive ? () => setHoveredStar(0) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Statistiques globales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            Évaluations et Avis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Note moyenne */}
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {stats.averageRating.toFixed(1)}
              </div>
              {renderStars(Math.round(stats.averageRating))}
              <p className="text-sm text-gray-600 mt-2">
                Basé sur {stats.totalReviews} avis
              </p>
            </div>

            {/* Distribution des notes */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-sm w-8">{rating}★</span>
                  <Progress 
                    value={getRatingPercentage(rating)} 
                    className="flex-1 h-2"
                  />
                  <span className="text-sm text-gray-600 w-12">
                    {stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags populaires */}
          {Object.keys(stats.tags).length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium mb-3">Qualités les plus mentionnées</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(stats.tags)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 8)
                  .map(([tag, count]) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag} ({count})
                    </Badge>
                  ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Formulaire d'avis */}
      {canReview && (
        <Card>
          <CardHeader>
            <CardTitle>Laisser un avis</CardTitle>
            <CardDescription>
              Partagez votre expérience pour aider d'autres propriétaires
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!showReviewForm ? (
              <Button onClick={() => setShowReviewForm(true)}>
                Écrire un avis
              </Button>
            ) : (
              <div className="space-y-4">
                {/* Notation */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Note générale *
                  </label>
                  {renderStars(newRating, true, 'w-8 h-8')}
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Qualités du promeneur (optionnel)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {commonTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleTagToggle(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Commentaire */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Votre avis *
                  </label>
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Décrivez votre expérience avec ce promeneur..."
                    rows={4}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button 
                    onClick={handleSubmitReview}
                    disabled={newRating === 0 || !newComment.trim()}
                  >
                    Publier l'avis
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowReviewForm(false)}
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Filtres et tri */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Trier par:</span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-sm border rounded px-2 py-1"
          >
            <option value="recent">Plus récents</option>
            <option value="rating">Note</option>
            <option value="helpful">Plus utiles</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Filtrer:</span>
          <div className="flex gap-1">
            <Button
              variant={filterRating === null ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterRating(null)}
            >
              Tous
            </Button>
            {[5, 4, 3, 2, 1].map((rating) => (
              <Button
                key={rating}
                variant={filterRating === rating ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterRating(rating)}
              >
                {rating}★
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Liste des avis */}
      <div className="space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={review.userPhoto} />
                    <AvatarFallback>{review.userName[0]}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.userName}</span>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Vérifié
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          {renderStars(review.rating, false, 'w-4 h-4')}
                          <span>•</span>
                          <span>{review.date.toLocaleDateString('fr-FR')}</span>
                          <span>•</span>
                          <span>{review.service} pour {review.petName}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Flag className="w-4 h-4" />
                      </Button>
                    </div>

                    <p className="text-gray-700 mb-3">{review.comment}</p>

                    {/* Photos de l'avis */}
                    {review.photos && review.photos.length > 0 && (
                      <div className="flex gap-2 mb-3">
                        {review.photos.map((photo, index) => (
                          <img
                            key={index}
                            src={photo}
                            alt={`Photo ${index + 1}`}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ))}
                      </div>
                    )}

                    {/* Réponse du promeneur */}
                    {review.response && (
                      <div className="bg-gray-50 p-3 rounded-lg mt-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-sm">
                            Réponse de {review.walkerName}
                          </span>
                          <span className="text-xs text-gray-600">
                            {review.response.date.toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{review.response.text}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-3">
                      <Button variant="ghost" size="sm" className="text-gray-600">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        Utile ({review.helpful})
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-600">
                        <ThumbsDown className="w-4 h-4 mr-1" />
                        ({review.notHelpful})
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-600">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Répondre
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Aucun avis pour le moment</p>
              <p className="text-sm text-gray-500 mt-2">
                Soyez le premier à laisser un avis !
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pagination si nécessaire */}
      {filteredReviews.length > 10 && (
        <div className="flex justify-center">
          <Button variant="outline">
            Voir plus d'avis
          </Button>
        </div>
      )}
    </div>
  );
};
