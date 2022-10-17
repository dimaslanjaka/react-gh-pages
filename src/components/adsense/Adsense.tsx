import React, { useEffect } from 'react';
import { isDev } from '../../config';
import './Adsense.scss';

export interface AdsenseInsProps {
  [key: string]: any;
  key?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  client: string;
  slot: string;
  layout?: string;
  layoutKey?: string;
  format?: string;
  responsive?: string;
  pageLevelAds?: boolean;
  adTest?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

/**
 * Adsense Component
 * @param attributes
 * @returns
 * @link https://support.google.com/adsense/answer/9042142?hl=en
 * @example
 * // remove data-ad- -> becomes single word
 * // data-ad-layout -> layout, data-ad-slot -> slot
 * <Adsense client="ca-pub-xxx" slot="123456" layout="responsive" style={{ display: block }} />
 */
export function AdsElement({
  className = '',
  style = { display: 'block' },
  client,
  key = Math.random().toString(),
  slot,
  disabled = false,
  layout = '',
  layoutKey = '',
  format = 'auto',
  responsive = 'false',
  pageLevelAds = false,
  adTest,
  children,
  ...rest
}: AdsenseInsProps) {
  // skip produce adsense ins when disabled == true
  if (disabled) return <></>;

  // auto ads test
  if (!adTest && isDev) {
    adTest = 'true';
  }

  const properties: Record<string, any> = rest;
  properties.style = style || { display: 'block' };
  properties['data-ad-client'] = client;
  properties['data-ad-slot'] = slot;
  if (layout.length > 0) properties['data-ad-layout'] = layout;
  if (layoutKey.length > 0) properties['data-ad-layout-key'] = layoutKey;
  if (format.length > 0) properties['data-ad-format'] = format;
  if (responsive === 'true') {
    properties['data-full-width-responsive'] = responsive;
  }
  if (adTest === 'true') properties['data-adtest'] = adTest;

  const adsPush = () => {
    const banners = document.querySelectorAll('ins');
    if (banners.length > 0) {
      for (let i = 0; i < banners.length; i++) {
        const ins = banners[i];
        if (String(ins.innerHTML).trim().length === 0) {
          const opt: Record<string, any> = {
            google_ad_client: ins.getAttribute('data-ad-client')
          };
          if (pageLevelAds) {
            opt.enable_page_level_ads = true;
          }
          ((window as any).adsbygoogle =
            (window as any).adsbygoogle || []).push(opt);
        }
      }
    }
  };

  useEffect(() => {
    const pageads = document.querySelectorAll(
      'script[src*="pagead2.googlesyndication.com"]'
    );
    if (pageads.length == 0) {
      // import script pagead when not yet imported
      const script = document.createElement('script');
      script.src =
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;
      script.setAttribute('crossorigin', 'anonymous');
      // call push onload
      script.onload = adsPush;

      document.body.appendChild(script);
    } else {
      // call push
      adsPush();
    }
  }, [JSON.stringify(properties)]);

  return (
    <div key={key || rest.id + className}>
      <ins className={`adsbygoogle ${className}`} {...properties}>
        {children}
      </ins>
    </div>
  );
}

/**
 * fix |uncaught exception: TagError: adsbygoogle.push() error: All ins elements in the DOM with class=adsbygoogle already have ads in them.
 */

/**
 * ensure adsense not duplicate
 * @param prevProps
 * @param nextProps
 * @returns
 */
function areEqual(prevProps: AdsenseInsProps, nextProps: AdsenseInsProps) {
  /*
	return true if passing nextProps to render would return
	the same result as passing prevProps to render,
	otherwise return false
	*/
  if (JSON.stringify(prevProps) === JSON.stringify(nextProps)) {
    return true; // donot re-render
  }
  return false; // will re-render
}

export const Adsense = React.memo(AdsElement, areEqual);
