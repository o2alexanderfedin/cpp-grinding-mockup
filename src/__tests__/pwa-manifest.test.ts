import { describe, it, expect } from 'vitest'
import manifestJson from '../../public/manifest.json'

describe('PWA Manifest Configuration', () => {
  describe('Required Fields', () => {
    it('should have the correct app name', () => {
      expect(manifestJson.name).toBe('Hupyy - AI Firewall for Code Verification')
    })

    it('should have the correct short name', () => {
      expect(manifestJson.short_name).toBe('Hupyy')
    })

    it('should have the correct description', () => {
      expect(manifestJson.description).toBe('Formal verification linter powered by AI that detects bugs before they reach production')
    })

    it('should have standalone display mode', () => {
      expect(manifestJson.display).toBe('standalone')
    })

    it('should have root as start URL', () => {
      expect(manifestJson.start_url).toBe('/')
    })

    it('should have root as scope', () => {
      expect(manifestJson.scope).toBe('/')
    })
  })

  describe('Brand Colors', () => {
    it('should have correct theme color (macOS blue)', () => {
      expect(manifestJson.theme_color).toBe('#007AFF')
    })

    it('should have correct background color', () => {
      expect(manifestJson.background_color).toBe('#F5F5F7')
    })
  })

  describe('Orientation', () => {
    it('should have portrait-primary orientation', () => {
      expect(manifestJson.orientation).toBe('portrait-primary')
    })
  })

  describe('Icons', () => {
    it('should have at least 2 icons', () => {
      expect(manifestJson.icons).toHaveLength(2)
    })

    it('should have 192x192 icon with correct properties', () => {
      const icon192 = manifestJson.icons.find((icon) => icon.sizes === '192x192')
      expect(icon192).toBeDefined()
      expect(icon192?.src).toBe('/icons/icon-192x192.png')
      expect(icon192?.type).toBe('image/png')
      expect(icon192?.purpose).toBe('maskable any')
    })

    it('should have 512x512 icon with correct properties', () => {
      const icon512 = manifestJson.icons.find((icon) => icon.sizes === '512x512')
      expect(icon512).toBeDefined()
      expect(icon512?.src).toBe('/icons/icon-512x512.png')
      expect(icon512?.type).toBe('image/png')
      expect(icon512?.purpose).toBe('maskable any')
    })
  })

  describe('Structure Validation', () => {
    it('should have all required fields', () => {
      const requiredFields = [
        'name',
        'short_name',
        'description',
        'theme_color',
        'background_color',
        'display',
        'orientation',
        'scope',
        'start_url',
        'icons'
      ]

      requiredFields.forEach((field) => {
        expect(manifestJson).toHaveProperty(field)
      })
    })
  })
})
