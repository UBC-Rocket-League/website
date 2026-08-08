// @ts-check
import cloudflare from '@astrojs/cloudflare';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

export default defineConfig({
  adapter: cloudflare(),
  integrations: [react()],
});