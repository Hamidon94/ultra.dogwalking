import React, { useState, useEffect, useMemo } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  PieChart,
  LineChart,
  Target,
  CreditCard,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  FileText,
  Calculator
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';

// Types pour les rapports financiers
interface FinancialMetrics {
  totalRevenue: number;
  totalBookings: number;
  averageOrderValue: number;
  conversionRate: number;
  customerLifetimeValue: number;
  monthlyRecurringRevenue: number;
  churnRate: number;
  refundRate: number;
  commissionsPaid: number;
  netProfit: number;
  growthRate: number;
}

interface RevenueData {
  date: string;
  revenue: number;
  bookings: number;
  newCustomers: number;
  returningCustomers: number;
  refunds: number;
}

interface ServicePerformance {
  serviceId: string;
  serviceName: string;
  revenue: number;
  bookings: number;
  averagePrice: number;
  growthRate: number;
  profitMargin: number;
}

interface WalkerPerformance {
  walkerId: string;
  walkerName: string;
  totalEarnings: number;
  totalBookings: number;
  averageRating: number;
  commissionRate: number;
  netRevenue: number;
}

interface PaymentMethod {
  method: string;
  count: number;
  amount: number;
  percentage: number;
  fees: number;
}

interface FinancialReportsProps {
  dateRange: { start: Date; end: Date };
  onDateRangeChange: (range: { start: Date; end: Date }) => void;
  onExportReport: (type: string, format: string) => void;
  onRefreshData: () => void;
}

export const FinancialReports: React.FC<FinancialReportsProps> = ({
  dateRange,
  onDateRangeChange,
  onExportReport,
  onRefreshData
}) => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState<FinancialMetrics | null>(null);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [servicePerformance, setServicePerformance] = useState<ServicePerformance[]>([]);
  const [walkerPerformance, setWalkerPerformance] = useState<WalkerPerformance[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  // Données simulées pour la démonstration
  useEffect(() => {
    loadFinancialData();
  }, [dateRange, selectedPeriod]);

  const loadFinancialData = async () => {
    setLoading(true);
    
    // Simulation de chargement des données
    setTimeout(() => {
      setMetrics({
        totalRevenue: 125430.50,
        totalBookings: 2847,
        averageOrderValue: 44.05,
        conversionRate: 3.2,
        customerLifetimeValue: 287.50,
        monthlyRecurringRevenue: 18750.00,
        churnRate: 2.1,
        refundRate: 1.8,
        commissionsPaid: 31357.63,
        netProfit: 94072.87,
        growthRate: 15.3
      });

      setRevenueData([
        { date: '2024-01', revenue: 8500, bookings: 195, newCustomers: 45, returningCustomers: 150, refunds: 150 },
        { date: '2024-02', revenue: 9200, bookings: 210, newCustomers: 52, returningCustomers: 158, refunds: 180 },
        { date: '2024-03', revenue: 10100, bookings: 235, newCustomers: 58, returningCustomers: 177, refunds: 120 },
        { date: '2024-04', revenue: 11300, bookings: 265, newCustomers: 65, returningCustomers: 200, refunds: 200 },
        { date: '2024-05', revenue: 12800, bookings: 290, newCustomers: 72, returningCustomers: 218, refunds: 160 },
        { date: '2024-06', revenue: 13500, bookings: 315, newCustomers: 78, returningCustomers: 237, refunds: 190 }
      ]);

      setServicePerformance([
        { serviceId: '1', serviceName: 'Promenade 30 min', revenue: 45230, bookings: 1847, averagePrice: 24.5, growthRate: 12.3, profitMargin: 65.2 },
        { serviceId: '2', serviceName: 'Promenade 1h', revenue: 32150, bookings: 892, averagePrice: 36.0, growthRate: 18.7, profitMargin: 68.1 },
        { serviceId: '3', serviceName: 'Visite simple', revenue: 18750, bookings: 425, averagePrice: 44.1, growthRate: 8.9, profitMargin: 72.3 },
        { serviceId: '4', serviceName: 'Garde à domicile', revenue: 15200, bookings: 156, averagePrice: 97.4, growthRate: 25.1, profitMargin: 58.7 },
        { serviceId: '5', serviceName: 'Pension canine', revenue: 14100, bookings: 189, averagePrice: 74.6, growthRate: 15.6, profitMargin: 61.2 }
      ]);

      setWalkerPerformance([
        { walkerId: '1', walkerName: 'Marie Dupont', totalEarnings: 3250, totalBookings: 145, averageRating: 4.9, commissionRate: 20, netRevenue: 13000 },
        { walkerId: '2', walkerName: 'Jean Martin', totalEarnings: 2890, totalBookings: 132, averageRating: 4.8, commissionRate: 20, netRevenue: 11560 },
        { walkerId: '3', walkerName: 'Sophie Leroy', totalEarnings: 2650, totalBookings: 118, averageRating: 4.7, commissionRate: 20, netRevenue: 10600 },
        { walkerId: '4', walkerName: 'Pierre Dubois', totalEarnings: 2420, totalBookings: 108, averageRating: 4.8, commissionRate: 20, netRevenue: 9680 },
        { walkerId: '5', walkerName: 'Claire Bernard', totalEarnings: 2180, totalBookings: 95, averageRating: 4.6, commissionRate: 20, netRevenue: 8720 }
      ]);

      setPaymentMethods([
        { method: 'Carte bancaire', count: 1847, amount: 89250, percentage: 71.2, fees: 2677.5 },
        { method: 'PayPal', count: 542, amount: 23150, percentage: 18.4, fees: 925.0 },
        { method: 'Apple Pay', count: 285, amount: 8950, percentage: 7.1, fees: 268.5 },
        { method: 'Google Pay', count: 173, amount: 4080, percentage: 3.3, fees: 122.4 }
      ]);

      setLoading(false);
    }, 1000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getGrowthIcon = (rate: number) => {
    return rate >= 0 ? (
      <ArrowUpRight className="w-4 h-4 text-green-500" />
    ) : (
      <ArrowDownRight className="w-4 h-4 text-red-500" />
    );
  };

  const getGrowthColor = (rate: number) => {
    return rate >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const totalRevenue = useMemo(() => {
    return revenueData.reduce((sum, data) => sum + data.revenue, 0);
  }, [revenueData]);

  const totalBookings = useMemo(() => {
    return revenueData.reduce((sum, data) => sum + data.bookings, 0);
  }, [revenueData]);

  const handleExport = (type: string) => {
    const formats = ['PDF', 'Excel', 'CSV'];
    formats.forEach(format => {
      onExportReport(type, format.toLowerCase());
    });
  };

  return (
    <div className="space-y-6">
      {/* Header avec contrôles */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rapports Financiers</h1>
          <p className="text-gray-600">Analyse détaillée des performances financières</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Semaine</SelectItem>
              <SelectItem value="month">Mois</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Année</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={onRefreshData} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
          
          <Button variant="outline" onClick={() => handleExport('complete')}>
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Métriques principales */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Chiffre d'affaires</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(metrics.totalRevenue)}
                  </p>
                  <div className="flex items-center mt-1">
                    {getGrowthIcon(metrics.growthRate)}
                    <span className={`text-sm ${getGrowthColor(metrics.growthRate)}`}>
                      {formatPercentage(metrics.growthRate)}
                    </span>
                  </div>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Réservations</p>
                  <p className="text-2xl font-bold text-blue-600">{metrics.totalBookings}</p>
                  <p className="text-sm text-gray-500">
                    Panier moyen: {formatCurrency(metrics.averageOrderValue)}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Bénéfice net</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {formatCurrency(metrics.netProfit)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Marge: {formatPercentage((metrics.netProfit / metrics.totalRevenue) * 100)}
                  </p>
                </div>
                <Wallet className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Commissions</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {formatCurrency(metrics.commissionsPaid)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatPercentage((metrics.commissionsPaid / metrics.totalRevenue) * 100)} du CA
                  </p>
                </div>
                <CreditCard className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Onglets des rapports */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="revenue">Revenus</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="walkers">Promeneurs</TabsTrigger>
          <TabsTrigger value="payments">Paiements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Graphique de revenus */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="w-5 h-5" />
                Évolution des revenus
              </CardTitle>
              <CardDescription>
                Revenus et réservations par mois
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Graphique des revenus</p>
                  <p className="text-sm text-gray-500">
                    Intégration avec Chart.js ou Recharts
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Métriques clés */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Taux de conversion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">
                    {formatPercentage(metrics?.conversionRate || 0)}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Visiteurs qui réservent
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Valeur vie client</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {formatCurrency(metrics?.customerLifetimeValue || 0)}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Revenus moyens par client
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Taux de remboursement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-600">
                    {formatPercentage(metrics?.refundRate || 0)}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Réservations remboursées
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Détail des revenus</CardTitle>
              <CardDescription>
                Analyse détaillée des revenus par période
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">
                        {new Date(data.date + '-01').toLocaleDateString('fr-FR', { 
                          year: 'numeric', 
                          month: 'long' 
                        })}
                      </p>
                      <p className="text-sm text-gray-600">
                        {data.bookings} réservations • {data.newCustomers} nouveaux clients
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">
                        {formatCurrency(data.revenue)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Remboursements: {formatCurrency(data.refunds)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance des services</CardTitle>
              <CardDescription>
                Analyse de la rentabilité par service
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {servicePerformance.map((service) => (
                  <div key={service.serviceId} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{service.serviceName}</p>
                      <p className="text-sm text-gray-600">
                        {service.bookings} réservations • Prix moyen: {formatCurrency(service.averagePrice)}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="outline">
                          Marge: {formatPercentage(service.profitMargin)}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {getGrowthIcon(service.growthRate)}
                          <span className={`text-sm ${getGrowthColor(service.growthRate)}`}>
                            {formatPercentage(service.growthRate)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">
                        {formatCurrency(service.revenue)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="walkers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance des promeneurs</CardTitle>
              <CardDescription>
                Revenus générés par chaque promeneur
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {walkerPerformance.map((walker) => (
                  <div key={walker.walkerId} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{walker.walkerName}</p>
                      <p className="text-sm text-gray-600">
                        {walker.totalBookings} réservations • Note: {walker.averageRating}/5
                      </p>
                      <p className="text-sm text-gray-500">
                        Commission: {formatPercentage(walker.commissionRate)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">
                        {formatCurrency(walker.netRevenue)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Promeneur: {formatCurrency(walker.totalEarnings)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Méthodes de paiement</CardTitle>
              <CardDescription>
                Répartition des paiements par méthode
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{method.method}</p>
                      <p className="text-sm text-gray-600">
                        {method.count} transactions • {formatPercentage(method.percentage)} du total
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">
                        {formatCurrency(method.amount)}
                      </p>
                      <p className="text-sm text-red-500">
                        Frais: {formatCurrency(method.fees)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Résumé des frais */}
          <Card>
            <CardHeader>
              <CardTitle>Résumé des frais de transaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(paymentMethods.reduce((sum, method) => sum + method.fees, 0))}
                  </p>
                  <p className="text-sm text-gray-600">Total des frais</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">
                    {formatPercentage(
                      (paymentMethods.reduce((sum, method) => sum + method.fees, 0) / 
                       paymentMethods.reduce((sum, method) => sum + method.amount, 0)) * 100
                    )}
                  </p>
                  <p className="text-sm text-gray-600">Taux de frais moyen</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(
                      paymentMethods.reduce((sum, method) => sum + method.amount, 0) - 
                      paymentMethods.reduce((sum, method) => sum + method.fees, 0)
                    )}
                  </p>
                  <p className="text-sm text-gray-600">Revenus nets</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
