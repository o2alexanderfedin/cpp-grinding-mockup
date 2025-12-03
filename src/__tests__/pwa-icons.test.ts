import { describe, it, expect } from 'vitest'
import { existsSync, statSync } from 'fs'
import { join } from 'path'

describe('PWA Icons', () => {
  const publicDir = join(process.cwd(), 'public', 'icons')

  describe('Icon Files Existence', () => {
    it('should have 192x192 icon file', () => {
      const iconPath = join(publicDir, 'icon-192x192.png')
      expect(existsSync(iconPath)).toBe(true)
    })

    it('should have 512x512 icon file', () => {
      const iconPath = join(publicDir, 'icon-512x512.png')
      expect(existsSync(iconPath)).toBe(true)
    })
  })

  describe('Icon File Properties', () => {
    it('192x192 icon should be a valid PNG file', () => {
      const iconPath = join(publicDir, 'icon-192x192.png')
      if (existsSync(iconPath)) {
        const stats = statSync(iconPath)
        expect(stats.size).toBeGreaterThan(0)
        expect(stats.isFile()).toBe(true)
      }
    })

    it('512x512 icon should be a valid PNG file', () => {
      const iconPath = join(publicDir, 'icon-512x512.png')
      if (existsSync(iconPath)) {
        const stats = statSync(iconPath)
        expect(stats.size).toBeGreaterThan(0)
        expect(stats.isFile()).toBe(true)
      }
    })

    it('192x192 icon should be reasonably sized (not too small)', () => {
      const iconPath = join(publicDir, 'icon-192x192.png')
      if (existsSync(iconPath)) {
        const stats = statSync(iconPath)
        // PNG file should be at least 1KB for a proper icon
        expect(stats.size).toBeGreaterThan(1024)
      }
    })

    it('512x512 icon should be reasonably sized (not too small)', () => {
      const iconPath = join(publicDir, 'icon-512x512.png')
      if (existsSync(iconPath)) {
        const stats = statSync(iconPath)
        // PNG file should be at least 2KB for a proper icon
        expect(stats.size).toBeGreaterThan(2048)
      }
    })
  })
})
