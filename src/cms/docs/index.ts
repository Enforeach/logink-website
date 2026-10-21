// Every CMS page document (docs/cms/PLAN.md "Documents"). payload.config.ts registers them; loadCms() reads them.
import type { CollectionConfig, GlobalConfig } from 'payload'
import { SiteSettings } from './site-settings'
import { UiLabels } from './ui-labels'
import { HomePage } from './home-page'
import { HubPage } from './hub-page'
import { AboutPage } from './about-page'
import { ContactPage } from './contact-page'
import { BlogPage } from './blog-page'
import { PortfolioPage } from './portfolio-page'
import { NotFoundPage } from './not-found-page'
import { CampaignContent } from './campaign-content'
import { InstrumentsContent } from './instruments-content'
import { ServicePages } from './service-pages'
import { LegalPages } from './legal-pages'

export const cmsGlobals = [HomePage, HubPage, AboutPage, ContactPage, BlogPage, PortfolioPage, NotFoundPage, CampaignContent, InstrumentsContent, SiteSettings, UiLabels]
  .filter((g): g is GlobalConfig => g !== null)
export const cmsCollections: CollectionConfig[] = [ServicePages, LegalPages]

export const CMS_GLOBALS = cmsGlobals.map((g) => g.slug)
export const CMS_KEYED = cmsCollections.map((c) => c.slug)
/** Docs with an SEO tab (plugin-seo): the ones that are a page with a registry title/description. */
export const SEO_GLOBALS = cmsGlobals.filter((g) => g.custom?.seo).map((g) => g.slug)
