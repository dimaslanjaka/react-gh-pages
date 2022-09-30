import React from "react";

const usedScript: string[] = [];
/**
 * call external CDN script
 * * Dont call this function inside useEffect, because this function have useEffect
 * @param url
 * @param integrity
 * @param async
 * @param crossOrigin
 * @param force ignore duplication checker
 * @example
 * function Element() {
 *   useScript('https://domain.cdn/path.file.js')
 *   return <>Hi</>
 * }
 */
export const useScript = (
	url: string,
	integrity = "anonymous",
	async = true,
	crossOrigin = "anonymous",
	force = false
) => {
	React.useEffect(() => {
		if (usedScript.includes(url) && !force) return;
		const script = document.createElement("script");
		usedScript.push(url);
		script.src = url;

		script.async = async;

		if (integrity) {
			script.integrity = integrity;
		}

		script.crossOrigin = crossOrigin;

		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, [url, integrity, async, crossOrigin]);
};
