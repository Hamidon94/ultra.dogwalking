import { supabase } from "@/integrations/supabase/client";

export const createTestUser = async () => {
  try {
    // Créer l'utilisateur de test
    const { data, error } = await supabase.auth.signUp({
      email: 'hamid.amine.rh@gmail.com',
      password: 'Vendredi123',
      options: {
        data: {
          first_name: 'Hamid',
          last_name: 'Amine'
        }
      }
    });

    if (error) {
      console.error('Erreur lors de la création de l\'utilisateur de test:', error);
      return false;
    }

    console.log('Utilisateur de test créé avec succès:', data);
    return true;
  } catch (error) {
    console.error('Erreur inattendue:', error);
    return false;
  }
};
