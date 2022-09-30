import React, { forwardRef, LegacyRef } from "react";
import { Link } from "react-router-dom";

type OutboundLinkpropTypes = React.DOMAttributes<HTMLAnchorElement> & {
	[key: string]: any;
	href: string;
	target?: HTMLAnchorElement["target"];
	onClick?: React.DOMAttributes<HTMLAnchorElement>["onClick"];
	/**
	 * inner html elements or string
	 */
	children?: React.DOMAttributes<HTMLAnchorElement>["children"];
	/**
	 * using legacy hyperlink <a /> instead <Link /> from react-dom
	 */
	legacy?: boolean;
};

/**
 * Outbound link anchor with analystic
 * @param param0
 * @param ref
 * @returns
 */
const OutboundLink_func = (
	{ children, ...props }: OutboundLinkpropTypes,
	ref: LegacyRef<HTMLAnchorElement>
) => {
	const handler: React.DOMAttributes<HTMLAnchorElement>["onClick"] = (e) => {
		if (typeof props.onClick === `function`) {
			props.onClick(e);
		}
		let redirect = true;
		if (
			e.button !== 0 ||
			e.altKey ||
			e.ctrlKey ||
			e.metaKey ||
			e.shiftKey ||
			e.defaultPrevented
		) {
			redirect = false;
		}
		// skip target blank
		if (props.target && props.target.toLowerCase() !== `_self`) {
			redirect = false;
		}

		if (
			typeof window.gtag === "function" &&
			/^https?:\/\/|^\//.test(props.href)
		) {
			window.gtag(`event`, `click`, {
				event_category: `outbound`,
				event_label: props.href,
				screen_name: document.title,
				transport_type: redirect ? `beacon` : ``,
				event_callback: function () {
					if (redirect) {
						document.location = props.href;
					}
				},
			});
		} else {
			if (redirect) {
				document.location = props.href;
			}
		}

		return false;
	};

	const legacy = (
		<a ref={ref} {...props} onClick={handler}>
			{children}
		</a>
	);

	const linked = (function () {
		if (props.href.startsWith("/")) {
			return (
				<Link to={{ pathname: props.href }} {...props} onClick={handler}>
					{children}
				</Link>
			);
		} else if (/^https:\/\//.test(props.href)) {
			console.log(process.env.PUBLIC_URL);
			const parseSiteUrl = new URL(process.env.PUBLIC_URL);
			const parseHref = new URL(props.href);
			if (parseHref.host == parseSiteUrl.host) {
				return (
					<Link to={props.href} {...props} onClick={handler}>
						{children}
					</Link>
				);
			} else {
				return legacy;
			}
		} else {
			return legacy;
		}
	})();

	if (props.legacy) {
		return legacy;
	} else {
		return linked;
	}
};
export const OutboundLink = forwardRef(OutboundLink_func);
