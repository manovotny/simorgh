import { useContext, useEffect } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import onClient from '#lib/utilities/onClient';

const ServiceWorkerContainer = () => {
  const { swPath, service } = useContext(ServiceContext);
  const envIsProduction = process.env.NODE_ENV === 'production';

  useEffect(() => {
    const shouldInstallServiceWorker =
      envIsProduction && swPath && onClient() && 'serviceWorker' in navigator;

    if (shouldInstallServiceWorker) {
      navigator.serviceWorker.register(swPath);
    }
  }, [envIsProduction, swPath, service]);

  return null;
};

export default ServiceWorkerContainer;
