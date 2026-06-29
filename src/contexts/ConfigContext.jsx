import { createContext, useState, useEffect, useContext } from 'react';
import api from '../lib/api';
import { Loader2 } from 'lucide-react';
import defaultConfig from '../data/siteConfig.json';

const ConfigContext = createContext();

export const useConfig = () => useContext(ConfigContext);

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchConfig = async () => {
    try {
      const res = await api.get('/config');
      setConfig(res.data);
    } catch (err) {
      console.error("Failed to load config from API, using fallback:", err);
      // Fallback to local JSON if API fails (e.g. on Vercel before DB is ready or if offline)
      setConfig(defaultConfig);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;
  }

  return (
    <ConfigContext.Provider value={{ config, refreshConfig: fetchConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};
