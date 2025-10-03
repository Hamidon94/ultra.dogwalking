import { supabase } from "@/integrations/supabase/client";

export interface WalkerSummaryData {
  walker: {
    id: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    phone_number: string;
    email: string;
    address: string;
    city: string;
    bio: string;
    experience_years: number;
    hourly_rate: number;
    service_radius: number;
    certifications: string[];
    languages: string[];
    verification_status: string;
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
    created_at: string;
    verified_at?: string;
  };
  documents: Array<{
    document_type: string;
    document_name: string;
    upload_date: string;
    verified: boolean;
    verified_at?: string;
  }>;
  generated_at: string;
}

export const generateWalkerSummaryPDF = async (walkerId: string): Promise<Blob> => {
  try {
    // Récupérer les données du promeneur via la fonction Supabase
    const { data, error } = await supabase.rpc('generate_walker_summary', {
      walker_uuid: walkerId
    });

    if (error) throw error;

    const summaryData: WalkerSummaryData = data;

    // Créer le contenu HTML pour le PDF
    const htmlContent = generateHTMLContent(summaryData);

    // Utiliser l'API du navigateur pour générer le PDF
    const printWindow = window.open('', '_blank');
    if (!printWindow) throw new Error('Impossible d\'ouvrir la fenêtre d\'impression');

    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Attendre que le contenu soit chargé puis imprimer
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };

    // Pour une vraie génération de PDF, on utiliserait une bibliothèque comme jsPDF
    // Ici on retourne un blob vide pour la démo
    return new Blob(['PDF généré'], { type: 'application/pdf' });

  } catch (error: any) {
    throw new Error(`Erreur lors de la génération du PDF: ${error.message}`);
  }
};

const generateHTMLContent = (data: WalkerSummaryData): string => {
  const { walker, documents } = data;
  
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Récapitulatif Promeneur - ${walker.first_name} ${walker.last_name}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #4CAF50;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #4CAF50;
          margin-bottom: 10px;
        }
        .section {
          margin-bottom: 30px;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }
        .section h2 {
          color: #4CAF50;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
          margin-bottom: 15px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        .info-item {
          margin-bottom: 10px;
        }
        .info-label {
          font-weight: bold;
          color: #555;
        }
        .status {
          padding: 5px 10px;
          border-radius: 4px;
          font-weight: bold;
          text-transform: uppercase;
        }
        .status.pending {
          background-color: #fff3cd;
          color: #856404;
        }
        .status.approved {
          background-color: #d4edda;
          color: #155724;
        }
        .status.rejected {
          background-color: #f8d7da;
          color: #721c24;
        }
        .documents-list {
          list-style: none;
          padding: 0;
        }
        .documents-list li {
          padding: 10px;
          margin-bottom: 5px;
          background-color: #f8f9fa;
          border-radius: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .document-verified {
          color: #28a745;
          font-weight: bold;
        }
        .document-pending {
          color: #ffc107;
          font-weight: bold;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          color: #666;
          font-size: 12px;
        }
        .qr-placeholder {
          width: 100px;
          height: 100px;
          border: 2px dashed #ccc;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          color: #999;
        }
        @media print {
          body { margin: 0; }
          .section { break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">🐕 DogWalking</div>
        <h1>Récapitulatif du Promeneur</h1>
        <p>Document généré le ${new Date(data.generated_at).toLocaleDateString('fr-FR')}</p>
      </div>

      <div class="section">
        <h2>👤 Informations Personnelles</h2>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Nom complet:</div>
            <div>${walker.first_name} ${walker.last_name}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Date de naissance:</div>
            <div>${new Date(walker.date_of_birth).toLocaleDateString('fr-FR')}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Email:</div>
            <div>${walker.email}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Téléphone:</div>
            <div>${walker.phone_number}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Adresse:</div>
            <div>${walker.address}, ${walker.city}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Contact d'urgence:</div>
            <div>${walker.emergency_contact_name || 'Non renseigné'}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>💼 Expérience Professionnelle</h2>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Expérience:</div>
            <div>${walker.experience_years} ${walker.experience_years > 1 ? 'ans' : 'an'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Tarif horaire:</div>
            <div>${walker.hourly_rate}€/heure</div>
          </div>
          <div class="info-item">
            <div class="info-label">Rayon de service:</div>
            <div>${walker.service_radius} km</div>
          </div>
          <div class="info-item">
            <div class="info-label">Langues:</div>
            <div>${walker.languages.join(', ')}</div>
          </div>
        </div>
        
        <div class="info-item" style="margin-top: 15px;">
          <div class="info-label">Présentation:</div>
          <div style="margin-top: 5px; padding: 10px; background-color: #f8f9fa; border-radius: 4px;">
            ${walker.bio}
          </div>
        </div>

        ${walker.certifications.length > 0 ? `
        <div class="info-item" style="margin-top: 15px;">
          <div class="info-label">Certifications:</div>
          <ul style="margin-top: 5px;">
            ${walker.certifications.map(cert => `<li>${cert}</li>`).join('')}
          </ul>
        </div>
        ` : ''}
      </div>

      <div class="section">
        <h2>📋 Statut de Vérification</h2>
        <div class="info-item">
          <div class="info-label">Statut:</div>
          <span class="status ${walker.verification_status}">
            ${walker.verification_status === 'pending' ? 'En attente' : 
              walker.verification_status === 'approved' ? 'Approuvé' : 
              walker.verification_status === 'rejected' ? 'Rejeté' : walker.verification_status}
          </span>
        </div>
        <div class="info-item">
          <div class="info-label">Date d'inscription:</div>
          <div>${new Date(walker.created_at).toLocaleDateString('fr-FR')}</div>
        </div>
        ${walker.verified_at ? `
        <div class="info-item">
          <div class="info-label">Date de vérification:</div>
          <div>${new Date(walker.verified_at).toLocaleDateString('fr-FR')}</div>
        </div>
        ` : ''}
      </div>

      <div class="section">
        <h2>📄 Documents Téléchargés</h2>
        <ul class="documents-list">
          ${documents.map(doc => `
            <li>
              <div>
                <strong>${getDocumentTypeLabel(doc.document_type)}</strong><br>
                <small>${doc.document_name}</small><br>
                <small>Téléchargé le ${new Date(doc.upload_date).toLocaleDateString('fr-FR')}</small>
              </div>
              <div class="${doc.verified ? 'document-verified' : 'document-pending'}">
                ${doc.verified ? '✓ Vérifié' : '⏳ En attente'}
              </div>
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="section">
        <h2>🔍 Vérification en Ligne</h2>
        <p>Scannez ce QR code pour vérifier l'authenticité de ce document en ligne:</p>
        <div class="qr-placeholder">
          QR Code
        </div>
        <p style="text-align: center; margin-top: 10px; font-size: 12px;">
          ID de vérification: ${walker.id}
        </p>
      </div>

      <div class="footer">
        <p>Ce document a été généré automatiquement par DogWalking.</p>
        <p>Pour toute question, contactez-nous à contact@dogwalking.fr</p>
        <p>© ${new Date().getFullYear()} DogWalking - Tous droits réservés</p>
      </div>
    </body>
    </html>
  `;
};

const getDocumentTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    'identity': 'Carte d\'identité',
    'criminal_record': 'Casier judiciaire',
    'insurance': 'Assurance responsabilité civile',
    'certificate': 'Certificat professionnel',
    'other': 'Autre document'
  };
  return labels[type] || type;
};

export const downloadWalkerSummary = async (walkerId: string, walkerName: string) => {
  try {
    const pdfBlob = await generateWalkerSummaryPDF(walkerId);
    
    // Créer un lien de téléchargement
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `recapitulatif_promeneur_${walkerName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    
    // Déclencher le téléchargement
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Nettoyer l'URL
    URL.revokeObjectURL(url);
    
  } catch (error: any) {
    throw new Error(`Erreur lors du téléchargement: ${error.message}`);
  }
};

