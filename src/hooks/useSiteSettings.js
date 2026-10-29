import { useEffect, useState } from 'react';
import { fetchSiteSettings } from '../api/cmsApi';

const FALLBACK = {
  contact: {
    phone: '(415) 233 – 9991',
    email: 'info@ae3partners.com',
    hours: 'Mon - Fri: 9:00 AM - 6:00 PM',
    phone_href: 'tel:+14152339991',
    email_href: 'mailto:info@ae3partners.com',
  },
  social: {
    items: [
      { name: 'Facebook', url: 'https://www.facebook.com/ae3partners', slug: 'facebook' },
      { name: 'Instagram', url: 'https://www.instagram.com/ae3partners', slug: 'instagram' },
      { name: 'YouTube', url: 'https://www.youtube.com/channel/UCrSVQuoNOudm2OsAxlkXplw', slug: 'youtube' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/company/ae3-partners-inc-/', slug: 'linkedin' },
    ],
  },
};

export default function useSiteSettings() {
  const [settings, setSettings] = useState(FALLBACK);

  useEffect(() => {
    let cancelled = false;
    fetchSiteSettings()
      .then((data) => {
        if (cancelled || !data) return;
        setSettings({
          contact: { ...FALLBACK.contact, ...(data.contact || {}) },
          social: {
            items:
              Array.isArray(data.social?.items) && data.social.items.length
                ? data.social.items
                : FALLBACK.social.items,
          },
        });
      })
      .catch(() => {
        if (!cancelled) setSettings(FALLBACK);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return settings;
}
