import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App.jsx';
import { BrowserRouter } from 'react-router';
import { Toaster } from '@/components/ui/sonner';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  person_profiles: 'identified_only',
});

const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.classList.toggle('dark', savedTheme === 'dark');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostHogProvider client={posthog}>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <App />
      </BrowserRouter>
    </PostHogProvider>
  </StrictMode>
);
