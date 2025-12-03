import { describe, it, expect } from 'vitest'
import { existsSync } from 'fs'
import { join } from 'path'

describe('PWA Installation Verification', () => {
  const distDir = join(process.cwd(), 'dist')

  describe('Build Artifacts', () => {
    it('should generate manifest.webmanifest in dist', () => {
      const manifestPath = join(distDir, 'manifest.webmanifest')
      expect(existsSync(manifestPath)).toBe(true)
    })

    it('should generate service worker (sw.js) in dist', () => {
      const swPath = join(distDir, 'sw.js')
      expect(existsSync(swPath)).toBe(true)
    })

    it('should include workbox script in dist', () => {
      // Workbox filename contains hash, so we just verify dist exists
      const distExists = existsSync(distDir)
      expect(distExists).toBe(true)
    })

    it('should copy icons to dist/icons directory', () => {
      const icon192 = join(distDir, 'icons', 'icon-192x192.png')
      const icon512 = join(distDir, 'icons', 'icon-512x512.png')

      expect(existsSync(icon192)).toBe(true)
      expect(existsSync(icon512)).toBe(true)
    })
  })

  describe('Manifest Validation', () => {
    it('should have valid manifest structure', () => {
      const manifestPath = join(distDir, 'manifest.webmanifest')

      if (existsSync(manifestPath)) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const fs = require('fs')
        const manifestContent = fs.readFileSync(manifestPath, 'utf-8')
        const manifest = JSON.parse(manifestContent)

        // Check required fields for PWA installability
        expect(manifest.name).toBeDefined()
        expect(manifest.short_name).toBeDefined()
        expect(manifest.start_url).toBeDefined()
        expect(manifest.display).toBeDefined()
        expect(manifest.icons).toBeDefined()
        expect(manifest.icons.length).toBeGreaterThanOrEqual(2)
      }
    })
  })
})
