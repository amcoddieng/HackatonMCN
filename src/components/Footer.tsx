// src/components/Footer.tsx

import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-black border-t border-gray-900 py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-[#D4AF37] font-semibold mb-3">{t('footer.about')}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Musée des Civilisations Noires
              <br />
              Dakar, Sénégal
            </p>
          </div>
          <div>
            <h3 className="text-[#D4AF37] font-semibold mb-3">{t('footer.contact')}</h3>
            <p className="text-gray-500 text-sm">contact@mcn.sn</p>
          </div>
          <div>
            <h3 className="text-[#D4AF37] font-semibold mb-3">{t('footer.social')}</h3>
            <p className="text-gray-500 text-sm">© 2024 Light Of Africa</p>
          </div>
        </div>
      </div>
    </footer>
  );
};