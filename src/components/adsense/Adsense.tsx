import React, { useEffect } from "react";
import { isDev } from "../../config";
import { useScript } from "../../utils/useScript";
import "./Adsense.scss";

export interface AdsenseInsProps {
	[key: string]: any;
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
 * @example
 * // remove data-ad- -> becomes single word
 * // data-ad-layout -> layout, data-ad-slot -> slot
 * <Adsense client="ca-pub-xxx" slot="123456" layout="responsive" style={{ display: block }} />
 */
export function Adsense({
	className = "",
	style = { display: "block" },
	client,
	slot,
	disabled = false,
	layout = "",
	layoutKey = "",
	format = "auto",
	responsive = "false",
	pageLevelAds = false,
	adTest,
	children,
	...rest
}: AdsenseInsProps) {
	useScript({
		url: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
	});

	useEffect(() => {
		const p: any = {};
		if (pageLevelAds) {
			p.google_ad_client = client;
			p.enable_page_level_ads = true;
		}

		try {
			if (typeof window === "object") {
				((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
					p
				);
			}
		} catch {
			// Pass
		}
	}, [pageLevelAds, client, slot]);

	// skip produce adsense ins when disabled == true
	if (disabled) return <></>;

	// auto ads test
	if (!adTest && isDev) {
		adTest = "true";
	}

	return (
		<ins
			className={`adsbygoogle ${className}`}
			style={style}
			data-ad-client={client}
			data-ad-slot={slot}
			data-ad-layout={layout}
			data-ad-layout-key={layoutKey}
			data-ad-format={format}
			data-full-width-responsive={responsive}
			data-adtest={adTest}
			{...rest}
		>
			{children}
		</ins>
	);
}
