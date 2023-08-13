import { Path, ContentManifest } from './types';

/**
 * Returns the list of content files (html,css,js,images) to be generated.
 */
export function getContentManifests(inputDirectory: Path): ContentManifest[] {
  return [];
}

/**
 * Generate file(s) from a content manifest.
 */
export function renderContent(content: ContentManifest) {
  // generate file(s) given 
}
